const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
	before(async () => {
		const testConcert = new Concert({
			_id: '5d9f1140f10a81216cfd1234',
			genre: 'Rock',
			price: 25,
			day: 1,
			image: '/img/uploads/1fsd324fsdg.jpg',
			performer: 'Jim Doee',
			seats: 50,
		});
		await testConcert.save();

		const testConcertTwo = new Concert({
			_id: '5d9f1140f10a81216cfd1111',
			genre: 'Rock',
			price: 25,
			day: 1,
			image: '/img/uploads/1fsd324fsdg.jpg',
			performer: 'Jim Doee',
			seats: 50,
		});
		await testConcertTwo.save();
	});

	after(async () => {
		await Concert.deleteMany();
	});

	it('should return all concerts', async () => {
		const res = await request(server).get('/api/concerts');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(2);
	});

	it('should get a specific concert by ID', async () => {
		const res = await request(server).get(
			`/api/concerts/5d9f1140f10a81216cfd1111`
		);
		expect(res.status).to.equal(200);
		expect(res.body).to.be.an('object');
		expect(res.body).to.not.be.null;
	});
});
