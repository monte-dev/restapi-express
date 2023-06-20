const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
	res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
	const randomIndex = Math.floor(Math.random() * db.testimonials.length);
	res.json(db.testimonials[randomIndex]);
});

router.route('/testimonials/:id').get((req, res) => {
	const thisTestimonial = db.testimonials.find(
		(item) => item.id === parseInt(req.params.id)
	);

	res.json(thisTestimonial);
});

router.route('/testimonials').post((req, res) => {
	const { author, text } = req.body;

	if (author && text) {
		const newTestimonial = {
			id: uuidv4(),
			author,
			text,
		};
		db.testimonials.push(newTestimonial);
		res.json({ message: 'OK' });
	} else {
		res.status(400).json({ message: 'Fill in author and text' });
	}
});

router.route('/testimonials/:id').put((req, res) => {
	const thisTestimonial = db.testimonials.find(
		(item) => item.id === parseInt(req.params.id)
	);

	const { author, text } = req.body;
	if (author || text) {
		thisTestimonial.author = author;
		thisTestimonial.text = text;

		res.json({ message: 'OK' });
	} else {
		return res.status(400).json({ message: 'Fill in author and text' });
	}
});

router.route('/testimonials/:id').delete((req, res) => {
	const index = db.testimonials.findIndex(
		(item) => item.id === parseInt(req.params.id)
	);

	db.testimonials.splice(index, 1);
	res.json({ message: 'OK' });
});

module.exports = router;
