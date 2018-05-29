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
		if(!this.props.isAuthenticated) {
			try {
				if(this.props.isSessionStored()) {
					let userInfo = this.props.retrieveSession();
					this.props.userHasAuthenticated(true, parseInt(userInfo.userId, 10), userInfo.userToken, userInfo.userName)
					if(!this.state.areSongsLoaded) {
						this.retrieveSongs();
						this.setState({isLoading: false})
					}
				} else {return}
			} catch(e) {console.log(e.message)}

		} else {
			if(!this.state.areSongsLoaded) {
				this.retrieveSongs();
				this.setState({isLoading: false})
			}
		}
	}

	retrieveSongs = async (event) => {

		let songUrl = 'https://songs-api-ubiwhere.now.sh/api/songs';
		
		await fetch(songUrl)
	    .then(response => response.json())
	    .then(data => { this.setState({
	    	songList: data,
	      	areSongsLoaded : true
	    })});
	    
	    let favoritesURL = 'https://songs-api-ubiwhere.now.sh/api/user-favorites/';
	    
	    await fetch(favoritesURL, {
	    	method:'GET',
	    	headers: {
	    		'Accept': 'application/json',
	          	'Content-Type': 'application/json',
	          	'Authorization': 'Bearer ' + this.props.userToken
	    	}
	    })
	    .then(response => response.json())
	    .then(data => {this.setState({favoriteSongs: data})});	    
	}

	addFavoriteSong = async (event) => {
   	 	event.preventDefault();
   	 	let val = parseInt(event.target.value, 10);
   	 	let addFavoriteUrl = 'https://songs-api-ubiwhere.now.sh/api/user-favorites/';
   	 	let favoriteBody = {'UserId': this.props.userId, 'songId': val};
   	 	await fetch (addFavoriteUrl, {
   	 		method: 'POST',
   	 		headers: {
   	 			'Accept': 'application/json',
	          	'Content-Type': 'application/json',
	          	'Authorization': 'Bearer ' + this.props.userToken
   	 		}, body: JSON.stringify(favoriteBody)
   	 	})

   	 	.then(response => response.json())
   	 	.then(data => {
   	 		if(data.status === 400) {
		        console.log(data.message);
		    } else {
		        let favorites = this.state.favoriteSongs;
		        favorites.push({songId: val, userId: this.props.userId});
		        this.setState( {favoriteSongs: favorites} )
		     }
   	 	});
   	}

   	deleteFavoriteSong = async (event) => {
	    event.preventDefault();
	    let val = parseInt(event.target.value, 10);
	    let deleteFavoriteUrl = 'https://songs-api-ubiwhere.now.sh/api/user-favorites/';
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
	    .then(data => {
		    
		    if(data.status === 400) {
		        console.log(data.message);
		    } else {
		        let favorites = this.state.favoriteSongs;
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
	    })
	}

	
	isSongInFavorites(SongID) {
	    
	    const favorited = this.state.favoriteSongs;
	    let found = false;
	    if(favorited !== []) {
		    for (let object of favorited) {
				found = (object.songId === SongID) ? true : false;
		        if (found) {return true};
		    } 
	    } else {
	      	return false;
	    } 
	}

	handleError = () => {
		this.setState( {imgError: true} );
	} 

	renderSongs() {
	    return(
	      	<ListGroup className='Songs'>
	      		{!this.state.isLoading  
			        ? this.state.songList.map(songObject => (
			          	<ListGroupItem key={songObject.id}>
				            <Thumbnail className='artist-image' target='_blank' alt={songObject.artist} src={this.state.imgError ?  DefaultImage : songObject.imgUrl} onError={this.handleError} />
				            <div className='middle'>
					            <div className= 'text'>
					                <h3> {songObject.title} </h3>
					                <p> by {songObject.artist} </p>
					                
					                {!this.state.imgError ? 
					                <p className='home-buttons'>
					                  	<Button href={songObject.webUrl} target='_blank' bsStyle='default'> Details </Button>
					                </p> : null}

					                <p className='home-buttons'>
					                  	{!this.isSongInFavorites(songObject.id) 
					                  		? <Button value={songObject.id} onClick={this.addFavoriteSong} bsStyle='default'>
					                  			Add to Favorites
					                  		</Button>
						                  	: <Button value={songObject.id} onClick={this.deleteFavoriteSong} bsStyle='default'>
						                  		Remove
						                  	</Button>}
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

	render() {		
		

		return (
			
			<div>
				{this.props.isAuthenticated ? this.renderSongs() : <Lander/>}
			
			</div>
				
		)
	}
}

export default Home;