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
          {{ salarioEmpleado }}
        </p>
        <!-- Salario -->
        <p class="text-end">
          {{ salarioDiarioIntegral }}
        </p>
        <!-- Salario Diario Integral -->
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
                <th scope="col">Importe gravado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ job.clave }}</td>
                <td>1</td>
                <td>ACT</td>
                <td>Pago de nómina</td>
                <td>{{ salarioEmpleado }}</td>
                <td>{{ salarioTotalEmpleado }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <h4 class="text-start text-dark">Percepciones</h4>
    <hr class="border border-dark" />
    <div class="row">
      <h5 class="text-start text-dark">Fondo de Ahorro</h5>
      <div class="mx-auto">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">Porcentaje</th>
                <th scope="col">Importe</th>
                <th scope="col">Importe exento</th>
                <th scope="col">Importe gravado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CPEFAH</td>
                <td>7%</td>
                <td>{{ percepcionFondoAhorro }}</td>
                <td>{{ percepcionFondoAhorro }}</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row" v-if="employee.tiempoExtra">
      <h5 class="text-start text-dark">Horas extra</h5>
      <div class="mx-auto">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">Horas Extra</th>
                <th scope="col">Salario por Hora</th>
                <th scope="col">Importe</th>
                <th scope="col">Importe exento</th>
                <th scope="col">Importe gravado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CPEHEX</td>
                <td>{{ employee.horasExtra }}</td>
                <td>{{ salarioPorHora }}</td>
                <td>{{ percepcionHorasExtra().importeTotalHE }}</td>
                <td>{{ percepcionHorasExtra().exentoHorasExtra }}</td>
                <td>{{ percepcionHorasExtra().gravadoTotalHE }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row" v-if="employee.primaVacacional">
      <h5 class="text-start text-dark">Prima Vacacional</h5>
      <div class="mx-auto">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">Años de antigüedad</th>
                <th scope="col">Importe</th>
                <th scope="col">Importe exento</th>
                <th scope="col">Importe gravado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CPEPVA</td>
                <td>1</td>
                <td>{{ percepcionVacaciones().importeVacaciones }}</td>
                <td>{{ percepcionVacaciones().exentoVacaciones }}</td>
                <td>{{ percepcionVacaciones().gravadoVacaciones }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row" v-if="employee.aguinaldo">
      <h5 class="text-start text-dark">Aguinaldo</h5>
      <div class="mx-auto">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Importe</th>
                <th scope="col">Importe exento</th>
                <th scope="col">Importe gravado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CPEAGU</td>
                <td>15</td>
                <td>{{ percepcionAguinaldo().importeAguinaldo }}</td>
                <td>{{ percepcionAguinaldo().exentoAguinaldo }}</td>
                <td>{{ percepcionAguinaldo().gravadoAguinaldo }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
              <tr>
                <td>{{ totalPercepciones }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <h4 class="text-start text-dark">Deducciones</h4>
    <hr class="border border-dark" />
    <div class="row">
      <h5 class="text-start text-dark">ISR</h5>
      <div class="mx-auto">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">Base gravable</th>
                <th scope="col">Límite inferior</th>
                <th scope="col">Porcentaje ISR</th>
                <th scope="col">Cuota fija</th>
                <th scope="col">ISR retenido</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CDEISR</td>
                <td>{{ gravadoPeriodo }}</td>
                <td>{{ isrPeriodo.limiteInferior }}</td>
                <td>{{ (isrPeriodo.porcentajeISR * 100).toFixed(2) }}%</td>
                <td>{{ isrPeriodo.cuotaFija }}</td>
                <td>{{ isrPeriodo.isrCalculado }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <h5 class="text-start text-dark">IMSS</h5>
      <div class="mx-auto">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">SMI</th>
                <th scope="col">Enfermedades y maternidad</th>
                <th scope="col">Prestación dinero</th>
                <th scope="col">Gastos médicos</th>
                <th scope="col">Invalidez y vida</th>
                <th scope="col">Cesantía y vejez</th>
                <th scope="col">Retención IMSS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CDEIMS</td>
                <td>{{ imssSMI }}</td>
                <td>{{ imssEnfermedad }}</td>
                <td>{{ imssPrestacion }}</td>
                <td>{{ imssMedicos }}</td>
                <td>{{ imssInvalidez }}</td>
                <td>{{ imssVejez }}</td>
                <td>{{ imssRetencion }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row" v-if="employee.infonavit">
      <h5 class="text-start text-dark">Infonavit</h5>
      <div class="mx-auto">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Clave</th>
                <th scope="col">Salario diario integrado</th>
                <th scope="col">Días de nómina</th>
                <th scope="col">Porcentaje de descuento</th>
                <th scope="col">Descuento diario</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Descuento infonavit</th>
                <th scope="col" v-if="quincenal === employee.tipoNomina">
                  Descuento infonavit quincenal
                </th>
                <th scope="col" v-else>Descuento infonavit semanal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CDEINF</td>
                <td>{{ salarioDiarioIntegral }}</td>
                <td>{{ employee.tipoNomina }}</td>
                <td>21%</td>
                <td>{{ infonavit().descuentoDiario }}</td>
                <td>{{ infonavit().subTotal }}</td>
                <td>{{ infonavit().descuentoInfonavit }}</td>
                <td>{{ infonavit().descuentoInfonavitNomina }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
                <td>{{ salarioTotalEmpleado }}</td>
                <td>{{ totalPercepciones }}</td>
                <td>{{ totalDeducciones }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <hr class="border border-dark" />
    <div class="row">
      <div class="mx-auto col-md-4 float-md-end me-md-0">
        <span class="fw-bold text-dark">IMPORTE NETO</span> $
        {{ totalNetoNomina }}
      </div>
    </div>
  </div>
  <button
    type="button"
    class="mt-2 mb-3 btn btn-outline-danger"
    @click="descargarPDF"
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
    salarioEmpleado() {
      return Number(this.job.salario).toFixed(2);
    },
    salarioTotalEmpleado() {
      return (
        Number(this.job.salario) * Number(this.employee.tipoNomina)
      ).toFixed(2);
    },
    salarioPorHora() {
      return (this.job.salario / 8).toFixed(2);
    },
    salarioDiarioIntegral() {
      return (this.job.salario * this.factorIntegracion).toFixed(2);
    },
    percepcionFondoAhorro() {
      const ahorro =
        this.job.salario * this.porcentajeAhorro * this.employee.tipoNomina;
      return ahorro.toFixed(2);
    },
    gravadoPeriodo() {
      let gravadoTotal;
      let salarioEmpleado = parseFloat(this.salarioTotalEmpleado);
      let horasExtras;
      let aguinaldoExtra;
      let vacacionesExtra;
      // Se valida primero si hay horas extras
      if (this.employee.tiempoExtra == true) {
        horasExtras = parseFloat(this.percepcionHorasExtra().gravadoTotalHE);
      } else {
        horasExtras = 0;
      }

      // Se valida después si hay prima vacacional
      if (this.employee.primaVacacional == true) {
        vacacionesExtra = parseFloat(
          this.percepcionVacaciones().gravadoVacaciones
        );
      } else {
        vacacionesExtra = 0;
      }

      // Por último se valida el aguinaldo
      if (this.employee.aguinaldo == true) {
        aguinaldoExtra = parseFloat(
          this.percepcionAguinaldo().gravadoAguinaldo
        );
      } else {
        aguinaldoExtra = 0;
      }

      return (gravadoTotal = (
        salarioEmpleado +
        horasExtras +
        aguinaldoExtra +
        vacacionesExtra
      ).toFixed(2));
    },
    isrPeriodo() {
      const gravado = this.gravadoPeriodo;
      let cuotaFija, porcentajeISR, limiteInferior;
      if (gravado >= 0.01 && gravado <= 318) {
        cuotaFija = 0;
        porcentajeISR = 0.0192;
        limiteInferior = 0.01;
      } else if (gravado >= 318.01 && gravado <= 2699.4) {
        cuotaFija = 6.15;
        porcentajeISR = 0.064;
        limiteInferior = 318.01;
      } else if (gravado >= 2699.41 && gravado <= 4744.05) {
        cuotaFija = 158.55;
        porcentajeISR = 0.1088;
        limiteInferior = 2699.41;
      } else if (gravado >= 4744.06 && gravado <= 5514.75) {
        cuotaFija = 381;
        porcentajeISR = 0.16;
        limiteInferior = 4744.06;
      } else if (gravado >= 5514.76 && gravado <= 6602.7) {
        cuotaFija = 504.3;
        porcentajeISR = 0.1792;
        limiteInferior = 5514.76;
      } else if (gravado >= 6602.71 && gravado <= 13316.7) {
        cuotaFija = 699.3;
        porcentajeISR = 0.2136;
        limiteInferior = 6602.71;
      } else if (gravado >= 13316.71 && gravado <= 20988.9) {
        cuotaFija = 2133.3;
        porcentajeISR = 0.2352;
        limiteInferior = 13316.71;
      } else if (gravado >= 20988.91 && gravado <= 40071.3) {
        cuotaFija = 3937.8;
        porcentajeISR = 0.3;
        limiteInferior = 20988.91;
      } else if (gravado >= 40071.31 && gravado <= 53428.5) {
        cuotaFija = 9662.55;
        porcentajeISR = 0.32;
        limiteInferior = 40071.31;
      } else if (gravado >= 53428.51 && gravado <= 160285.35) {
        cuotaFija = 13936.8;
        porcentajeISR = 0.34;
        limiteInferior = 53428.51;
      } else {
        cuotaFija = 50268.15;
        porcentajeISR = 0.35;
        limiteInferior = 160285.36;
      }
      let primerResultadoISR, segundoResultadoISR, isrCalculado;
      primerResultadoISR = gravado - limiteInferior;
      segundoResultadoISR = primerResultadoISR * porcentajeISR;
      isrCalculado = (segundoResultadoISR + cuotaFija).toFixed(2);

      return {
        isrCalculado: isrCalculado,
        cuotaFija: cuotaFija,
        porcentajeISR: porcentajeISR,
        limiteInferior: limiteInferior,
      };
    },
    imssSMI() {
      const salarioIntegrado = this.factorIntegracion * this.job.salario;
      const SMI = salarioIntegrado * this.employee.tipoNomina;
      return SMI.toFixed(2);
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

      let masPercepciones = 0;
      let fondoAhorroTotal = parseFloat(this.percepcionFondoAhorro);
      let horasExtrasTotal;
      let vacacionesExtraTotal;
      let aguinaldoExtraTotal;

      // Se valida primero si hay horas extras
      if (this.employee.tiempoExtra == true) {
        horasExtrasTotal = parseFloat(
          this.percepcionHorasExtra().importeTotalHE
        );
      } else {
        horasExtrasTotal = 0;
      }

      // Se valida después si hay prima vacacional
      if (this.employee.primaVacacional == true) {
        vacacionesExtraTotal = parseFloat(
          this.percepcionVacaciones().importeVacaciones
        );
      } else {
        vacacionesExtraTotal = 0;
      }

      // Por último se valida el aguinaldo
      if (this.employee.aguinaldo == true) {
        aguinaldoExtraTotal = parseFloat(
          this.percepcionAguinaldo().importeAguinaldo
        );
      } else {
        aguinaldoExtraTotal = 0;
      }

      masPercepciones =
        totalPercepciones +
        fondoAhorroTotal +
        horasExtrasTotal +
        vacacionesExtraTotal +
        aguinaldoExtraTotal;
      return masPercepciones.toFixed(2);
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

      let masDeducciones;
      let isrTotal = parseFloat(this.isrPeriodo.isrCalculado);
      let imssTotal = parseFloat(this.imssRetencion);
      let infonavitTotal;

      if (this.employee.infonavit == true) {
        infonavitTotal = parseFloat(this.infonavit().descuentoInfonavitNomina);
      } else {
        infonavitTotal = 0;
      }

      masDeducciones = totalDeducciones + isrTotal + imssTotal + infonavitTotal;
      return masDeducciones.toFixed(2);
    },
    totalNetoNomina() {
      let totalNetoNomina;
      totalNetoNomina =
        parseFloat(this.salarioTotalEmpleado) +
        parseFloat(this.totalPercepciones) -
        parseFloat(this.totalDeducciones);
      return totalNetoNomina.toFixed(2);
    },
  },
  methods: {
    async getEmployee() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/empleados/${this.id}.json?auth=${user.idToken}`
      );
      const dataEmployee = await res.json();

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
    // Métodos para el cálculo de la nómina
    percepcionHorasExtra() {
      const horaLaboral = this.job.salario / 8;
      const horasExtra = this.employee.horasExtra;
      let horasPagadas;
      const UMATiempoExtra = this.UMA * 5;
      let sumaGravadosHE;
      let importeTotalHE;

      if (horasExtra > 9) {
        horasPagadas = horaLaboral * 9 * 2;
      } else {
        horasPagadas = horaLaboral * horasExtra * 2;
      }

      let exentoHorasExtra;
      let gravadoHorasExtra;
      if (horasPagadas * 0.5 > UMATiempoExtra) {
        exentoHorasExtra = UMATiempoExtra.toFixed(2);
        gravadoHorasExtra = horasPagadas - exentoHorasExtra;
      } else {
        exentoHorasExtra = (Number(horasPagadas) * Number(0.5)).toFixed(2);
        gravadoHorasExtra = horasPagadas - exentoHorasExtra;
      }

      let tercerGravadoHE;
      let segundoGravadoHE;
      let excedenteHoras;
      excedenteHoras = horasExtra - 9;
      if (excedenteHoras > 0) {
        tercerGravadoHE = horaLaboral * excedenteHoras * 3;
        segundoGravadoHE = horasPagadas + tercerGravadoHE + exentoHorasExtra;
        sumaGravadosHE = tercerGravadoHE + segundoGravadoHE + gravadoHorasExtra;
      } else {
        segundoGravadoHE = horasPagadas + exentoHorasExtra;
        sumaGravadosHE = gravadoHorasExtra + segundoGravadoHE;
        tercerGravadoHE = 0;
      }

      importeTotalHE = (
        Number(horasPagadas) -
        Number(exentoHorasExtra) +
        Number(tercerGravadoHE) +
        Number(exentoHorasExtra)
      ).toFixed(2);

      let gravadoTotalHE;
      gravadoTotalHE = (importeTotalHE - exentoHorasExtra).toFixed(2);

      return {
        exentoHorasExtra: exentoHorasExtra,
        // gravadoHorasExtra: gravadoHorasExtra,
        // segundoGravadoHE: segundoGravadoHE,
        // tercerGravadoHE: horasTriples,
        // sumaGravadosHE: sumaGravadosHE,
        importeTotalHE: importeTotalHE,
        gravadoTotalHE: gravadoTotalHE,
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
        importeVacaciones: primaVac.toFixed(2),
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
      gravadoAguinaldo = (importeAgui - exentoAguinaldo).toFixed(2);

      return {
        importeAguinaldo: importeAgui.toFixed(2),
        exentoAguinaldo: exentoAguinaldo,
        gravadoAguinaldo: gravadoAguinaldo,
      };
    },
    infonavit() {
      const diasCotizados = 61;
      const salarioIntegrado = this.factorIntegracion * this.job.salario;
      const descuentoDiario = salarioIntegrado * this.porcentajeDescuento;
      const subTotal = diasCotizados * descuentoDiario;
      const seguroVivienda =
        (this.employee.tipoNomina / diasCotizados) * diasCotizados;
      const descuentoInfonavit = subTotal + seguroVivienda;
      let descuentoInfonavitNomina;
      if (this.employee.tipoNomina == 15) {
        descuentoInfonavitNomina = (descuentoInfonavit / 4).toFixed(2);
      } else {
        descuentoInfonavitNomina = (descuentoInfonavit / 9).toFixed(2);
      }
      return {
        descuentoDiario: descuentoDiario.toFixed(2),
        subTotal: subTotal.toFixed(2),
        descuentoInfonavit: descuentoInfonavit.toFixed(2),
        descuentoInfonavitNomina: descuentoInfonavitNomina,
      };
    },
    descargarPDF() {
      let pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "ledger",
        encryption: {
          userPassword: `${this.employee.rfc}`,
        },
      });

      window.scrollTo(0, 0);

      html2canvas(this.$refs.content, {
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        allowTaint: true,
        useCORS: true,
        logging: false,
        height: window.outerHeight + window.innerHeight,
        windowHeight: window.outerHeight + window.innerHeight,
      })
        .then((canvas) => {
          const img = canvas.toDataURL("image/jpeg", 1);
          pdf.addImage(img, "JPEG", 10, 10);

          this.fechaActual = moment().format("YYYY-MM-DD");
          pdf.save(`NDESA-${this.employee.rfc}-${this.fechaActual}`);

          alert(
            `Se descargara un comprobante de pago de nómina del empleado con clave ${this.employee.clave}`
          );
        })
        .catch((err) => {
          alert("Algo salio mal");
        });

      router.push("/dashboard/welcome");
    },
  },
};
</script>