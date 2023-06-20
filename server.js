const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = [
	{ id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
	{
		id: 2,
		author: 'Amanda Doe',
		text: 'They really know how to make you happy.',
	},
	{
		id: 3,
		author: 'Rick Doe',
		text: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
	},
	{
		id: 4,
		author: 'Megan Doe',
		text: 'dolor sit amet, consectetur, adipisci velit..',
	},
];

app.get('/testimonials', (req, res) => {
	res.json(db);
});

app.get('/testimonials/random', (req, res) => {
	const randomIndex = Math.floor(Math.random() * db.length);
	res.json(db[randomIndex]);
});

app.get('/testimonials/:id', (req, res) => {
	const thisTestimonial = db.find(
		(item) => item.id === parseInt(req.params.id)
	);

	res.json(thisTestimonial);
});

app.post('/testimonials', (req, res) => {
	const { author, text } = req.body;

	if (author && text) {
		const newTestimonial = {
			id: uuidv4(),
			author,
			text,
		};
		db.push(newTestimonial);
		res.json({ message: 'OK' });
	} else {
		res.status(400).json({ message: 'Fill in author and text' });
	}
});

app.put('/testimonials/:id', (req, res) => {
	const thisTestimonial = db.find(
		(item) => item.id === parseInt(req.params.id)
	);

	const { author, text } = req.body;
	thisTestimonial.author = author;
	thisTestimonial.text = text;

	res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
	const index = db.findIndex((item) => item.id === parseInt(req.params.id));

	db.splice(index, 1);
	res.json({ message: 'OK' });
});

app.use((req, res) => {
	res.status(404).json({ message: 'Not found...' });
});
app.listen('8000', () => {
	console.log('app is running');
});
