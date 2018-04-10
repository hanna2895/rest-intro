const express = require('express'); // note syntax for module (no . or /)
const app = express();

// our data
const fruits = require('./models/fruits.js') // need a relative path to bring in a file -> different than syntax for module

// these are all our ROUTES 

// let's make an index route -> this will list all the fruits
app.get('/fruits', (req, res) => {
	res.render('index.ejs', {
		theFruits: fruits, // <--data
		pageTitle: "FRUITS INDEX"
	})

})

// ** new ** route
// this route will show a template for the user to add fruits
// we put it here to avoid /fruits/:id hijacking it
app.get('/fruits/new', (req, res) => {
	res.render('new.ejs') // we are rendering a template
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

app.post("/fruits", (req, res) => {
	console.log(req)
	res.send("you hit the post route")	
})


app.listen(3000, () => {
	console.log("server listening on port 3000");
})