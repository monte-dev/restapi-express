const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
	res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
	const randomIndex = Math.floor(Math.random() * db.concerts.length);
	res.json(db.concerts[randomIndex]);
});

router.route('/concerts/:id').get((req, res) => {
	const thisConcert = db.concerts.find(
		(item) => item.id === parseInt(req.params.id)
	);

	res.json(thisConcert);
});

router.route('/concerts').post((req, res) => {
	const { performer, genre, price, day, image } = req.body;

	if (performer && genre && price && day && image) {
		const newTestimonial = {
			id: uuidv4(),
			performer,
			genre,
			price,
			day,
			image,
		};
		db.concerts.push(newConcert);
		res.json({ message: 'OK' });
	} else {
		res.status(400).json({ message: 'Fill in author and text' });
	}
});

router.route('/concerts/:id').put((req, res) => {
	const thisConcert = db.concerts.find(
		(item) => item.id === parseInt(req.params.id)
	);
	const { performer, genre, price, day, image } = req.body;

	thisConcert.performer = performer;
	thisConcert.genre = genre;
	thisConcert.price = price;
	thisConcert.day = day;
	thisConcert.image = image;

	res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
	const index = db.concerts.findIndex(
		(item) => item.id === parseInt(req.params.id)
	);

	db.concerts.splice(index, 1);
	res.json({ message: 'OK' });
});

module.exports = router;
