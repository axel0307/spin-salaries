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
        <p class="text-end">
          {{
            generadorFolioFiscalUno +
            "-" +
            generadorFolioFiscalDos +
            "-" +
            generadorFolioFiscalTres +
            "-" +
            generadorFolioFiscalCuatro
          }}
        </p>
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
        <p class="text-end">{{ generadorFolio }}</p>
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
        <p class="text-end" v-if="quincenal === employee.tipoNomina">
          Quincenal
        </p>
        <p class="text-end" v-else>Semanal</p>
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
        <p class="text-start">Fecha inicial de pago:</p>
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
        <p class="text-start">Fecha final de pago:</p>
      </div>
      <div class="col-6 col-md-3">
        <p class="text-end">Peso Mexicano</p>
        <!-- Moneda -->
        <p class="text-end">{{ employee.tipoNomina }}</p>
        <!-- No. de días pagados -->
        <p class="text-end">
          {{ nominaDias }}
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
                <td>{{ job.salario }}</td>
                <td>{{ job.salario * employee.tipoNomina }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- A partir de aquí se van a agregar todas las percepciones así como también los if -->
    <hr class="border border-dark" />
    <h5 class="text-start text-dark">Otras percepciones</h5>
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
              <!-- <tr v-for="(percepcion, i) in percepciones" :key="i">
                <td>{{ percepcion.importe }}</td>
              </tr> -->
              <tr>
                <td>{{ totalPercepciones }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <hr class="border border-dark" />
    <h5 class="text-start text-dark">Otras deducciones</h5>
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
                <td>{{ totalDeducciones }}</td>
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
        <span class="fw-bold text-dark">IMPORTE NETO</span> $ 0
      </div>
    </div>
    <div class="row">
      <div class="mx-auto col-md-4">
        <span class="fw-bold text-danger">Percepción aguinaldo</span>
        {{ percepcionAguinaldo }}
      </div>
    </div>
    <div class="row">
      <div class="mx-auto col-md-4">
        <span class="fw-bold text-danger">Percepción vacaciones</span>
        {{ percepcionVacaciones }}
      </div>
    </div>
    <div class="row">
      <div class="mx-auto col-md-4">
        <span class="fw-bold text-danger">Fondo de Ahorro</span>
        {{ fondoAhorro }}
      </div>
    </div>
    <div class="row">
      <div class="mx-auto col-md-4">
        <span class="fw-bold text-danger">Infonavit</span>
        {{ infonavit }}
      </div>
    </div>
    <div class="row">
      <span class="fw-bold text-danger">IMSS</span>
      <div class="mx-auto col-md-12">
        <span class="fw-bold text-dark">Enfermedad:</span>
        {{ imssEnfermedad }}
        <span class="fw-bold text-dark">Prestación:</span>
        {{ imssPrestacion }}
        <span class="fw-bold text-dark">Gastos médicos:</span>
        {{ imssMedicos }}
        <span class="fw-bold text-dark">Invalidez:</span>
        {{ imssInvalidez }}
        <span class="fw-bold text-dark">Vejez:</span>
        {{ imssVejez }}
        <span class="fw-bold text-dark">Retención:</span>
        {{ imssRetencion }}
      </div>
    </div>
    <div class="row">
      <div class="mx-auto col-md-4">
        <span class="fw-bold text-danger">Horas extra</span>
        {{ percepcionHorasExtra }}
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
      employee: {},
      job: {},
      perceptions: [],
      percepciones: [],
      deductions: [],
      deducciones: [],
      fechaActual: null,
      quincenal: "15",
      caracteres:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      // VARIABLES PARA CALCULOS
      factorIntegracion: 1.0452,
      SMG: 141.7,
      UMA: 89.62,
      // Variables para la realización de percepciones
      // Vacaciones
      diasVacaciones: 6,
      porcentajeVacaciones: 0.25,
      // Aguinaldo
      diasAguinaldo: 15,
      // Fondo de Ahorro
      porcentajeAhorro: 0.07,
      // Variables para la realización de deducciones
      // Infonavit
      UMI: 87.21,
      porcentajeDescuento: 0.21,
      // IMSS
      porcentajeEnfermedad: 0.004,
      porcentajePrestacion: 0.0025,
      porcentajeMedicos: 0.00375,
      porcentajeInvalidez: 0.00625,
      porcentajeVejez: 0.01125,
    };
  },
  mounted() {
    this.getEmployee();
    this.getJob();
    this.getPerceptions();
    this.getDeductions();
  },
  computed: {
    generadorFolio() {
      return Math.round(Math.random() * (1000000 - 100) + 1);
    },
    generadorFolioFiscalUno() {
      let folio = "";
      const longitudFolio = this.caracteres.length;
      for (let i = 0; i < 4; i++) {
        folio += this.caracteres.charAt(
          Math.floor(Math.random() * longitudFolio)
        );
      }
      return folio;
    },
    generadorFolioFiscalDos() {
      let folio = "";
      const longitudFolio = this.caracteres.length;
      for (let i = 0; i < 4; i++) {
        folio += this.caracteres.charAt(
          Math.floor(Math.random() * longitudFolio)
        );
      }
      return folio;
    },
    generadorFolioFiscalTres() {
      let folio = "";
      const longitudFolio = this.caracteres.length;
      for (let i = 0; i < 4; i++) {
        folio += this.caracteres.charAt(
          Math.floor(Math.random() * longitudFolio)
        );
      }
      return folio;
    },
    generadorFolioFiscalCuatro() {
      let folio = "";
      const longitudFolio = this.caracteres.length;
      for (let i = 0; i < 4; i++) {
        folio += this.caracteres.charAt(
          Math.floor(Math.random() * longitudFolio)
        );
      }
      return folio;
    },
    nominaDias() {
      const dias = this.employee.tipoNomina;
      return moment()
        .subtract(dias, "days")
        .add(dias, "days")
        .format("YYYY-MM-DD");
    },
    pago() {
      return moment().add(2, "days").format("YYYY-MM-DD");
    },
    inicio() {
      const dias = this.employee.tipoNomina;
      return moment().subtract(dias, "days").format("YYYY-MM-DD");
    },
    totalPercepciones() {
      let arreglo = [];
      let objetoPercepcion = this.percepciones;
      for (let item of objetoPercepcion) {
        arreglo.push(item.importe);
      }

      let totalPercepciones = 0;
      for (let i in arreglo) {
        totalPercepciones += arreglo[i];
      }

      return totalPercepciones;
    },
    totalDeducciones() {
      let arreglo = [];
      let objetoPercepcion = this.deducciones;
      for (let item of objetoPercepcion) {
        arreglo.push(item.importe);
      }

      let totalDeducciones = 0;
      for (let i in arreglo) {
        totalDeducciones += arreglo[i];
      }

      return totalDeducciones;
    },
    percepcionHorasExtra() {
      const horaLaboral = this.job.salario / 8;
      const horasExtra = this.employee.horasExtra;
      let horasPagadas;
      const UMATiempoExtra = this.UMA * 5;

      if (horasExtra > 9) {
        horasPagadas = horaLaboral * 9 * 2;
      } else {
        horasPagadas = horaLaboral * horasExtra * 2;
      }

      let exentoHorasExtra;
      let gravadoHorasExtra;
      if (horasPagadas * 0.5 > UMATiempoExtra) {
        exentoHorasExtra = UMATiempoExtra;
        gravadoHorasExtra = horasPagadas - exentoHorasExtra;
      } else {
        exentoHorasExtra = horasPagadas * 0.5;
        gravadoHorasExtra = horasPagadas - exentoHorasExtra;
      }

      let horasTriples;
      let segundoGravadoHE;
      let excedenteHoras;
      excedenteHoras = horasExtra - 9;
      if (excedenteHoras > 0) {
        horasTriples = horaLaboral * excedenteHoras * 3;
        segundoGravadoHE = horasPagadas + horasTriples + exentoHorasExtra;
      } else {
        segundoGravadoHE = horasPagadas + exentoHorasExtra;
      }
      let tercerGravadoHE = horasTriples;

      return {
        exentoHorasExtra: exentoHorasExtra,
        gravadoHorasExtra: gravadoHorasExtra,
        segundoGravadoHE: segundoGravadoHE,
        tercerGravadoHE: tercerGravadoHE,
      };
    },
    percepcionVacaciones() {
      const exento = this.UMA * 15;
      const importeVac = this.job.salario * this.diasVacaciones;
      const primaVac = importeVac * this.porcentajeVacaciones;

      let exentoVacaciones;
      let gravadoVacaciones;
      if (primaVac > exento) {
        exentoVacaciones = exento.toFixed(2);
      } else {
        exentoVacaciones = primaVac.toFixed(2);
      }
      gravadoVacaciones = (primaVac - exentoVacaciones).toFixed(2);

      return {
        exentoVacaciones: exentoVacaciones,
        gravadoVacaciones: gravadoVacaciones,
      };
    },
    percepcionAguinaldo() {
      const exento = this.UMA * 30;
      const importeAgui = this.job.salario * this.diasAguinaldo;

      let exentoAguinaldo;
      let gravadoAguinaldo;
      if (importeAgui > exento) {
        exentoAguinaldo = exento.toFixed(2);
      } else {
        exentoAguinaldo = importeAgui.toFixed(2);
      }
      gravadoAguinaldo = importeAgui - exentoAguinaldo;

      return {
        exentoAguinaldo: exentoAguinaldo,
        gravadoAguinaldo: gravadoAguinaldo,
      };
    },
    fondoAhorro() {
      const ahorro =
        this.job.salario * this.porcentajeAhorro * this.employee.tipoNomina;
      return ahorro.toFixed(2);
    },
    exentosPeriodo() {
      // let exentoTotal = this.totalPercepciones +
    },
    infonavit() {
      const diasCotizados = 61;
      const salarioIntegrado = this.factorIntegracion * this.job.salario;
      const descuentoDiario = salarioIntegrado * this.porcentajeDescuento;
      const subTotal = diasCotizados * descuentoDiario;
      const seguroVivienda =
        (this.employee.tipoNomina / diasCotizados) * diasCotizados;
      const descuentoInfonavit = subTotal + seguroVivienda;
      if (this.employee.tipoNomina == 15) {
        return (descuentoInfonavit / 4).toFixed(2);
      } else {
        return (descuentoInfonavit / 9).toFixed(2);
      }
    },
    imssEnfermedad() {
      const salarioIntegrado = this.factorIntegracion * this.job.salario;
      const UMAImss = this.UMA * 3;
      if (UMAImss > salarioIntegrado) {
        return 0;
      } else {
        return (
          (salarioIntegrado - UMAImss) *
          this.porcentajeEnfermedad *
          this.employee.tipoNomina
        ).toFixed(2);
      }
    },
    imssPrestacion() {
      const salarioIntegrado = this.factorIntegracion * this.job.salario;
      const SMI = salarioIntegrado * this.employee.tipoNomina;
      const prestacionDinero = SMI * this.porcentajePrestacion;
      return prestacionDinero.toFixed(2);
    },
    imssMedicos() {
      const salarioIntegrado = this.factorIntegracion * this.job.salario;
      const SMI = salarioIntegrado * this.employee.tipoNomina;
      const gastosMedicos = SMI * this.porcentajeMedicos;
      return gastosMedicos.toFixed(2);
    },
    imssInvalidez() {
      const salarioIntegrado = this.factorIntegracion * this.job.salario;
      const SMI = salarioIntegrado * this.employee.tipoNomina;
      const invalidezVida = SMI * this.porcentajeInvalidez;
      return invalidezVida.toFixed(2);
    },
    imssVejez() {
      const salarioIntegrado = this.factorIntegracion * this.job.salario;
      const SMI = salarioIntegrado * this.employee.tipoNomina;
      const cesantiaVejez = SMI * this.porcentajeVejez;
      return cesantiaVejez.toFixed(2);
    },
    imssRetencion() {
      let totalImss = 0;
      totalImss =
        parseFloat(this.imssEnfermedad) +
        parseFloat(this.imssPrestacion) +
        parseFloat(this.imssMedicos) +
        parseFloat(this.imssInvalidez) +
        parseFloat(this.imssVejez);
      return totalImss.toFixed(2);
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