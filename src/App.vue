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

			<div v-if="!imagesFlippedUp">
				<h1 class="title is-1">Pick <strong>three</strong> you're in the mood for!</h1>
				<h1 class="subtitle is-6" style="margin-bottom: 2vh">(automatically generated from your location)</h1>

				<!-- CATEGORY INPUT -->
				<div class="columns">
					<div class="column" v-for="business, index in filteredBusinesses">
						<choose-panel :categories="fiveCategories" :index="index" :key="index" v-on:addSelection="addSelectedImage(index)" v-on:removeSelection="removeSelectedImage(index)"></choose-panel>
					</div>
				</div>
			</div>
			
			<!-- RESULTS -->
			<div v-else class="columns">
				<div class="column" v-for="business, index in filteredBusinesses" @click="clickMarker(business)">
					<business-panel :businessData="business" :index="index" :key="index"></business-panel>
				</div>
			</div>

		</div>

		<!-- MAP -->
		<div class="column">
			<div class="card">

				<div class="image-content">
					<div class="content">
						<gmap-map
							:center="center"
							:zoom="zoom"
							map-type-id="terrain"
							style="width: 100%; height: 60vh;"
							:options="mapOptions"
							>
							 <gmap-marker
								v-for="business in businesses"
								v-if="!filteredBusinesses.includes(business) && (business != selectedBusiness)"
								:position="{lat:business.coordinates.latitude, lng:business.coordinates.longitude}"
								:clickable="true"
								:icon="{url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}"
								@click="clickMarker(business)"
								@mouseover="statusBackup = statusText; statusText = business.name"
								@mouseout="statusText = statusBackup"
							></gmap-marker>
							
							<gmap-marker
								v-if="imagesFlippedUp && (business != selectedBusiness)"
								v-for="business in filteredBusinesses"
								:position="{lat:business.coordinates.latitude, lng:business.coordinates.longitude}"
								:clickable="true"
								:icon="{url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'}"
								@click="clickMarker(business)"
								@mouseover="statusBackup = statusText; statusText = business.name"
								@mouseout="statusText = statusBackup"
							></gmap-marker>

							<gmap-marker
								:position="{lat:selectedBusiness.coordinates.latitude, lng:selectedBusiness.coordinates.longitude}"
								:clickable="true"
								:icon="{url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}"
								@click="clickMarker(selectedBusiness)"
								@mouseover="statusBackup = statusText; statusText = selectedBusiness.name"
								@mouseout="statusText = statusBackup"
							></gmap-marker>

						  <div slot="visible" style="width: 50%; margin: 0 auto;">
							<div style="bottom: 20vh; left: 10hh; font-size:2em; background-color: rgba(255,255,255,0.5); color: black; position: absolute; z-index: 100">
							  {{statusText}}
							</div>
						  </div>
						</gmap-map>
					</div>
				</div>


				<!-- STATS -->
				<footer class="card-footer">
					<p class="card-footer-item">
						<span>
							Business:
						 	<a :href="selectedBusiness.url" target="_blank">{{selectedBusiness.name}}</a>
					 	</span>
				  	</p>

					<p class="card-footer-item">
					  <span>
					  		Address:
					  		<a :href="selectedBusiness.url" target="_blank">{{selectedBusiness.location.display_address[0]}}</a>
					  </span>
				  	</p>

				  	<p class="card-footer-item">
						<span>
							Phone:
						 	<a :href="'tel:' + selectedBusiness.display_phone" target="_blank">{{selectedBusiness.display_phone}}</a>
					 	</span>
				  	</p>

					<p class="card-footer-item">
						<span>
							Reviews:
						 	<a :href="selectedBusiness.url" target="_blank">{{selectedBusiness.review_count}}</a>
					 	</span>
				  	</p>
				</footer>

			</div>
		</div>

		<!-- TILES -->
		<div class="column">
			<div class="tile is-ancestor">
			  <div class="tile is-vertical is-8">
				<div class="tile">

				  <div class="tile is-parent is-vertical">
					<article class="tile is-child notification is-primary">
					  <p class="title">Phone</p>
					  <p class="subtitle">{{selectedBusiness.display_phone}}</p>
					</article>
					<article class="tile is-child notification is-warning">
					  <p class="title">Address</p>
					  <p class="subtitle">{{selectedBusiness.location.display_address[0]}}</p>
					</article>
				  </div>

				  <div class="tile is-parent">
					<article class="tile is-child notification is-info">
					  <p class="title">{{selectedBusiness.name}}</p>
					  <figure class="image is-4by3">
						<img :src="selectedBusiness.image_url">
					  </figure>
					</article>
				  </div>
				</div>
				<div class="tile is-parent">
				  <article class="tile is-child notification is-danger">
					<p class="title">Review Count</p>
					<p class="subtitle">{{selectedBusiness.review_count}}</p>
					<div class="content">

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

					</div>
				  </div>
				</article>
			  </div>
			</div>
		</div>

	</div>

