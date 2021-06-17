import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import moment from 'moment'
import { jsPDF } from "jspdf";
import gsap from "gsap";
import html2canvas from "html2canvas"

// Importamos jQuery
import "../node_modules/jquery/dist/jquery.js"

// Importamos Popper para Bootstrap
import "@popperjs/core"

// Importamos Bootstrap de los paquetes npm
//import "bootstrap/dist/css/bootstrap.css"
import "../src/assets/css/main.css"
import "bootstrap/dist/js/bootstrap.js"

// Importamos los iconos de Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css"

// Importamos nuevas fuentes
import "../src/assets/fonts/fonts.css"
const myMixin = {
    created: function () {
        this.gsap = gsap;
      }
}
createApp(App).mixin(myMixin).use(router).use(moment).use(html2canvas).use(jsPDF).mount('#app')