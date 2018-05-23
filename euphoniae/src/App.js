import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Routes from './Routes';
import logo from './logo.svg';
import './scss/App.scss';

class App extends Component {
  
  state = {
    isAuthenticated: false,
    userToken: '',
    userId: ''
  }

  userHasAuthenticated = (authenticated, userId, userToken) => {
    
    authenticated = (typeof authenticated !== 'undefined') ? authenticated: true;
    userId = (typeof userId !== 'undefined') ? userId: '';
    userToken = (typeof userToken !== 'undefined') ? userToken: '';

    this.setState({ 
      isAuthenticated: authenticated,
      userId: userId,
      userToken: userToken
    });
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
  }


  render() {
    
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      userId: this.state.userId,
      userToken: this.state.userToken
    };

    return (
      <div className="App Container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>
                <img alt='logo' src={ logo } className='logo pull-left'/>
                <span className='title pull-left'>Euphoniae</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem> 
                : <Fragment>
                  <LinkContainer to='/Signup'>
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/Login'>
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <hr/>
        <Routes childProps= {childProps}/>  
      </div>
    );
  }
}

export default App;
