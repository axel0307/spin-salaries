<template>
  <h1 class="my-3 text-dark">Editar información de empleado(a)</h1>
  <form @submit.prevent="updateEmployee" class="pb-4 row g-3">
    <h5 class="pb-2 border-2 text-dark border-bottom border-danger text-start">
      Datos personales
    </h5>
    <div class="col-md-4">
      <label for="nombre" class="form-label">Nombre</label>
      <input
        type="text"
        v-model.trim="employee.nombre"
        class="form-control"
        id="nombre"
        required="true"
        maxlength="20"
        pattern="^[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,}$"
        disabled
      />
    </div>
    <div class="col-md-4">
      <label for="p-apellido" class="form-label">Primer Apellido</label>
      <input
        type="text"
        v-model.trim="employee.pApellido"
        class="form-control"
        id="p-apellido"
        required="true"
        maxlength="20"
        pattern="^[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,}$"
        disabled
      />
    </div>
    <div class="col-md-4">
      <label for="s-apellido" class="form-label">Segundo Apellido</label>
      <input
        type="text"
        v-model.trim="employee.sApellido"
        class="form-control"
        id="s-apellido"
        maxlength="20"
        pattern="^[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,}$"
        disabled
      />
    </div>
    <div class="col-md-4">
      <label class="form-label" for="sexo">Sexo</label>
      <select
        class="form-select"
        id="sexo"
        required="true"
        v-model="employee.sexo"
        disabled
      >
        <option selected disabled value="">Selecciona una opción</option>
        <option value="Hombre">Hombre</option>
        <option value="Mujer">Mujer</option>
      </select>
    </div>
    <div class="col-md-4">
      <label for="nacimiento" class="form-label">Fecha de nacimiento</label>
      <div class="mx-auto text-center">
        <input
          type="date"
          v-model="employee.nacimiento"
          pattern="^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$"
          required="true"
          name="date"
          id="nacimiento"
          class="form-control"
          disabled
        />
      </div>
    </div>
    <div class="col-md-4">
      <label for="curp" class="form-label">CURP</label>
      <input
        type="text"
        v-model.trim="employee.curp"
        class="form-control"
        id="curp"
        required="true"
        pattern="([A-Z]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[A-Z]{3}[0-9A-Z]\d)"
        maxlength="18"
        aria-describedby="curpAyuda"
        disabled
      />
      <div id="curpAyuda" class="form-text">
        Debe cumplir con los reglamentos de una CURP
      </div>
    </div>
    <h5 class="pb-2 border-2 text-dark border-bottom border-danger text-start">
      Datos para afiliación
    </h5>
    <div class="col-md-6">
      <label for="nss" class="form-label">NSS</label>
      <input
        type="text"
        v-model.number="employee.nss"
        class="form-control"
        id="nss"
        required="true"
        maxlength="11"
        pattern="[0-9]{11}"
        aria-describedby="nssAyuda"
        disabled
      />
      <div id="nssAyuda" class="form-text">
        Recuerda que el NSS contiene 11 digitos
      </div>
    </div>
    <div class="col-md-6">
      <label for="rfc" class="form-label"
        >RFC
        <span><small class="text-muted">(persona física)</small></span></label
      >
      <input
        type="text"
        v-model.trim="employee.rfc"
        class="form-control"
        id="rfc"
        required="true"
        pattern="([A-Z]{4}([0-9]{6})([A-Z|0-9]{3}))"
        maxlength="13"
        aria-describedby="rfcAyuda"
        disabled
      />
      <div id="rfcAyuda" class="form-text">
        Recuerda que debe cumplir los reglamentos de un RFC de una persona
        física
      </div>
    </div>
    <h5 class="pb-2 border-2 text-dark border-bottom border-danger text-start">
      Datos de su puesto de trabajo
    </h5>
    <div class="col-md-4">
      <label for="clave" class="form-label">Clave de empleado</label>
      <input
        type="text"
        v-model.trim="employee.clave"
        class="form-control"
        id="clave"
        required="true"
        maxlength="6"
        pattern="([A-Z|0-9]{6})"
        aria-describedby="claveAyuda"
      />
      <div id="claveAyuda" class="form-text">
        Solo admite mayúsculas y números (6 carácteres)
      </div>
    </div>
    <div class="col-md-4">
      <label for="labor" class="form-label">Labor</label>
      <select
        class="form-select"
        id="labor"
        required="true"
        v-model="employee.trabajo"
        disabled
      >
        <option disabled value="">Selecciona una opción</option>
        <option
          v-for="(trabajo, i) in trabajos"
          :key="i"
          :value="trabajo"
          required="true"
        >
          {{ trabajo.nombre }}
        </option>
      </select>
    </div>
    <div class="col-md-4">
      <label class="form-label" for="tipoNomina">Tipo de nómina</label>
      <select
        class="form-select"
        id="tipoNomina"
        required="true"
        v-model="employee.tipoNomina"
        disabled
      >
        <option selected disabled value="">Selecciona una opción</option>
        <option value="7">Semanal</option>
        <option value="15">Quincenal</option>
      </select>
    </div>
    <div class="col-md-4">
      <label class="form-label" for="inicio">Firma del contrato</label>
      <input
        type="date"
        name="date"
        id="inicio"
        required="true"
        pattern="^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$"
        class="form-control"
        v-model="employee.firma"
        disabled
      />
    </div>
    <div class="col-md-4">
      <label class="form-label" for="clase">Clase de empleado</label>
      <select
        @change="onChangeSelect($event)"
        class="form-select"
        id="clase"
        required="true"
        v-model="employee.clase"
      >
        <option disabled value="">Selecciona una opción</option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.content }}
        </option>
      </select>
    </div>
    <div class="col-md-4">
      <label class="form-label" for="fin"
        >Duración del contrato (en meses)</label
      >
      <input
        :disabled="inputDisabled"
        class="form-control"
        v-model.number="employee.duracion"
        min="1"
        id="fin"
        type="number"
        pattern="^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$"
      />
    </div>
    <h5 class="pb-2 border-2 text-dark border-bottom border-danger text-start">
      Agregar deducciones y percepciones
    </h5>
    <div class="col-md-6">
      <p class="text-start">Agrega deducciones del empleado(a)</p>
      <div class="col-md-2 form-check text-start">
        <input
          type="checkbox"
          v-model="employee.imss"
          id="imss"
          class="form-check-input"
          checked
          disabled
        />
        <label for="imss">IMSS</label>
      </div>
      <div class="col-md-2 form-check text-start">
        <input
          type="checkbox"
          v-model="employee.isr"
          id="isr"
          class="form-check-input"
          checked
          disabled
        />
        <label for="isr">ISR</label>
      </div>
      <div class="col-md-2 form-check text-start">
        <input
          type="checkbox"
          v-model="employee.infonavit"
          id="infonavit"
          class="form-check-input"
        />
        <label for="infonavit">Infonavit</label>
      </div>
      <div
        class="col-md-6 form-check text-start"
        v-for="(deduccion, i) in deducciones"
        :key="i"
      >
        <input
          v-model="employee.deducciones"
          class="form-check-input"
          type="checkbox"
          :value="deduccion"
        />
        <label class="form-check-label">
          {{ deduccion.nombre }}
        </label>
      </div>
    </div>
    <div class="col-md-6">
      <p class="text-start">Agrega percepciones del empleado(a)</p>
      <div class="col-md-4 form-check text-start">
        <input
          type="checkbox"
          v-model="employee.fondoAhorro"
          id="fondoAhorro"
          class="form-check-input"
          checked
          disabled
        />
        <label for="fondoAhorro">Fondo de ahorro</label>
      </div>
      <div class="col-md-4 form-check text-start">
        <input
          type="checkbox"
          v-model="employee.primaVacacional"
          id="primaVacacional"
          class="form-check-input"
        />
        <label for="primaVacacional">Prima Vacacional</label>
      </div>
      <div class="col-md-2 form-check text-start">
        <input
          type="checkbox"
          v-model="employee.aguinaldo"
          id="aguinaldo"
          class="form-check-input"
        />
        <label for="aguinaldo">Aguinaldo</label>
      </div>
      <div
        class="col-md-6 form-check text-start"
        v-for="(percepcion, i) in percepciones"
        :key="i"
      >
        <input
          v-model="employee.percepciones"
          class="form-check-input"
          type="checkbox"
          :value="percepcion"
        />
        <label class="form-check-label">{{ percepcion.nombre }}</label>
      </div>
      <div class="mb-3 input-group">
        <div class="input-group-text">
          <input
            class="mt-0 me-2 form-check-input"
            type="checkbox"
            v-on:click="
              mostrarHorasExtras();
              borrarHoras();
            "
            v-model="employee.tiempoExtra"
            id="tiempoExtra"
          />
          <label for="tiempoExtra"> Horas extras</label>
        </div>
        <input
          type="number"
          class="form-control"
          min="0"
          max="15"
          id="horasExtra"
          v-model.number="employee.horasExtra"
        />
      </div>
    </div>
    <h5 class="pb-2 border-2 text-dark border-bottom border-danger text-start">
      Datos para su cuenta
    </h5>
    <div class="col-md-6">
      <label for="email" class="form-label">Correo electrónico</label>
      <input
        type="email"
        v-model.trim="employee.correo"
        class="form-control"
        id="email"
        required="true"
        disabled
      />
    </div>
    <div class="col-md-6">
      <label for="pass" class="form-label">Contraseña</label>
      <input
        type="password"
        v-model.trim="employee.password"
        class="form-control"
        id="pass"
        required="true"
        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
      />
    </div>
    <div id="passAyuda" class="col-md-6 offset-md-6 form-text">
      La contraseña debe tener mínimo 8 letras e incluir al menos una mayúscula
      y un número
    </div>
    <div class="col-md-4">
      <label class="form-label" for="status">Estatus</label>
      <select
        class="form-select"
        id="status"
        required="true"
        v-model="employee.status"
      >
        <option disabled value="" selected>Selecciona una opción</option>
        <option value="true">Activo</option>
        <option value="false">De baja</option>
      </select>
    </div>
    <div class="pb-3 col-12">
      <button type="submit" class="btn btn-outline-danger">
        Guardar información
      </button>
    </div>
  </form>
