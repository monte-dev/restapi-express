import Concert from './../Concert/Concert';

const Concerts = ({ concerts }) => {
	return (
		<section>
			{concerts.map((con) => (
				<Concert key={con._id} {...con} tickets={con.seats} />
			))}
		</section>
	);
};

export default Concerts;
