const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const socket = require('socket.io');
const mongoose = require('mongoose');

app.use((req, res, next) => {
	req.io = io;
	next();
});

//import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.static(path.join(__dirname, '/client/build')));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
	res.status(404).json({ message: 'Not found...' });
});

const uri = 'mongodb+srv://admin:admin@cluster0.ruxtn9e.mongodb.net/NewWaveDB';

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to the database');
});

db.on('error', (err) => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
	console.log('New socket');
});

module.exports = server;
