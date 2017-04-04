<template>
<div @click="toggleSelected" >

	<transition name="fade" mode="out-in">

	 	<!-- PICTURE SELECTION -->
		<div key="image" class="card" style="cursor: pointer;" v-if="!imageFlipped">
			<div class="card-image">
			    <figure class="image is-4by3">
			      <img src="https://s3-media2.fl.yelpcdn.com/bphoto/ysH4wU0R13y3N3jG7GYFrw/ls.jpg" alt="Image" :class="{'select-image': selected}">
			    </figure>
	  		</div>
	  		<div class="card-content">
	  			<div class="content">
	  				{{categories[index]}}
	  			</div>
	  		</div>
	  	</div>

		<!-- BUSINESS -->
		<div key="box" class="box"  v-else>
		  	<article class="media">
		    	<div class="media-left">
				    <a :href="businessData.url" target="_blank" >
				      <div class="my-image">
				        <div class="thumbnail" :style="{ backgroundImage: 'url(' + businessData.image_url + ')' }"></div>
				      </div>
				     </a>
		    	</div>

			    <div class="media-content">
			  		<!-- Content -->
			  		<div>
			  			<a :href="businessData.url" target="_blank"><strong>{{businessData.name}}</strong></a>
			  		</div>

			  		<div>
						<yelp-stars :rating="businessData.rating"/></yelp-stars>
					</div>

				    <div class="tag is-warning">
				  		{{businessData.categories[0].title}}
					</div>

					<div>
						<span v-for="x in businessData.price">$</span>
					</div>
				</div>
			</article>
		</div>

	</transition>
	
</div>
</template>

<script>
import YelpStars from './YelpStars.vue';
export default{
	name:'business-panel',
	props: ['businessData','index','imageFlipped','categories'],
	components: {
		YelpStars,
	},
	data: function(){
		return{
			selected: false
		}
	},
	watch: {
		imageFlipped: function() {
			this.selected = false;
		}
	},
	methods: {
		toggleSelected: function(){
			this.selected = !this.selected
			if(this.selected){
				this.$emit('addSelection', this.index)
			} else{
				this.$emit('removeSelection', this.index)
			}
		},
	},
};
</script>

<style>
.select-image{
	-webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
 	filter: grayscale(100%);
}
.box {
	cursor: pointer;
}
.thumbnail {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-position: center center;
    background-size: cover;
}
.my-image {
  float: left;
  margin-right: 9px;
  margin-bottom: 5px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>