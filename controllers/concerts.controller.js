const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');
exports.getAll = async (req, res) => {
	try {
		const concerts = await Concert.find();

		for (let concert of concerts) {
			const bookedTickets = await Seat.find({ day: concert.day });
			const availableTickets = 50 - bookedTickets.length;
			await Concert.findOneAndUpdate(
				{ _id: concert._id },
				{ seats: availableTickets }
			);
		}
		const updatedConcerts = await Concert.find();
		res.json(updatedConcerts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getRandom = async (req, res) => {
	try {
		const amount = await Concert.countDocuments();
		const randomIndex = Math.floor(Math.random() * amount);
		const concert = await Concert.findOne().skip(randomIndex);
		if (!concert) res.status(404).json({ message: 'Concert not found' });
		else res.json(concert);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.getById = async (req, res) => {
	try {
		const thisConcert = await Concert.findById(req.params.id);
		if (!thisConcert)
			res.status(404).json({ message: 'Concert not found...' });
		else res.json(thisConcert);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.post = async (req, res) => {
	try {
		const { performer, genre, price, day, image } = req.body;

		const newConcert = new Concert({
			performer,
			genre,
			price,
			day,
			image,
		});
		await newConcert.save();
		res.json({ message: 'OK' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.updateById = async (req, res) => {
	try {
		const thisConcert = await Concert.findById(req.params.id);

		const { performer, genre, price, day, image } = req.body;
		if (performer || genre || price || day || image) {
			thisConcert.performer = performer;
			thisConcert.genre = genre;
			thisConcert.price = price;
			thisConcert.day = day;
			thisConcert.image = image;
			await thisConcert.save();
			res.json({ message: 'OK' });
		} else {
			res.status(400).json({ message: 'Fill in the details' });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.deleteById = async (req, res) => {
	try {
		const concert = await Concert.findById(req.params.id);

		if (concert) {
			await Concert.deleteOne({ _id: req.params.id });
			res.json({ message: 'OK' });
		} else {
			res.status(404).json({ message: 'Not found' });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
