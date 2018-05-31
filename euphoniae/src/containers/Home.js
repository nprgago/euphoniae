import React, { Component } from 'react';
import { Button, 
  ListGroup, 
  ListGroupItem, 
  Thumbnail
} from 'react-bootstrap';
import Lander from '../components/lander';
import DefaultImage from '../img/default.jpg';
import '../scss/Home.scss'


class Home extends Component {

	state= {
		isLoading: true,
		areSongsLoaded: false,
	    songList: [],
	    favoriteSongs: [],
	    imgError: false,
	}

	componentDidMount() {
		// When user is not authenticated, check for stored sessions. If session was stored, retrieve user information
		// and process authentication, preventing data loss (regarding user information) when refreshing the page. 
		// If songs weren't loaded, retrieve them and the user favorites. Finally set state 'isloading' to false
		// allowing songs to be displayed in the DOM. If user is not authenticated and don't have a stored session
		// return until authentication occur. 
		if(!this.props.isAuthenticated) {
			try {
				if(this.props.isSessionStored()) {     
					const userInfo = this.props.retrieveSession();
					this.props.userHasAuthenticated(true, parseInt(userInfo.userId, 10), userInfo.userToken, userInfo.userName)
					if(!this.state.areSongsLoaded) {
						this.retrieveSongs();
						this.setState({isLoading: false})
					}
				} else {return}
			} catch(e) {console.log(e.message)}

		// When user is authenticated, check if songs were loaded. If not, retrieve them and the user favorites.
		// Then set state 'isloading' to false allowing songs to be displayed in the DOM
		} else {
			if(!this.state.areSongsLoaded) {
				this.retrieveSongs();
				this.setState({isLoading: false})
			}
		}
	}

	// Songs Retrieval   
	retrieveSongs = async (event) => {

		// Retrieving all songs from server
		const songUrl = 'https://songs-api-ubiwhere.now.sh/api/songs';
		await fetch(songUrl)
	    .then(response => response.json())
	    // After retrieval, store songs in state 
	    .then(data => { this.setState({ songList: data })});
	    
	    // Retrieving user favorite songs from server using user token
	    const favoritesURL = 'https://songs-api-ubiwhere.now.sh/api/user-favorites/';
	    await fetch(favoritesURL, {
	    	method:'GET',
	    	headers: {
	    		'Accept': 'application/json',
	          	'Content-Type': 'application/json', 
	          	'Authorization': 'Bearer ' + this.props.userToken
	    	}
	    })
	    .then(response => response.json())
	    // After rerieval, store favorites in state and flag songs as loaded
	    .then(data => {this.setState({
	    	favoriteSongs: data,
	    	areSongsLoaded : true
	    })});	    
	}

	// Add to Favorites 
	addFavoriteSong = async (event) => {
   	 	event.preventDefault();
   	 	const val = parseInt(event.target.value, 10);
   	 	const addFavoriteUrl = 'https://songs-api-ubiwhere.now.sh/api/user-favorites/';
   	 	const favoriteBody = {'UserId': this.props.userId, 'songId': val};
   	 	
   	 	// Add favorite song (song id and user id) to user server information using user token 
   	 	await fetch (addFavoriteUrl, {
   	 		method: 'POST',
   	 		headers: {
   	 			'Accept': 'application/json',
	          	'Content-Type': 'application/json',
	          	'Authorization': 'Bearer ' + this.props.userToken
   	 		}, body: JSON.stringify(favoriteBody)
   	 	})
   	 	.then(response => response.json())
   	 	// If song exist on favorites, log error message
   	 	// If not, push song to state 'favoritesSongs' list
   	 	.then(data => {
   	 		if(data.status === 400) {
		        console.log(data.message);
		    } else {
		        const favorites = this.state.favoriteSongs;
		        favorites.push({songId: val, userId: this.props.userId});
		        this.setState( {favoriteSongs: favorites} )
		     }
   	 	});
   	}