</template>

<script>
import BusinessPanel from './components/BusinessPanel.vue';
import ChoosePanel from './components/ChoosePanel.vue';
export default {
	name: 'app',
	components: {
		BusinessPanel, ChoosePanel
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
			imagesSelected: new Set(),
			numImagesFlippedUp: 0,
			mapOptions:{
				styles: [{"elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#f5f5f2"},{"visibility":"on"}]},{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#ffffff"},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"visibility":"simplified"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#71c8d4"}]},{"featureType":"landscape","stylers":[{"color":"#e5e8e7"}]},{"featureType":"poi.park","stylers":[{"color":"#8ba129"}]},{"featureType":"road","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.sports_complex","elementType":"geometry","stylers":[{"color":"#c7c7c7"},{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#a0d3d3"}]},{"featureType":"poi.park","stylers":[{"color":"#91b65d"}]},{"featureType":"poi.park","stylers":[{"gamma":1.51}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","stylers":[{"visibility":"simplified"}]},{"featureType":"road"},{"featureType":"road"},{},{"featureType":"road.highway"}],
				scrollwheel: false,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,
			},
		};
	},
	computed: {
		fiveCategories: function() {

			let temp_set = new Set();

			while(temp_set.size < 5) {
				for(var business in this.businesses) {
					let temp_category = this.businesses[business].categories[0].title;
					temp_set.add(temp_category);
				}
			}

			return Array.from(temp_set);
		},
		filteredBusinesses: function() {

			let temp_list = []

			return this.businesses.slice(0,5);
		},
		imagesFlippedUp: function() {
			return (this.numImagesFlippedUp > 2);
		}
	},
	mounted() {
		this.search();
	},
	methods: {
		search() {
			this.zoom = 12;
			this.searching = true;
			this.imagesSelected.clear();
			this.numImagesFlippedUp = 0;

			var url = 'http://104.131.185.181/business?';
			url += 'term=' + this.term + '&';
			url += 'location=' + this.location + '&';

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

				var text = xhr.responseText;
				try {
					this.businesses = JSON.parse(text).businesses; /* .slice(0,5) */
					this.center = {lat:this.businesses[0].coordinates.latitude, lng:this.businesses[0].coordinates.longitude};
					this.selectedBusiness = this.businesses[0];
				} catch (err) {
					this.searching = false;
					alert('Error: Yelp is busy. Token limit reached? Please try again later.');
				}
			}.bind(this);
			xhr.onerror = function() {
				this.searching = false;
				alert('Error: Yelp is busy. Token limit reached? Please try again later.');
			}.bind(this);
			xhr.send();
		},
		clickMarker(business) {
			this.center = {lat:business.coordinates.latitude, lng:business.coordinates.longitude};
			this.selectedBusiness = business;
			this.zoom = 14;
			this.zoom = 16;
			/* Select business panel */
		},
		addSelectedImage(index) {
			this.imagesSelected.add(index);
			this.numImagesFlippedUp += 1;
		},
		removeSelectedImage(index) {
			this.imagesSelected.delete(index);
			this.numImagesFlippedUp -= 1;
		},
	}
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