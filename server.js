const express = require('express'); // note syntax for module (no . or /)
const app = express();

// our data
const fruits = require('./models/fruits.js') // need a relative path to bring in a file -> different than syntax for module

// let's make an index route -> this will list all the fruits
app.get('/fruits', (req, res) => {
	res.send(fruits)
})

// *** SHOW *** route -> show all the info about one particular fruit
app.get('/fruits/:id', (req,res) => {
	// const index = req.params.id;
	// // console.log(fruits[index])
	// res.send(fruits[index]);

	// you "render" templates where you previously just "send"ed data
	// you can pass in the data you want to display in your template as the second parameter
	// your data will ALWAYS be an OBJECT
	// advice: use singular for show page
	res.render('show.ejs', {
		fruit: fruits[req.params.id]
	})
})

app.listen(3000, () => {
	console.log("server listening on port 3000");
})