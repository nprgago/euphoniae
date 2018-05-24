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
    userId: '',
    userName: ''
  }

  userHasAuthenticated = (authenticated=true, userId='', userToken='', userName='') => {
      
      this.setState({ 
          isAuthenticated: authenticated,
          userId: userId,
          userToken: userToken,
          userName: userName
      });
  }

  isSessionStored = () => {
    let isStored =  sessionStorage.getItem('userToken') === null ? false : true;
    return isStored;
  }

  retrieveSession = () => {
    let sessionObject = {};
    sessionObject.userId = sessionStorage.getItem('userId'); 
    sessionObject.userName = sessionStorage.getItem('userName');
    sessionObject.userToken = sessionStorage.getItem('userToken');
    return sessionObject
  };

  handleLogout = event => {
    this.userHasAuthenticated(false);
    sessionStorage.clear();
  }

  render() {
    
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      userId: this.state.userId,
      userToken: this.state.userToken,
      userName: this.state.userName,
      isSessionStored: this.isSessionStored,
      retrieveSession: this.retrieveSession
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
