// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (request, response) => {
	response.send('Hello world...');
});

// MARK: -- READ USERS
server.get('/api/users', (request, response) => {
	db.find()
		.then(people => {
			response.json(people);
		})
		.catch(err => {
			response.status(500).json({
				success: false,
				errorMessage: "There users information could not be retrieved."
			});
		});
});

// MARK: -- READ USER
server.get('/api/users/:id', (request, response) => {
	const id = request.params.id;
	db.findById(id)
	  .then(person => {
	  	if (person) {
	  		response.status(200).json({ success: true, person});
	  	} else {
	  		response.status(404).json({ success: false, message: "The user with teh specified ID does not exist."});
	  	}
	  })
	  .catch(err => {
	  	response.status(500).json({ success: false, errorMessage: "The user information could not be retrieved."});
	  })
});

// MARK: -- CREATE USER
server.post('/api/users', (request, response) => {
	//const usersInfo = request.body;
	const { name, bio } = request.body;
	console.log('body:', request.body);
	if(!name || !bio) {
		response.status(400)
				.json({ errorMessage: "Please provide a name and bio for the user." })
	} else {
		db.insert(request.body)
		  .then((user) => {
		  	response.status(201).json({ success: true, user});
		  })
		  .catch((err) => {
		  	response.status(500).json({ success: false, errorMessage: "There was an error while saving the user to the DB" });
		  });
	}
});

// MARK: -- DELETE USER
server.delete('/api/users/:id', (request, response) => {
	const id = request.params.id;

	db.remove(id)
	  .then(deletedUser => {
	  	if(deletedUser) {
	  		response.status(204).end();
	  	} else {
	  		response.status(404).json({ success: false, message: "The user with the specified ID does not exist." });
	  	}
	  })
	  .catch(err => {
	  	response.status(500).json({ success: false, errorMessage: 'The user could not be removed'});
	  });
});

// MARK: -- UPDATE USER
server.put('/api/users/:id', (request, response) => {
	const { name, bio } = request.body;
	const user = request.body;
	const id = request.params.id;
	if (!name || !bio) {
		response.status(400).json({ success: false, errorMessage: 'Please provide name and bio for the user.' })
	} else {

		db.update(id, user)
	  	  .then(person => {
	  		if (person) {
	  			response.status(200).json({ success: true, person});
	  		} else {
	  			response.status(404).json({ success: false, message: "The user with the specified ID does not exist"});
	  		}
	  	  })
	  	  .catch(err => {
	  			response.status(500).json({ success: false, errorMessage: "The user information could not be modified." });
	  	  })
	}
});

server.listen(4000, () => {
	console.log("=== server listening on port 4000 ===")
});