const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts/:id', () => {
	before(async () => {
		const testConcert = new Concert({
			_id: '5d9f1140f10a81216cfd123a',
			genre: 'Rock',
			price: 25,
			day: 1,
			image: '/img/uploads/1fsd324fsdg.jpg',
			performer: 'Jim Doee',
			seats: 50,
		});
		await testConcert.save();
	});

	it('/:id should delete chosen document and return success', async () => {
		const res = await request(server).delete(
			'/api/concerts/5d9f1140f10a81216cfd123a'
		);
		const concert = await Concert.findOne({
			_id: '5d9f1140f10a81216cfd123a',
		});
		expect(res.status).to.be.equal(200);
		expect(concert).to.be.null;
	});
});
