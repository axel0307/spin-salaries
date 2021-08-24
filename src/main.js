import { createApp } from 'vue';
import './registerServiceWorker';
import App from './App.vue';
import router from './router';
import moment from 'moment';
import { jsPDF } from 'jspdf';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import store from './store/index';

import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Card from 'primevue/card';

// import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import '@vuelidate/core';
import '@vuelidate/validators';

// Importamos Popper para Bootstrap

// Importamos Bootstrap de los paquetes npm
// import "bootstrap/dist/css/bootstrap.css"
// import "../src/assets/css/main.css"
// import "bootstrap/dist/js/bootstrap.js"
// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap";
// import "@popperjs/core";

// Importamos los iconos de Bootstrap
// import "bootstrap-icons/font/bootstrap-icons.css";

// Importamos nuevas fuentes
import '../src/assets/fonts/fonts.css';

// Para animaciones
const myMixin = {
  created: function() {
    this.gsap = gsap;
  }
};
const app = createApp(App);
app
  .mixin(myMixin)
  .use(store)
  .use(PrimeVue)
  .use(ToastService)
  .use(router)
  .use(moment)
  .use(html2canvas)
  .use(jsPDF)
  .mount('#app');
app
  .component('InputText', InputText)
  .component('Button', Button)
  .component('Calendar', Calendar)
  .component('Checkbox', Checkbox)
  .component('Password', Password)
  .component('Toast', Toast)
  .component('Card', Card);
