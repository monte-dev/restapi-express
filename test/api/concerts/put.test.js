const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('PUT /api/concerts/:id', () => {
	before(async () => {
		const testConcert = new Concert({
			_id: '5d9f1140f10a81216cfd4408',
			genre: 'Rock',
			price: 25,
			day: 1,
			image: '/img/uploads/1fsd324fsdg.jpg',
			performer: 'Jim Doee',
			seats: 50,
		});
		await testConcert.save();
	});

	after(async () => {
		await Concert.deleteMany();
	});

	it('should update a concert by ID', async () => {
		const updatedConcertData = {
			genre: 'Pop',
			price: 30,
			day: 2,
			image: '/img/uploads/new-image.jpg',
			performer: 'Updated Performer',
		};

		const res = await request(server)
			.put(`/api/concerts/5d9f1140f10a81216cfd4408`)
			.send(updatedConcertData);

		expect(res.status).to.be.equal(200);
		expect(res.body.message).to.be.equal('OK');

		const updatedConcert = await Concert.findById(
			'5d9f1140f10a81216cfd4408'
		);
		expect(updatedConcert).to.not.be.null;
		expect(updatedConcert.genre).to.be.equal(updatedConcertData.genre);
		expect(updatedConcert.price).to.be.equal(updatedConcertData.price);
		expect(updatedConcert.day).to.be.equal(updatedConcertData.day);
		expect(updatedConcert.image).to.be.equal(updatedConcertData.image);
		expect(updatedConcert.performer).to.be.equal(
			updatedConcertData.performer
		);
	});
});
