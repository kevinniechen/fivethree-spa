<template>

	<div class="box" @click="toggleSelected">
	  	<article class="media ">
	    	<div class="media-left">
			    <a :href="businessData.url" target="_blank" v-if="selected">
			      <div class="image">
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

</template>

<script>
import YelpStars from './YelpStars.vue';

export default{
	name:'business-panel',
	props: ['businessData','index'],
	components: {
		YelpStars,
	},
	data: function(){
		return{
			selected: false
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
		}
	}
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

.image {
  float: left;
  margin-right: 9px;
  margin-bottom: 5px;
}
</style>
