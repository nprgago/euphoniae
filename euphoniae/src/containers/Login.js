import React, { Component } from 'react';
import { FormGroup, Button, FormControl, Glyphicon, InputGroup} from "react-bootstrap";
import logo from '../img/login-logo.svg';
import '../scss/Login.scss';

class Login extends Component {

	state = {
		email: '',
		password: '',		
	}

	
	validation() {
		return (
			this.state.email.length > 0 && 
			this.state.password.length > 0
		);
	}

	handleSumit = (event) => {
		event.preventDefault();
	}

	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	render() {
		return(

			<div className= 'Login'>
				<form onSubmit={this.handleSumit}>
					
					<img alt='logo' src={ logo } className='login-logo'/>
					<h1 className='login-title'>Login</h1>
					<FormGroup controlId='email' bsSize='large'>
						<InputGroup>
							<InputGroup.Addon>
								<Glyphicon glyph="user"/>
							</InputGroup.Addon>
							<FormControl
								autoFocus
								type='email' 
								value={this.state.email} 
								onChange={this.handleChange}
								placeholder='Email'
							/>
						</InputGroup>
					</FormGroup>

					<FormGroup controlId='password' bsSize='large'>
						<InputGroup>
							<InputGroup.Addon>
								<Glyphicon glyph="lock"/>
							</InputGroup.Addon>
							<FormControl
								type='password' 
								value={this.state.password} 
								onChange={this.handleChange}
								placeholder='Password'
							/>
						</InputGroup>
					</FormGroup>
					
					<Button 
						block
						bsStyle='primary'
						bsSize='large'
						type='submit'
						disable={toString(!this.validation())}
					>
					Login
					</Button>

				</form>
			</div>


		)
	}

}

export default Login;