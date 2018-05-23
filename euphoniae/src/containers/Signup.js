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


  handleSumit = async (event) => {
  	event.preventDefault();
    this.setState({ isLoading:true });

    let RegisterUrl = 'https://songs-api-ubiwhere.now.sh/api/auth/register';
    let RegisterBody = {'name': this.state.userName, 'email': this.state.email, 'password': this.state.password};
    let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
    
    await fetch(RegisterUrl, {
    	method: 'POST',
    	headers: headers,
    	body: JSON.stringify(RegisterBody)
    })

    .then(response => response.json())
    .then(data => {
      if(data.status === 400) {
    		alert(data.message);
        this.setState({isLoading: false });
    	} else {
        alert('Register successful. Login');
        this.props.history.push('/login')
    	}
    })
  }

  validation() {
    return( 
      this.state.userName.length > 0 &&
      this.state.email.length > 0 && 
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

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

          <Link to='/Login'>
            <p> Already registered? </p>
          </Link>

        </form>
      </div>
    );
  }

}

export default Signup;