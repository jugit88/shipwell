const express = require('express');
var index = require('./index')
const app = express();

const PORT = 3000; 

app.get('/', function(req,res) {
	res.send(index);
})

app.listen(3000,() => {
	console.log(`Listening on ${PORT}`)
})