</template>

<script>
import router from "../router/index.js";

export default {
  name: "EditEmployee",
  data() {
    return {
      API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
      employee: {},
      id: this.$route.params.id,
      jobs: [],
      trabajos: [],
      deductions: [],
      deducciones: [],
      perceptions: [],
      percepciones: [],
      options: [
        { content: "Confianza", value: "Confianza" },
        { content: "Base", value: "Base" },
      ],
      inputDisabled: true,
    };
  },
  mounted() {
    this.getEmployee();
    this.getJobs();
    this.getDeductions();
    this.getPerceptions();
  },
  methods: {
    onChangeSelect(e) {
      this.inputDisabled = e.target.value == "Base";
    },
    mostrarHorasExtras() {
      if (document.getElementById("tiempoExtra").checked) {
        document.getElementById("horasExtra").style.display = "block";
        document.getElementById("horasExtra").min = 1;
      } else {
        document.getElementById("horasExtra").style.display = "none";
        document.getElementById("horasExtra").value = 0;
        document.getElementById("horasExtra").min = 0;
      }
    },
    borrarHoras() {
      this.employee.horasExtra = 0;
    },
    async getJobs() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/trabajos.json?auth=${user.idToken}`
      );
      const data = await res.json();

      for (let i in data) {
        this.jobs.push({
          id: i,
          data: data[i],
        });
        this.trabajos = data;
      }
      // console.log(this.trabajos);
    },
    async getDeductions() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/deducciones.json?auth=${user.idToken}`
      );
      const data = await res.json();

      for (let i in data) {
        this.deductions.push({
          id: i,
          data: data[i],
        });
        this.deducciones = data;
      }
      // console.log(this.deducciones);
    },
    async getPerceptions() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/percepciones.json?auth=${user.idToken}`
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
    async getEmployee() {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/empleados/${this.id}.json?auth=${user.idToken}`
      );
      const data = await res.json();

      this.employee = data;
      // console.log(this.employee);
    },
    async updateEmployee() {
      const user = JSON.parse(localStorage.getItem("user"));
      await fetch(
        `${this.API_FIREBASE}nomina/empleados/${this.id}.json?auth=${user.idToken}`,
        {
          method: "PATCH",
          body: JSON.stringify(this.employee),
        }
      );

      router.push("/dashboard/listemployees");
    },
  },
};
</script>