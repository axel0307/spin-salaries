<template>
  <h1 class="my-3 text-dark">Registro de puestos de trabajo</h1>
  <form @submit.prevent="createJob" class="pb-4 row g-3">
    <div class="col-md-3">
      <label for="clave" class="form-label">Clave</label>
      <input
        type="text"
        v-model.trim="job.clave"
        class="form-control"
        id="clave"
        required="true"
        maxlength="6"
        minlength="6"
        pattern="([A-Z|0-9]{6})"
        aria-describedby="claveAyuda"
      />
      <div id="claveAyuda" class="form-text">
        Solo admite mayúsculas y números (6 carácteres)
      </div>
    </div>
    <div class="col-md-3">
      <label class="form-label" for="area">Área</label>
      <select class="form-select" v-model="job.area" id="area" required="true">
        <option selected disabled value="">Selecciona una opción</option>
        <option value="Contabilidad y Auditoría">
          Contabilidad y Auditoría
        </option>
        <option value="Marketing">Marketing</option>
        <option value="Biblioteca/Archivo">Biblioteca / Archivo</option>
        <option value="Mercadeo">Mercadeo</option>
        <option value="Relaciones Públicas">Relaciones Públicas</option>
        <option value="Consultoría">Consultoría</option>
        <option value="Reclutamiento">Reclutamiento</option>
        <option value="Tesorería">Tesorería</option>
        <option value="Recursos Humanos">Recursos Humanos</option>
        <option value="Gerencia y Administración">
          Gerencia y Administración
        </option>
        <option value="Producción">Producción</option>
        <option value="Mantenimiento y Limpieza">
          Mantenimiento y Limpieza
        </option>
        <option value="Feedback y Monitorización">
          Feedback y Monitorización
        </option>
        <option value="Ventas">Ventas</option>
      </select>
    </div>
    <div class="col-md-3">
      <label for="puesto" class="form-label">Nombre</label>
      <input
        type="text"
        v-model.trim="job.nombre"
        class="form-control"
        id="puesto"
        required="true"
        maxlength="30"
        pattern="^[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,}$"
      />
    </div>
    <div class="col-md-3">
      <label for="salario" class="form-label">Salario Diario</label>
      <input
        type="number"
        step="any"
        v-model.number="job.salario"
        class="form-control"
        id="salario"
        required="true"
        min="141.7"
        pattern="^\d+\.?\d*$"
        max="1500"
      />
    </div>
    <div class="pb-5 col-12">
      <button
        type="button"
        class="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#botonRegistrar"
      >
        Registrar puesto de trabajo
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
              Antes de continuar recuerda que solo podrás modificar el salario
              diario
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
                data-bs-dismiss="modal"
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
  name: "RegisterJobs",
  data() {
    return {
      API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
      job: {
        clave: "",
        area: "",
        nombre: "",
        salario: "",
      },
    };
  },
  methods: {
    async createJob() {
      const user = JSON.parse(localStorage.getItem("user"));

      await fetch(
        `${this.API_FIREBASE}nomina/trabajos.json?auth=${user.idToken}`,
        {
          method: "POST",
          body: JSON.stringify(this.job),
        }
      );

      router.push("/dashboard/listjobs");
    },
  },
};
</script>