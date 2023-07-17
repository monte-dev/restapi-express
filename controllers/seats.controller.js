const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
	try {
		res.json(await Seat.find());
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.getRandom = async (req, res) => {
	try {
		const amount = await Seat.countDocuments();
		const randomIndex = Math.floor(Math.random() * amount);
		const seat = await Seat.findOne().skip(randomIndex);
		if (!seat) res.status(404).json({ message: 'No seat found' });
		else res.json(seat);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.getById = async (req, res) => {
	try {
		const thisSeat = await Seat.findById(req.params.id);
		if (!thisSeat) res.status(404).json({ message: 'Seat not found' });
		else res.json(thisSeat);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.post = async (req, res) => {
	try {
		const { day, seat, client, email } = req.body;

		const newSeat = new Seat({
			day,
			seat,
			client,
			email,
		});
		await newSeat.save();
		req.io.emit('seatsUpdated', await Seat.find());
		res.json({ message: 'OK' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.updateById = async (req, res) => {
	try {
		const { day, seat, client, email } = req.body;
		const thisSeat = await Seat.findById(req.params.id);
		if (thisSeat) {
			thisSeat.day = day;
			thisSeat.seat = seat;
			thisSeat.client = client;
			thisSeat.email = email;
			await thisSeat.save();
			res.json({ message: 'OK' });
		} else {
			res.status(400).json({ message: 'Fill in the details to update' });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.deleteById = async (req, res) => {
	try {
		const seat = Seat.findById(req.params.id);
		if (seat) {
			await Seat.deleteOne({ _id: req.params.id });
			res.json({ message: 'OK' });
		} else {
			res.status(404).json({ message: 'Not found' });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
