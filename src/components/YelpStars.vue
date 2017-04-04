<template>
	<img :src="starImgSrc">
</template>

<script>
export default{
	name: 'yelp-stars',
	props: ['rating'],
	computed: {
		starImgSrc: function(){
			let a = (''+this.rating).charAt(0), b=''
			if ((''+this.rating).length>1) b='_half'
				return 'static/img/small/small_'+a+b+'.png'
		}
	}
}
</script>