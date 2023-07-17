const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
	try {
		res.json(await Testimonial.find());
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.getRandom = async (req, res) => {
	try {
		const amount = await Testimonial.countDocuments();
		const randomIndex = Math.floor(Math.random() * amount);
		const testim = await Testimonial.findOne().skip(randomIndex);
		if (!testim) res.status(404).json({ message: 'No testimonials found' });
		else res.json(testim);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.getById = async (req, res) => {
	try {
		const thisTestimonial = await Testimonial.findById(req.params.id);
		if (!thisTestimonial)
			res.status(404).json({
				message: 'No testimonial found with given ID...',
			});
		else res.json(thisTestimonial);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.post = async (req, res) => {
	try {
		const { author, text } = req.body;
		if (author && text) {
			const newTestimonial = new Testimonial({
				author,
				text,
			});
			await newTestimonial.save();
			res.json({ message: 'OK' });
		} else {
			res.status(400).json({ message: 'Fill in author and text' });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.updateById = async (req, res) => {
	try {
		const thisTestimonial = await Testimonial.findById(req.params.id);

		const { author, text } = req.body;
		if (author || text) {
			thisTestimonial.author = author;
			thisTestimonial.text = text;
			await thisTestimonial.save();
			res.json({ message: 'OK' });
		} else {
			return res.status(400).json({ message: 'Fill in author and text' });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.deleteById = async (req, res) => {
	try {
		const testimonial = await Testimonial.findById(req.params.id);

		if (testimonial) {
			await Testimonial.deleteOne({ _id: req.params.id });
			res.json({ message: 'OK' });
		} else {
			res.status(404).json({
				message: 'Testimonial not found, cannot delete...',
			});
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
