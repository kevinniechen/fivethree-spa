<template>
	<transition name="fade" mode="out-in">

		<!-- BUSINESS -->
		<div key="box" class="box">
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
</template>

<script>
import YelpStars from './YelpStars.vue';
export default{
	name:'business-panel',
	props: ['businessData','index','imageFlipped','categories'],
	components: {
		YelpStars,
	},
};
</script>

<style>
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