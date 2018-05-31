import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Glyphicon } from 'react-bootstrap';
import notfound from '../img/404.svg'; 
import "../scss/NotFound.scss";

export default () =>
    <div className="NotFound">

        <div className='error-message'>
        	
            <h1>Oops</h1>
            <h2> We can't seem to found the page you're looking for</h2>
            <h3> Error code: 404</h3>
            <p> Here are some helpful links instead </p>
            <ul>

                <LinkContainer to='./'>
                    <li> 
                        <Glyphicon glyph="home" className='btn-lg'/>
                        <span> Home </span> 
                    </li>
                </LinkContainer>

                <LinkContainer to='/login'>
                    <li> 
                        <Glyphicon glyph="user" className='btn-lg'/>
                        <span> Login </span> 
                    </li>
                </LinkContainer>

                <LinkContainer to='/signup'>
                <li> 
                    <Glyphicon glyph="pencil" className='btn-lg'/>
                    <span> Signup </span> 
                </li>
                </LinkContainer>

            </ul>

        </div>

        <div className='error-image'>
            <img alt='404 not found' src={notfound}/>
        </div>	

    </div>;