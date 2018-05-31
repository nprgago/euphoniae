import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LanderLogo from '../img/landerlogo.svg';
import '../scss/lander.scss';


class Lander extends Component {
	
	render() {
		
		return(
			<div className='lander'>

				<div className='lander-container'>
					<div className='box info' >
						<img alt='logo' src={LanderLogo} className='lander-logo'/>
						<h1>More Music!</h1>
						<h2>Discover the latest songs of your favorites artists.</h2>
					</div>
				</div>

				<div className='lander-container'>
					<div className='box call-to-action'>
						
						<Link to='/signup'>
							<Button 
								block
								bsStyle='primary' 
								bsSize='large'
							> Sign Up </Button>
						</Link>
						<p> Already registered? </p>
						<Link to='/login'>
							<Button 
								block
								bsSize='large'
							> Log In </Button>
						</Link>
					</div>
				</div>

				
			</div>
		)
	}
}

export default Lander;