const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const fs = require('fs');
let secret = {}
fs.readFile('./secret/authCode.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
	secret.authCode = data.replace(/\n/g, '');
});

// DATABASE SHIT: //
const sqlite3 = require ('sqlite3');
const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  dialectOptions: {
    mode: 'full', // Enable full mode to use FTS5
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
});

const Item = sequelize.define('Item', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Define virtual field for FTS
    search: {
        type: DataTypes.TEXT,
        allowNull: true,
        // FTS5 virtual field
        get() {
            return `${this.title} ${this.author} ${this.content}`;
        }
	}
}, {
    // Enable FTS5
    indexes: [
        {
            type: 'FULLTEXT',
            name: 'Item_search',
            fields: ['search']
        }
    ]
});


sequelize.sync().then(() => {
  console.log('Database & tables synced!');
});


// END OF DATABASE DECLARATIONS
const port = 8005;

const app = express();


app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// PUBLIC API: //

app.get('/api/items/all', cors(), async (req, res) => {
  	const items = await Item.findAll();
  	res.json(items);
})

app.post('/api/items/search', cors(), async (req, res) => {

	const searchQuery = {
        [Op.and]: req.body.searchQuery.split(" ")
			.map(word => ({
				'$search$': {
					[Op.like]: `%${word}%`
				}
        	}))
    }
  	const items = await Item.findAll({
		where: searchQuery,
		order: [['createdAt', 'DESC']]
	});
  	res.json(items);
})

// END OF PUBLIC API //

// AUTH'ED API: //

async function authAndDo(attemptAuthCode, successCallback=() => {}, failureCallback=() => {}) {
	if (auth(attemptAuthCode)){
		successCallback();
		return true;
	}
	else {
		failureCallback();
		return false;
	}

	function auth(attemptAuthCode) {
		return attemptAuthCode == secret.authCode;
	}
};

app.post('/api/items/login', cors(), async (req, res) => {
	authAndDo(req.body.authCode, () => {
			res.status(200).json({ msg: "Authorized login"});
	}, () => {
			res.status(401).json({ msg: "Unauthorized login"});
	});
});

app.post('/api/items/add', cors(), async (req, res) => {
	authAndDo(req.body.authCode, async () => {
			const data = req.body.data;
			console.log("Good authCode", data);
			const newItem = await Item.create({
				title: data[0][1],
				author: data[1][1],
				content: data[2][1]
			});
			console.log(newItem);
			res.status(201).json({ msg: "Created item"});
		}, () => {
			res.status(401).json({ error: "Unauthorized" });
			console.log(`Wrong authCode`);
		});
});

app.post('/api/items/remove', cors(), async (req, res) => {
	authAndDo(req.body.authCode, () => {
			const id = req.body.id;
			Item.destroy({
				where: {
					id: id
				}
			}).catch(err => {
				console.error('Error deleting record:', err);
			});
			console.log(`Deleted item nr. ${id}`);
			res.status(200).json({ msg: `Removed card with id ${id}`});
		}, () => {
			res.status(401).json({ error: "Unauthorized" });
			console.log(`Wrong authCode`);
		});
});

// END OF AUTH'ED API //

// TEST API: //

app.get('/api/test', async (req, res) => {
	res.json("Hello, world!")
});

// END OF TEST API //

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
