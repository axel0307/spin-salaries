<template>
  <div ref="content" id="contenedor">
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
        <p class="text-start">Clase:</p>
        <p class="text-start">Puesto:</p>
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
          {{ job.area }}
        </p>
        <!-- Área -->
        <p class="text-end">
          {{ employee.clase }}
        </p>
        <!-- Clase -->
        <p class="text-end">
          {{ job.nombre }}
        </p>
      </div>
      <div class="col-6 col-md-3">
        <p class="text-start">NSS:</p>
        <p class="text-start">CURP:</p>
        <p class="text-start">Periodicidad de pago:</p>
        <p class="text-start">Salario diario:</p>
        <p class="text-start">Salario diario integral:</p>
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
        <p class="text-end">Quincenal</p>
        <p class="text-end">
          {{ job.salario }}
        </p>
        <!-- Salario -->
        <p class="text-end">
          {{ (job.salario * this.factorIntegracion).toFixed(2) }}
        </p>
      </div>
    </div>
    <hr class="border border-dark" />
    <h5 class="text-start text-dark">Datos Generales</h5>
    <div class="row">
      <div class="col-6 col-md-3">
        <p class="text-start">Tipo de nómina:</p>
        <p class="text-start">Fecha pago:</p>
        <p class="text-start">Fecha inicial de quincena:</p>
      </div>
      <div class="col-6 col-md-3">
        <p class="text-end">Nómina ordinario</p>
        <!-- Tipo de nómina -->
        <p class="text-end">{{ pago }}</p>
        <!-- Fecha pago -->
        <p class="text-end">{{ inicio }}</p>
        <!-- Fecha inicial de pago -->
      </div>
      <div class="col-6 col-md-3">
        <p class="text-start">Moneda:</p>
        <p class="text-start">No. de días pagados:</p>
        <p class="text-start">Fecha final de quicena:</p>
      </div>
      <div class="col-6 col-md-3">
        <p class="text-end">Peso Mexicano</p>
        <!-- Moneda -->
        <p class="text-end">15.000</p>
        <!-- No. de días pagados -->
        <p class="text-end">
          {{ quincena }}
        </p>
        <!-- Fecha final de pago -->
      </div>
    </div>
    <hr class="border border-dark" />
    <h5 class="text-start text-dark">Concepto</h5>
    <div class="row">
      <div class="mx-auto">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Clave unidad</th>
                <th scope="col">Descuento</th>
                <th scope="col">Valor unitario</th>
                <th scope="col">Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ job.clave }}</td>
                <td>1</td>
                <td>ACT</td>
                <td>Pago de nómina</td>
                <td>{{ job.salario * 15 }}</td>
                <td>{{ job.salario }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <hr class="border border-dark" />
    <h5 class="text-start text-dark">Percepciones</h5>
    <div class="row">
      <div class="mx-auto">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">Concepto</th>
                <th scope="col">Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(percepcion, i) in percepciones" :key="i">
                <td>{{ percepcion.clave }}</td>
                <td>{{ percepcion.nombre }}</td>
                <td>{{ percepcion.importe }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <h6 class="text-start text-dark">Total percepciones</h6>
    <div class="row">
      <div class="mx-auto col-md-3 float-md-start ms-md-0">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1231231</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <hr class="border border-dark" />
    <h5 class="text-start text-dark">Deducciones</h5>
    <div class="row">
      <div class="mx-auto">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">Concepto</th>
                <th scope="col">Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(deduccion, i) in deducciones" :key="i">
                <td>{{ deduccion.clave }}</td>
                <td>{{ deduccion.nombre }}</td>
                <td>{{ deduccion.importe }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <h6 class="text-start text-dark">Total deducciones</h6>
    <div class="row">
      <div class="mx-auto col-md-3 float-md-start ms-md-0">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12311</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <hr class="border border-dark" />
    <h5 class="text-start text-dark">Totales Nómina</h5>
    <div class="row">
      <div class="mx-auto col-md-6 float-md-start ms-md-0">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Total concepto</th>
                <th scope="col">Total percepciones</th>
                <th scope="col">Total deducciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1231231</td>
                <td>1231231</td>
                <td>1231231</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <hr class="border border-dark" />
    <div class="row">
      <div class="mx-auto col-md-4 float-md-end me-md-0">
        <span class="fw-bold text-dark">IMPORTE NETO</span> $ 30002.25
      </div>
    </div>
  </div>
  <button
    type="button"
    class="mt-2 mb-3 btn btn-outline-primary"
    @click="download"
  >
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
      factorIntegracion: 1.0452,
      employee: {},
      job: {},
      perceptions: [],
      percepciones: [],
      deductions: [],
      deducciones: [],
      fechaActual: null,
      // VARIABLES PARA CALCULOS
      //Variables para la realización de percepciones.
      SMG: 141.7,
      UMA: 89.62,
    };
  },
  mounted() {
    this.getEmployee();
    this.getJob();
    this.getPerceptions();
    this.getDeductions();
  },
  computed: {
    quincena() {
      return moment().subtract(15, "days").add(15, "days").format("YYYY-MM-DD");
    },
    pago() {
      return moment().add(2, "days").format("YYYY-MM-DD");
    },
    inicio() {
      return moment().subtract(15, "days").format("YYYY-MM-DD");
    },
  },
  methods: {
    async getEmployee() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/empleados/${this.id}.json?auth=${user.idToken}`
      );
      const dataEmployee = await res.json();

      // for (let i in data) {
      //   this.datos.push({
      //     id: i,
      //     data: data[i],
      //     trabajo: data[i].trabajo,
      //   });
      //   console.log(data[i].area);
      //   console.log(data[i].salario);
      // }
      // console.log(this.datos);

      this.employee = dataEmployee;

      console.log(this.employee);
    },
    async getJob() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/empleados/${this.id}/trabajo.json?auth=${user.idToken}`
      );
      const dataJob = await res.json();
      this.job = dataJob;

      console.log(this.job);
    },
    moment: function () {
      return moment();
    },
    async getPerceptions() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/empleados/${this.id}/percepciones.json?auth=${user.idToken}`
      );
      const data = await res.json();

      for (let i in data) {
        this.perceptions.push({
          id: i,
          data: data[i],
        });
        this.percepciones = data;
      }
    },
    async getDeductions() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/empleados/${this.id}/deducciones.json?auth=${user.idToken}`
      );
      const data = await res.json();

      for (let i in data) {
        this.deductions.push({
          id: i,
          data: data[i],
        });
        this.deducciones = data;
      }
    },
    download() {
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;

      const doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "a4",
        // orientation: "portrait",
        // unit: "in",
        // format: "letter",
        putOnlyUsedFonts: true,
        floatPrecision: 16, // or "smart", default is 16
        encryption: {
          userPassword: `${this.employee.rfc}`,
        },
      });
      var widthPage = doc.internal.pageSize.getWidth();
      var heightPage = doc.internal.pageSize.getHeight();

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
        // canvas: canvasElement,
        // width: windowWidth,
        // height: windowHeight,
        useCORS: true,
        width: window.screen.availWidth,
        height: window.screen.availHeight,
        windowWidth: this.$refs.content.scrollWidth,
        windowHeight: this.$refs.content.scrollHeight,
        x: window.pageXOffset,
        // x: 0,
        y: window.pageYOffset,
      })
        .then((canvas) => {
          const img = canvas.toDataURL("image/jpeg", 1);
          // document.body.appendChild(canvas);
          // doc.addImage(img, "JPEG", 20, -50, widthPage + 100, heightPage - 500);
          doc.addImage(img, "JPEG", 20, -50, widthPage + 135, heightPage - 200);
          // doc.addImage(img, "JPEG", 0, 0, widthPage, heightPage);

          this.fechaActual = moment().format("YYYY-MM-DD");
          doc.save(`NDESA-${this.employee.rfc}-${this.fechaActual}`);

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
    descargarPDF() {
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;

      const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
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

      html2canvas(this.$refs.content, {
        canvas: canvasElement,
        width: windowWidth,
        height: windowHeight,
      })
        .then((canvas) => {
          const img = canvas.toDataURL("image/jpeg", 1);
          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();
          const imgProps = doc.getImageProperties(img);
          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          doc.addImage(img, "JPEG", 0, 0, pdfWidth, pdfHeight);
          // document.body.appendChild(canvas);

          this.fechaActual = moment().format("YYYY-MM-DD");
          doc.save(`Nomina ${this.fechaActual}`);

          alert(
            `Se descargara un comprobante de pago de nómina del empleado con clave ${this.employee.clave}`
          );
        })
        .catch((err) => {
          alert("Algo salio mal");
        });
    },
    otraDescarga() {
      const { $, jQuery } = require("jquery");
      global.$ = $;
      global.jQuery = jQuery;
      // var contenedor = document.getElementById("contenedor");
      // var contenedorWidth = contenedor.width();
      // var contenedorHeight = contenedor.height();

      var contenedorHeight = $("#contenedor").height();
      var contenedorWidth = $("#contenedor").width();

      // var divHeight = $('#div_id').height();
      // var divWidth = $('#div_id').width();
      var ratio = contenedorHeight / contenedorWidth;
      html2canvas(document.getElementById("contenedor"), {
        height: contenedorHeight,
        width: contenedorWidth,
        onrendered: function (canvas) {
          var image = canvas.toDataURL("image/jpeg");
          var doc = new jsPDF(); // using defaults: orientation=portrait, unit=mm, size=A4
          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();
          height = ratio * width;
          doc.addImage(image, "JPEG", 0, 0, width - 20, height - 10);
          doc.save("myPage.pdf"); //Download the rendered PDF.
        },
      });
    },

    pdfDimensiones() {
      html2canvas(document.getElementById("contenedor")).then((canvas) => {
        const contenedor = document.getElementById("contenedor");
        const componentWidth = contenedor.offsetWidth;
        const componentHeight = contenedor.offsetHeight;

        const orientation = componentWidth >= componentHeight ? "l" : "p";

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation,
          unit: "px",
        });

        pdf.internal.pageSize.width = componentWidth;
        pdf.internal.pageSize.height = componentHeight;

        pdf.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
        pdf.save("download.pdf");
      });
    },

    exportpdf() {
      html2canvas(document.getElementById("contenedor")).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height / imgProps.width) * (pdfWidth * 2);
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
      });
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