import React, { Component } from 'react';
import { FormGroup, FormControl, Glyphicon, InputGroup} from "react-bootstrap";
import { Link } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import logo from '../img/login-logo.svg';
import '../scss/Login.scss';

class Login extends Component {

	state = {
		isLoading: false,
		email: '',
		password: '',
		userToken: '',
		userId: '',
		userName: ''		
	}
	
	// Logging In and User Information Retrieval Mechanisms   
	handleSumit = async (event) => {
		event.preventDefault();
		
		// Set state to loading and allow button loading animation to occur
		this.setState({isLoading:true});

		// Variable storage of API info for readability purposes
		const LoginUrl = 'https://songs-api-ubiwhere.now.sh/api/auth/login';
		const LoginBody = {'email': this.state.email, 'password': this.state.password};
		const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
		const UserInfoUrl = 'https://songs-api-ubiwhere.now.sh/api/users/me';

		// Logging In Mechanism 
		await fetch(LoginUrl, {
			method: 'POST', 
			headers: headers, 
			body: JSON.stringify(LoginBody)
		})

		.then(response => response.json())
		.then(data => { 
			
			// If logging in was unsuccessful (code: 401),
			// stop button loading animation and display
			// an error message in the html body   
			if(data.status === 401) {
				this.setState({isLoading: false});
				document.getElementById('Element').style.display = 'block';
			} else {
				// If logging in was successful (returns user token),
				// hide error message and store token in state
				document.getElementById('Element').style.display = 'none';
				this.state.userToken = data.token;
				
				// User Information Retrieval Mechanisms
				fetch(UserInfoUrl, {
					method: 'GET',
					headers : {
					'Accept': 'application/json',
    				'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.state.userToken
					}
				})

				.then(response => response.json())
				.then(data => { 
					// Retrieve user id and name 
					// and store them in state
					this.state.userId = data.id ;
					this.state.userName = data.name;
					
					// Store user information (id, name, token) in current session 
					try {
						sessionStorage.setItem( 'userId', this.state.userId);
						sessionStorage.setItem( 'userName', this.state.userName);
						sessionStorage.setItem( 'userToken', this.state.userToken);
					} catch(e) { console.log(e.message) }

					// Authenticate user and redirect to homepage 
					this.props.userHasAuthenticated(true, this.state.userId, this.state.userToken, this.state.userName);
					this.props.history.push('/');
				})
			}
		});
	}

	// Prevent login submission 
	// if email or password entry is empty 
	validation() {
		return (
			this.state.email.length > 0 && 
			this.state.password.length > 0
		);
	}
	
	// Set state email or password to entry value 
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
					
					<LoaderButton 
						block
						bsStyle='primary'
						bsSize='large'
						type='submit'
						disable={toString(!this.validation())}
						isLoading = {this.state.isLoading}
						text= 'Login'
						loadingText= 'Loggin in ...'
						className='login-button'
					/>
					
					<p id='Element'>Incorrect Email or Password</p>

					<Link to='/signup'>
						<p> Register </p>
					</Link>

				</form>
			</div>
		)
	}
}

export default Login;