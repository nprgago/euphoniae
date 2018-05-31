import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
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

    // Set the authenticated state (true or false)
    // (If true) it receives the user information (id, token and name) as arguments
    // (If false) it uses default values to reset the user information 
    userHasAuthenticated = (authenticated=true, userId='', userToken='', userName='') => {         
        this.setState({ 
            isAuthenticated: authenticated,
            userId: userId,
            userToken: userToken,
            userName: userName
        });
    }

    // Check if session was stored or not (null)
    // Returns a boolean accordinly    
    isSessionStored = () => {
        const isStored =  sessionStorage.getItem('userToken') === null ? false : true;
        return isStored;
    }

    // Retrieve user information from stored session
    // Returns an object (with user id, name and token)
    retrieveSession = () => {
        const sessionObject = {};
        sessionObject.userId = sessionStorage.getItem('userId'); 
        sessionObject.userName = sessionStorage.getItem('userName');
        sessionObject.userToken = sessionStorage.getItem('userToken');
        return sessionObject
    };

    // If loggin out, set the authenticated state to false,
    // reset user information to default values ('') and clear session 
    handleLogout = event => {
        this.userHasAuthenticated(false);
        sessionStorage.clear();
    }

    render() {
      
        // Set props (authentication handling, user information and session storage) to be inherited  
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
                {this.state.isAuthenticated 
                    ? <Navbar fluid collapseOnSelect>
                      
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
                                <NavItem onClick={this.handleLogout}>Logout</NavItem>
                            </Nav>
                        </Navbar.Collapse>

                    </Navbar>
                    : null
                }
                <Routes childProps= {childProps}/>  
            </div>
        );
    }
}

export default App;
