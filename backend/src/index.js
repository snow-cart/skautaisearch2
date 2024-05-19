const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


// DATABASE SHIT: //
const sqlite3 = require ('sqlite3');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
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

app.get('/api/items', async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
	if (req.body.auth == "authCode") {
  		const newItem = await Item.create(req.body.data);
  		res.json(newItem);
	}
});

// END OF MAIN API //

// TEST API: //

app.get('/api/test', async (req, res) => {
	const test = {title: 'Hello, world!'};
	res.json(test);
})
app.post('/api/test', async (req, res) => {
	const test = req.body.data;
	console.log(test)
	res.json(test);
})

// END OF TEST API //

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
