const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('POST /api/concerts', () => {
	after(async () => {
		await Concert.deleteMany();
	});

	it('should add new concert to db', async () => {
		const newConcertData = {
			genre: 'Rock',
			price: 25,
			day: 1,
			image: '/img/uploads/1fsd324fsdg.jpg',
			performer: 'Jim Doee',
			seats: 50,
		};

		const res = await request(server)
			.post('/api/concerts')
			.send(newConcertData);

		const addedConcert = await Concert.findOne({
			performer: 'Jim Doee',
		});
		expect(res.status).to.be.equal(200);
		expect(res.body.message).to.be.equal('OK');
		expect(addedConcert).to.not.be.null;
	});
});