   	// Delete song from favorites
   	deleteFavoriteSong = async (event) => {
	    event.preventDefault();
	    const val = parseInt(event.target.value, 10);
	    const deleteFavoriteUrl = 'https://songs-api-ubiwhere.now.sh/api/user-favorites/';
	    
	    // Delete song from user favorites server information using user token and the song id
	    await fetch(deleteFavoriteUrl, {
	        method: 'DELETE',
	        headers: {
	          	'Accept': 'application/json',
	          	'Content-Type': 'application/json',
	          	'Authorization': 'Bearer ' + this.props.userToken
	        }, body: JSON.stringify({
	          	'songId': val
	        })
	    })
	    .then(response => response.json())
	    // If song doesn't exist on favorites, log an error message.
	    // If song exists, loop over state 'favoriteSongs' list and retrieve the song object index.
	    // Then remove object from list and store new 'favoriteSongs' list on state.  
	    .then(data => {    
		    if(data.status === 400) {
		        console.log(data.message);
		    } else {
		        const favorites = this.state.favoriteSongs;
		        let index = 0;
		        try {
		        	for (let object of favorites) {
				        if(object.songId !== val) {
				        	index += 1;
			        	} else { return;}
				    };
		        } finally {
		        	favorites.splice(index, 1);
			    	this.setState( {favoriteSongs: favorites} )
		        }
			}
	    });
	}

	// Check if song is a favorite one to display the correct button ('add to favorite' or 'remove') in the DOM
	isSongInFavorites(SongID) {
	    const favorited = this.state.favoriteSongs;
	    let found = false; 
	    if(favorited !== []) {
		    // If favorite songs list is not empty, loop over it 
		    // and check if song exists and return boolean 
		    for (let object of favorited) {
				found = (object.songId === SongID) ? true : false;
		        if (found) {return true};
		    } 
	    } else {
	    	// If favorite songs list is empty return false and prevent unnecessary computation
	      	return false;
	    } 
	}

	// If fecting image (url) return a server error, 
	// set state 'imgError' to true and render default image 
	handleError = () => {
		this.setState( {imgError: true} );
	} 

	// If state 'isloading' is false, map over each song and return html elements with corresponding song informations. 
	// Then if state 'imgError' is false return artist image url, else return default image. If the song exists on 'favoriteSongs' 
	// list then render 'remove' button, else render 'add to favorite' button.     
	renderSongs() {
	    return(
	      	<ListGroup className='Songs'>
	      		{!this.state.isLoading  
			        ? this.state.songList.map(songObject => (
			          	
			          	<ListGroupItem key={songObject.id}>
				            
				            <Thumbnail 
				            	className='artist-image' 
				            	target='_blank' 
				            	alt={songObject.artist} 
				            	src={this.state.imgError ?  DefaultImage : songObject.imgUrl} 
				            	onError={this.handleError} 
				            />

				            <div className='middle'>
					            <div className= 'text'>
					                <h3> {songObject.title} </h3>
					                <p> by {songObject.artist} </p>
					                
					                {!this.state.imgError 
					                	? <p className='home-buttons'>
					                  		<Button href={songObject.webUrl} target='_blank' bsStyle='default'> Details </Button>
					                	</p> 
					                	: null
					                }

					                <p className='home-buttons'>
					                  	{!this.isSongInFavorites(songObject.id) 
					                  		? <Button value={songObject.id} onClick={this.addFavoriteSong} bsStyle='default'>
					                  			Add to Favorites
					                  		</Button>
						                  	: <Button value={songObject.id} onClick={this.deleteFavoriteSong} bsStyle='default'>
						                  		Remove
						                  	</Button>
						                }
					                </p>
					            </div>
			            	</div>

			          	</ListGroupItem>
			        ))
			       : null
			    }
	      	</ListGroup>
	    )
	}

	// If user is authenticated render songs, else render landing page 
	render() {		
		return (
			<div>
				{this.props.isAuthenticated ? this.renderSongs() : <Lander/>}
			</div>	
		)
	}
}

export default Home;