const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
	res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
	const randomIndex = Math.floor(Math.random() * db.seats.length);
	res.json(db.seats[randomIndex]);
});

router.route('/seats/:id').get((req, res) => {
	const thisSeat = db.seats.find(
		(item) => item.id === parseInt(req.params.id)
	);

	res.json(thisSeat);
});

router.route('/seats').post((req, res) => {
	const { day, seat, client, email } = req.body;

	if (seat && client && email && day) {
		const newSeat = {
			id: uuidv4(),
			day,
			seat,
			client,
			email,
		};
		db.seats.push(newSeat);
		res.json({ message: 'OK' });
	} else {
		res.status(400).json({ message: 'Fill in the details' });
	}
});

router.route('/seats/:id').put((req, res) => {
	const thisSeat = db.seats.find(
		(item) => item.id === parseInt(req.params.id)
	);
	const { day, seat, client, email } = req.body;
	if (day || seat || client || email) {
		thisSeat.day = day;
		thisSeat.seat = seat;
		thisSeat.client = client;
		thisSeat.email = email;

		res.json({ message: 'OK' });
	} else {
		res.status(400).json({ message: 'Fill in the details' });
	}
});

router.route('/seats/:id').delete((req, res) => {
	const index = db.seats.findIndex(
		(item) => item.id === parseInt(req.params.id)
	);

	db.seats.splice(index, 1);
	res.json({ message: 'OK' });
});

module.exports = router;
