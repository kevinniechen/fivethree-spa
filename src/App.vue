<template>

	<div id='app'>

		<!-- NAV -->
		<nav class="nav has-shadow" style="margin-bottom:1em">
			<div class="container">
				<div class="nav-left">
					<a class="nav-item">
						<img src="/static/logo.png" alt="Logo">
					</a>
				</div>
				<span class="nav-toggle">
					<span></span>
					<span></span>
					<span></span>
				</span>
				<div class="nav-right nav-menu">
					<a class="nav-item" href="https://github.com/kevchn">Source Code</a>
				</div>
			</div>
		</nav>

		<!-- SEARCH -->
		<div class="columns is-mobile">
			<div class="column is-8-desktop is-offset-2-desktop is-8-tablet is-offset-2-tablet is-10-mobile is-offset-1-mobile">
				<form class="search-form" v-on:submit.prevent="search">
					<div class="field has-addons">
						<p class="control is-expanded">
							<input class="input" type="input" placeholder="Enter your location" v-model="location" required>
						</p>
						<p class="control">
							<button class="button is-info" type="submit" :class="{'is-loading': searching}">
								Search
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>

		<!-- BUSINESS RESULTS -->
		<div class="column">
			<div class="columns">
				<!-- @click="clickMarker(business)" -->
				<div class="column" v-for="business,index in businesses">
					<business-panel :businessData="business" :index="index" :key="index" v-on:addSelection="addSelectedImage(index)" v-on:removeSelection="removeSelectedImage(index)" ></business-panel>
				</div>
			</div>
		</div>

		<!-- STATS -->
		<!-- <div class="box">
				<nav class="level">
				  <div class="level-item has-text-centered">
					<div>
						<a :href="selectedBusiness.url" target="_blank">
						  <p class="heading">Business</p>
						  <p class="title">{{selectedBusiness.name}}</p>
					  </a>
					</div>
				  </div>
				  <div class="level-item has-text-centered">
					<div>
						<a :href="selectedBusiness.url" target="_blank">
						  <p class="heading">Address</p>
						  <p class="title">{{selectedBusiness.location.display_address[0]}}</p>
					  </a>
					</div>
				  </div>
				  <div class="level-item has-text-centered">
					<div>
						<a :href="'tel:' + selectedBusiness.display_phone">
						  <p class="heading">Phone</p>
						  <p class="title">{{selectedBusiness.display_phone}}</p>
					  </a>
					</div>
				  </div>
				  <div class="level-item has-text-centered">
					<div>
						<a :href="selectedBusiness.url" target="_blank">
						  <p class="heading">Reviews</p>
						  <p class="title">{{selectedBusiness.review_count}}</p>
						 </a>
					</div>
				  </div>
				</nav>
		</div> -->

		<!-- MAP -->
		<div class="column">
			<gmap-map
				:center="center"
				:zoom="zoom"
				map-type-id="terrain"
				style="width: 100%; height: 500px;"
				:options="mapOptions"
				>
				 <gmap-marker
					v-for="business in businesses"
					:position="{lat:business.coordinates.latitude, lng:business.coordinates.longitude}"
					:clickable="true"
					@click="clickMarker(business)"
					@mouseover="statusBackup = statusText; statusText = business.name"
					@mouseout="statusText = statusBackup"
				></gmap-marker>

		  <div slot="visible">
			<div style="bottom: 2px; left: 2px; background-color: white; color: black; position: absolute; z-index: 100">
			  {{statusText}}
			</div>
		  </div>

			</gmap-map>
		</div>

		<!-- FUN -->
		<div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
	<div class="tile">

	  <div class="tile is-parent is-vertical">
		<article class="tile is-child notification is-primary">
		  <p class="title">Vertical...</p>
		  <p class="subtitle">Top tile</p>
		</article>
		<article class="tile is-child notification is-warning">
		  <p class="title">...tiles</p>
		  <p class="subtitle">Bottom tile</p>
		</article>
	  </div>

	  <div class="tile is-parent">
		<article class="tile is-child notification is-info">
		  <p class="title">Middle tile</p>
		  <p class="subtitle">With an image</p>
		  <figure class="image is-4by3">
			<img src="http://bulma.io/images/placeholders/640x480.png">
		  </figure>
		</article>
	  </div>
	</div>
	<div class="tile is-parent">
	  <article class="tile is-child notification is-danger">
		<p class="title">Wide tile</p>
		<p class="subtitle">Aligned with the right tile</p>
		<div class="content">
		  <!-- Content -->
		</div>
	  </article>
	</div>
  </div>
  <div class="tile is-parent">
	<article class="tile is-child notification is-success">
	  <div class="content">
		<p class="title">Tall tile</p>
		<p class="subtitle">With even more content</p>
		<div class="content">
		  <!-- Content -->
		</div>
	  </div>
	</article>
  </div>
</div>

	</div>

</template>

<script>
import BusinessPanel from './components/BusinessPanel.vue';

export default {
	name: 'app',
	components: {
		BusinessPanel
	},

	data () {
		return {
			/* Default Location: NYC */
			zoom: 12,
			term: 'food',
			location: 'NYC',
			center: {},
			prevQueryString: '',
			businesses: [],
			searching: false,
			statusBackup: '',
			statusText: '',
			selectedBusiness: {},
			imagesSelected: [],
			mapOptions:{
				styles: [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 33
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2e5d4"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5dac6"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5c6c6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e4d7c6"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbfaf7"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#acbcc9"
            }
        ]
    }
],
				scrollwheel: false,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,
			},
		};
	},
	computed:{
		selectedImagesString: function(){
			return null;
		},
	},

	mounted() {
		this.search();
	},

	methods: {

		search() {
			this.zoom = 12.01;
			this.searching = true;

			var url = 'http://104.131.185.181/business?';

			url += 'term=' + this.term + '&';
			url += 'location=' + this.location + '&';

			if(this.prevQueryString === url) {
				this.searching = false;
				return;
			} else {
				this.prevQueryString = url;
			}

			var xhr = new XMLHttpRequest();
			if ('withCredentials' in xhr) {
				xhr.open('GET', url, true);
			} else if (typeof XDomainRequest != 'undefined') {
				xhr = new XDomainRequest();
				xhr.open('GET', url);
			} else {
				xhr = null;
			}

			if (!xhr) {
				alert('CORS not supported');
				return;
			}

			/* Upon response, update business property */
			xhr.onload = function() {
				this.searching = false;
				this.zoom = 12;
				var text = xhr.responseText;
				try {
					this.businesses = JSON.parse(text).businesses.slice(0,5);
					this.center = {lat:this.businesses[0].coordinates.latitude, lng:this.businesses[0].coordinates.longitude};
					this.selectedBusiness = this.businesses[0];
				} catch (err) {
					this.searching = false;
					alert('Error: Yelp is busy. Please try again later.');
				}
			}.bind(this);

			xhr.onerror = function() {
				this.searching = false;
				alert('Error: Yelp is busy. Please try again later.');
			}.bind(this);

			xhr.send();

		},

		clickMarker(business) {
			this.center = {lat:business.coordinates.latitude, lng:business.coordinates.longitude};
			this.zoom = 14;
			this.selectedBusiness = business;
			/* Select business panel */
		},

		addSelectedImage() {

		},
		removeSelectedImage() {

		}


	},

};
</script>

<!-- Specific Styles -->
<style>
input {
	font-size: 1em;
}
</style>

<!-- General Styles -->
<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

h1, h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
