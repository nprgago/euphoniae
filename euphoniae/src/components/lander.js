import React, { Component } from 'react';
import { Carousel, Glyphicon } from 'react-bootstrap';
import '../scss/lander.scss';


class Lander extends Component {
	
	importAll = (r) => {
		let images = {};
		r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
		return images;
	}

	render() {
		
		const images = this.importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));
		
		return(
			<div className='lander'>
		        
		        <div className= 'carrousel-container'>
		          <Carousel>
		            
		            <Carousel.Item>
		              <img width={900} height={500} alt="Girl listening music" src={images['carrousel-1.jpg']}/>
		              <Carousel.Caption>
		                <h3>Song Addicted</h3>
		                <p>Find the lastest and up to date songs in Euphoniae </p>
		              </Carousel.Caption>
		            </Carousel.Item>
		            
		            <Carousel.Item>
		              <img width={900} height={500} alt="Girl listening music" src={images['carrousel-2.jpg']} />
		              <Carousel.Caption>
		                <h3>Favorite Songs</h3>
		                <p>Add your best song to your favorites</p>
		              </Carousel.Caption>
		            </Carousel.Item>
		            
		            <Carousel.Item>
		              <img width={900} height={500} alt="Girl listening music" src={images['carrousel-3.jpg']} />
		              <Carousel.Caption>
		                <h3>Star Now</h3>
		                <p>Register to start listing your songs </p>
		              </Carousel.Caption>
		            </Carousel.Item>
		          
		          </Carousel>
		        </div>		    

		        <div className='info'>
		          
		          <span>
		            <Glyphicon glyph="plus" className='btn-lg'/>
		            <h3> 100 Songs </h3>
		            <p> Access to lastes song hits </p> 
		          </span>
		          
		          <span>
		            <Glyphicon glyph="heart" className='btn-lg'/>
		            <h3> Add to Favorites </h3>
		            <p> List of your favorites </p>
		          </span>
		          
		          <span>
		            <Glyphicon glyph="search" className='btn-lg'/>
		            <h3> Song Details</h3>
		            <p> Now more about the songs </p>
		          </span>
		          
		          <span>
		              <Glyphicon glyph="time" className='btn-lg'/>
		              <h3> Less Time </h3>
		              <p> Get time to enjoy music </p>
		          </span>
		        
		        </div>
      		</div>
		)
	}
}

export default Lander;