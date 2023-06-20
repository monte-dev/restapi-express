const express = require('express');
const cors = require('cors');

const app = express();

//import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
	res.status(404).json({ message: 'Not found...' });
});
app.listen('8000', () => {
	console.log('app is running');
});
