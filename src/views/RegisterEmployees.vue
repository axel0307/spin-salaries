<template>
  <h1 class="my-3 text-dark">Registro de empleados</h1>
  <form @submit.prevent="createEmployee" class="pb-4 row g-3">
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
      />
    </div>
    <div class="col-md-4">
      <label class="form-label" for="sexo">Sexo</label>
      <select
        class="form-select"
        id="sexo"
        required="true"
        v-model="employee.sexo"
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
          name="date"
          id="nacimiento"
          class="form-control"
          required="true"
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
      />
      <div id="rfcAyuda" class="form-text">
        Recuerda que debe cumplir los reglamentos de un RFC de una persona
        física
      </div>
    </div>
    <h5 class="pb-2 border-2 text-dark border-bottom border-danger text-start">
      Datos de su puesto de trabajo
    </h5>
    <div class="col-md-6">
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
    <div class="col-md-6">
      <label class="form-label" for="labor">Labor</label>
      <select
        class="form-select"
        id="labor"
        required="true"
        v-model="employee.trabajo"
      >
        <option selected disabled value="">Selecciona una opción</option>
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
      <label class="form-label" for="inicio">Firma del contrato</label>
      <input
        type="date"
        name="date"
        id="inicio"
        pattern="^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$"
        class="form-control"
        required="true"
        v-model="employee.firma"
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
        <option selected disabled value="">Selecciona una opción</option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
          required="true"
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
        aria-describedby="passAyuda"
        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
      />
    </div>
    <div id="passAyuda" class="col-md-6 offset-md-6 form-text">
      La contraseña debe tener mínimo 8 letras e incluir al menos una mayúscula
      y un número
    </div>
    <div class="col-md-4">
      <label class="form-label" for="status" hidden>Estatus</label>
      <select
        class="form-select"
        id="status"
        required="true"
        v-model="employee.status"
        hidden
      >
        <option disabled value="">Selecciona una opción</option>
        <option value="true" selected>Activo</option>
        <option value="false">De baja</option>
      </select>
    </div>
    <div class="pb-5 col-12">
      <button
        type="button"
        class="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#botonRegistrar"
      >
        Registrar empleado
      </button>

      <!-- Modal -->
      <div class="modal" id="botonRegistrar" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header d-none d-lg-flex">
              <h5 class="modal-title">
                ¿Todo fue ingresado de forma correcta?
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Antes de continuar recuerda que no podras modificar los datos
              personales y de afiliación de dicho empleado(a)
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Regresar<i class="mx-1 align-middle bi bi-reply-fill"></i>
              </button>
              <button
                type="submit"
                class="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#botonRegistrar"
              >
                Todo esta correcto<i
                  class="mx-1 align-middle bi bi-check-lg"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import router from "../router/index.js";

export default {
  name: "RegisterEmployess",
  data() {
    return {
      API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
      employee: {
        nombre: "",
        pApellido: "",
        sApellido: "",
        sexo: "",
        nacimiento: "",
        curp: "",
        nss: "",
        rfc: "",
        clave: "",
        trabajo: "",
        firma: "",
        clase: "",
        duracion: "",
        correo: "",
        password: "",
        status: true,
      },
      jobs: [],
      trabajos: [],
      options: [
        { content: "Confianza", value: "Confianza" },
        { content: "Base", value: "Base" },
      ],
      inputDisabled: true,
    };
  },
  mounted() {
    this.getJobs();
  },
  methods: {
    onChangeSelect(e) {
      this.inputDisabled = e.target.value == "Base";
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
    async createEmployee() {
      const user = JSON.parse(localStorage.getItem("user"));

      await fetch(
        `${this.API_FIREBASE}nomina/empleados.json?auth=${user.idToken}`,
        {
          method: "POST",
          body: JSON.stringify(this.employee),
        }
      );

      router.push("/dashboard/listemployees");
    },
  },
};
</script>