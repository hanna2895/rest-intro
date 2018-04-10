const express = require('express'); // note syntax for module (no . or /)
const app = express();
const bodyParser = require('body-parser')

// our data
const fruits = require('./models/fruits.js') // need a relative path to bring in a file -> different than syntax for module


// MIDDLEWARE
// you app.use middleware
// include some code to do a thing
// next will continue on to the route
// put this above routes / controllers
app.use((req, res, next) => {
	console.log(' I am middleware and will be run for all routes. Thanks for stopping by!');
	next();
})

// we are USING the body-parser middleware
// it is a module that will let us see the form data in our POST requests
app.use(bodyParser.urlencoded({extended: false}))


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
	// console.log(req)
	console.log(req.body);


	// add a new object to our fruits array
	const newFruit = {
		name: req.body.name,
		color: req.body.color
	}

	if (req.body.readyToEat === "on") {
		newFruit.readyToEat = true;
	} else {
		newFruit.readyToEat = false;
	}

	fruits.push(newFruit)
	// you can redirect the user in lieu of render or send
	res.redirect('/fruits')	
})


app.listen(3000, () => {
	console.log("server listening on port 3000");
})