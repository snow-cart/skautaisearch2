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
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
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

// MAIN API: //

app.get('/api/items', cors(), async (req, res) => {
  	const items = await Item.findAll();
  	res.json(items);
})
app.post('/api/items', cors(), async (req, res) => {
	if (req.body.authCode == secret.authCode) {
		const data = req.body.data;
		console.log("Good authCode", data);
		const newItem = await Item.create({
			title: data[0][1],
			author: data[1][1],
			content: data[2][1]
		});
		console.log(newItem);
  		res.json(newItem);
	}
	else {
    res.status(401).json({ error: "Unauthorized" });
	console.log(`Wrong authCode`);
	}
});

// END OF MAIN API //

// TEST API: //

app.get('/api/test', async (req, res) => {
	res.json("Hello, world!")
});

// END OF TEST API //

var privateKey = fs.readFileSync( './secret/cert/privatekey.pem' );
var certificate = fs.readFileSync( './secret/cert/certificate.pem' );
https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(port);
