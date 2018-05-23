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
	
	handleSumit = async (event) => {
		event.preventDefault();
		this.setState({isLoading:true});

		let LoginUrl = 'https://songs-api-ubiwhere.now.sh/api/auth/login';
		let LoginBody = {'email': this.state.email, 'password': this.state.password};
		let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
		let UserInfoUrl = 'https://songs-api-ubiwhere.now.sh/api/users/me';

		await fetch(LoginUrl, {
			method: 'POST', 
			headers: headers, 
			body: JSON.stringify(LoginBody)
		})

		.then(response => response.json())
		.then(data => { 
			if(data.status === 401) {
				this.setState({isLoading: false});
				alert(data.message);
			} else {
				this.state.userToken = data.token;
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
					this.state.userId = data.id ;
					this.state.userName = data.name;
					this.props.userHasAuthenticated(true, this.state.userId, this.state.userToken, this.state.userName);
					this.props.history.push('/');
				})
			}
		});
		

	}

	validation() {
		return (
			this.state.email.length > 0 && 
			this.state.password.length > 0
		);
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

					<Link to='/signup'>
						<p> Register </p>
					</Link>

				</form>
			</div>


		)
	}

}

export default Login;