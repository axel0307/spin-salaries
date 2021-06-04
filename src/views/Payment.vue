<template>
  <div ref="content">
    <h1 class="my-3 text-dark">Pago de nómina</h1>
    <h5 class="text-start">Emisor</h5>
    <div class="row">
      <div class="col-6 col-md-2">
        <p class="text-start">RFC:</p>
        <p class="text-start">Nombre:</p>
        <p class="text-start">Folio fiscal:</p>
      </div>
      <div class="col-6 col-md-4">
        <p class="text-end">CFS9909291H5</p>
        <!-- RFC -->
        <p class="text-end">Sociedad Anónima (S.A)</p>
        <!-- Nombre -->
        <p class="text-end">e6dbc18f-cf0e-46bc-90b1</p>
        <!-- Folio fiscal -->
      </div>
      <div class="col-6 col-md-3">
        <p class="text-start">Fecha y hora de emisión:</p>
        <p class="text-start">Comprobante:</p>
        <p class="text-start">Folio:</p>
      </div>
      <div class="col-6 col-md-3">
        <p class="text-end">{{ moment().format("YYYY-MM-DD h:mm:ss a") }}</p>
        <!-- Fecha y hora de emisión -->
        <p class="text-end">Nómina</p>
        <!-- Comprobante -->
        <p class="text-end">5477</p>
        <!-- Folio -->
      </div>
    </div>
    <hr class="border border-dark" />
    <h5 class="text-start">Receptor</h5>
    <div class="row">
      <div class="col-6 col-md-2">
        <p class="text-start">Nombre:</p>
        <p class="text-start">RFC:</p>
        <p class="text-start">Área:</p>
      </div>
      <div class="col-6 col-md-4">
        <p class="text-end">
          {{
            employee.nombre +
            " " +
            employee.pApellido +
            " " +
            employee.sApellido
          }}
        </p>
        <!-- Nombre -->
        <p class="text-end">
          {{ employee.rfc }}
        </p>
        <!-- RFC -->
        <p class="text-end">
          <!-- {{ employee.trabajo.area }} -->
        </p>
        <!-- Área -->
      </div>
      <div class="col-6 col-md-3">
        <p class="text-start">NSS:</p>
        <p class="text-start">CURP:</p>
        <p class="text-start">Salario Diario:</p>
      </div>
      <div class="col-6 col-md-3">
        <p class="text-end">
          {{ employee.nss }}
        </p>
        <!-- NSS -->
        <p class="text-end">
          {{ employee.curp }}
        </p>
        <!-- CURP -->
        <p class="text-end">
          <!-- {{ employee.trabajo.salario }} -->
        </p>
        <!-- Salario -->
      </div>
      {{ this.employee.trabajo }}
    </div>
  </div>
  <button type="button" class="btn btn-outline-primary" @click="download">
    Pagar nómina
  </button>
</template>

<script>
import router from "../router/index.js";
import moment from "moment";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";

export default {
  name: "Payment",
  data() {
    return {
      API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
      id: this.$route.params.id,
      employee: {},
      datos: [],
      fechaActual: null,
      heading: "Recibo de pago de nómina",
      moreText: [
        "This is another few sentences of text to look at it.",
        "Just testing the paragraphs to see how they format.",
        "jsPDF likes arrays for sentences.",
        "Do paragraphs wrap properly?",
        "Yes, they do!",
        "What does it look like?",
        "Not bad at all.",
      ],
    };
  },
  mounted() {
    this.getEmployee();
  },
  methods: {
    async getEmployee() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/empleados/${this.id}.json?auth=${user.idToken}`
      );
      const data = await res.json();

      for (let i in data) {
        this.datos.push({
          id: i,
          data: data[i],
          trabajo: data[i].trabajo,
        });
        console.log(data[i].area);
        console.log(data[i].salario);
      }
      // console.log(this.datos);

      this.employee = data;

      console.log(this.employee);
    },
    moment: function () {
      return moment();
    },
    download() {
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;

      const doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "tabloid",
        // orientation: "portrait",
        // unit: "in",
        // format: "letter",
        putOnlyUsedFonts: true,
        floatPrecision: 16, // or "smart", default is 16
        encryption: {
          userPassword: `${this.employee.rfc}`,
        },
      });

      const canvasElement = document.createElement("canvas");
      canvasElement.width = windowWidth;
      canvasElement.height = windowHeight;
      /*
      doc.setFontSize(16).text(this.heading, 0.5, 1.0);
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      doc
        .setFont("helvetica")
        .setFontSize(12)
        .text(this.moreText, 0.5, 3.5, { align: "left", maxWidth: "7.5" });
      */

      html2canvas(this.$refs.content, {
        canvas: canvasElement,
        width: windowWidth,
        height: windowHeight,
      })
        .then((canvas) => {
          const img = canvas.toDataURL("image/jpeg", 1);
          // document.body.appendChild(canvas);
          doc.addImage(img, "JPEG", 10, 10);

          this.fechaActual = moment().format("YYYY-MM-DD");
          doc.save(`Nomina ${this.fechaActual}`);

          alert(
            `Se descargara un comprobante de pago de nómina del empleado con clave ${this.employee.clave}`
          );
        })
        .catch((err) => {
          alert("Algo salio mal");
        });
      /*
      doc.html(this.$refs.content.innerHTML, {
        callback: function (doc) {
          this.fechaActual = moment().format("YYYY-MM-DD");
          doc.save(`Nomina ${this.fechaActual}`);
        },
        x: 0.5,
        y: 3.5,
      });
      */
      router.push("/dashboard/welcome");
    },

    preubaDownload() {
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;

      let pdf = new jsPDF();

      let canvasElement = document.createElement("canvas");
      canvasElement.width = windowWidth;
      canvasElement.height = windowHeight;

      html2canvas(this.$refs.pdf, {
        canvas: canvasElement,
        width: windowWidth,
        height: windowHeight,
      })
        .then((canvas) => {
          const img = canvas.toDataURL("image/jpeg", 1);
          // document.body.appendChild(canvas);
          pdf.addImage(img, "JPEG", 10, 10);
          pdf.save("sample.pdf");

          alert("works");
        })
        .catch((err) => {
          alert("error");
        });
    },
  },
};
</script>

<style>
</style>