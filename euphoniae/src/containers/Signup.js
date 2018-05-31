import React, { Component } from "react";
import { FormGroup, FormControl, Glyphicon, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import LoaderButton from "../components/LoaderButton";
import "../scss/Signup.scss";

class Signup extends Component {
  
    state = {
        isLoading: false,
        userName: '',
        email: '',
        password: '',
        confirmPassword: "",
    };

    // Signig In Mechanism  
    handleSumit = async (event) => {
      	event.preventDefault();
        
        // Set state to loading and allow button loading animation to occur
        this.setState({ isLoading:true });

        // Variable storage of API info for readability purposes
        const RegisterUrl = 'https://songs-api-ubiwhere.now.sh/api/auth/register';
        const RegisterBody = {'name': this.state.userName, 'email': this.state.email, 'password': this.state.password};
        const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
        
        await fetch(RegisterUrl, {
          	method: 'POST',
          	headers: headers,
          	body: JSON.stringify(RegisterBody)
        })

        .then(response => response.json())
        .then(data => {
            
            // If sign in was unsuccessful (code: 400)
            // display error message in the html body and
            // stop button loading animation
            if(data.status === 400) {
                document.getElementById('Element').style.display = 'block';
                this.setState({isLoading: false });
          	} else {
                // If sign in was successful hide error message
                // and redirect user to login page 
                document.getElementById('Element').style.display = 'none';
                this.props.history.push('/login')
          	}
        })
    }

    // Prevent sign in submission if user name, email or password entry is empty
    // or confirmation password is different from password
    validation() {
        return( 
            this.state.userName.length > 0 &&
            this.state.email.length > 0 && 
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    // Set state name, email, password 
    // or confirm password to entry value
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return(
            <div className='Signup'>
                <form onSubmit={this.handleSumit}>
                  
                    <h1>Signup</h1>

                    <FormGroup controlId="userName" bsSize="large">
                        <InputGroup className='labels'>
                            <InputGroup.Addon>
                                <Glyphicon glyph="user"/>
                            </InputGroup.Addon>
                            <FormControl
                                autoFocus
                                type="name"
                                value={this.state.userName}
                                onChange={this.handleChange}
                                placeholder='Username'
                            />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup controlId="email" bsSize="large">
                        <InputGroup className='labels'>
                            <InputGroup.Addon>@</InputGroup.Addon>
                            <FormControl
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder='Email'
                            />
                        </InputGroup>
                    </FormGroup>
                    
                    <FormGroup controlId="password" bsSize="large">
                        <InputGroup className='labels'>
                            <InputGroup.Addon>
                                <Glyphicon glyph="lock"/>
                            </InputGroup.Addon>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                                placeholder='Password'
                            />
                          </InputGroup>
                    </FormGroup>
                    
                    <FormGroup controlId="confirmPassword" bsSize="large">
                        <InputGroup className='labels'>
                            <InputGroup.Addon>
                                <Glyphicon glyph="lock"/>
                            </InputGroup.Addon>
                            <FormControl
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                type="password"
                                placeholder='Confirm Password'
                            />
                        </InputGroup>
                    </FormGroup>
                    
                    <LoaderButton
                        block
                        bsStyle='primary'
                        bsSize="large"
                        disabled={!this.validation()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Signup"
                        loadingText="Signing up…"
                    />
                    
                    <p id='Element'>User already exists</p>
                    
                    <Link to='/Login'> 
                        <p> Already registered? </p>
                    </Link>

                </form>
            </div>
        );
    }
}

export default Signup;