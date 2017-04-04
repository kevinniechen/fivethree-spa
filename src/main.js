import Vue from 'vue';
import App from './App.vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB5Ihd9KH1_jBSegEoJU6H4IsVaG8dww1A',
	v: '3.27',
    libraries: 'places',   // If you want to use places input 
  }
});

Vue.filter('json', x => JSON.stringify(x));

new Vue({
	el: '#app',
	render: h => h(App)
});
