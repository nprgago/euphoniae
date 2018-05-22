import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Routes from './Routes';
import logo from './logo.svg';
import './scss/App.scss';

class App extends Component {
  render() {
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
              <LinkContainer to='/signup'>
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to='/login'>
                <NavItem href='/login'>Login</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <hr/>
        <Routes/>  
      </div>
    );
  }
}

export default App;
