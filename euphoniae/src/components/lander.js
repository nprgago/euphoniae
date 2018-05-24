import React, { Component } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import '../scss/lander.scss';


class Lander extends Component {
	
	render() {
		
		return(
			<div className='lander'>
		       	
		       	<h1>More Music!</h1>
		       	<h2>Discover the lastest songs of your favorites artists.</h2>
		       	
		       	<Link to='/signup'>
					<p> Signup </p>
				</Link>


		       	<div className= 'container'>
			        <div className='counter'>
						<CountUp start={0} end={1250} />
						<h3> Songs </h3>
					</div>
					<div className='counter'>
						<CountUp start={0} end={8000} />
						<h3> Users </h3>
					</div>
					<div className='counter'>
						<CountUp start={0} end={100} />
						<h3> Shares </h3>
					</div>
					<div className='counter'>
						<CountUp start={0} end={100} />
						<h3> Happy Moments </h3>
					</div>
				</div>
		    </div>
		)
	}
}

export default Lander;