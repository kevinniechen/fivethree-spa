<template>
<div @click="toggleSelected" >

	<transition name="fade" mode="out-in">

	 	<!-- PICTURE SELECTION -->
		<div key="image" class="card is-primary" style="cursor: pointer;" v-if="!imageFlipped">
			<!-- <div class="card-image">
			    <figure class="image is-4by3">
			      <img src="https://s3-media2.fl.yelpcdn.com/bphoto/ysH4wU0R13y3N3jG7GYFrw/ls.jpg" alt="Image" :class="{'select-image': selected}">
			    </figure>
	  		</div> -->
	  		<div class="card-content" :class="{'select-card': selected}">
	  			<div class="content">
	  				{{ category }}
	  			</div>
	  		</div>
	  	</div>

	</transition>
	
</div>
</template>

<script>
export default{
	name:'choose-panel',
	props: ['index', 'category', 'imageFlipped'],
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