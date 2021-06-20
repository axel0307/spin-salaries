<template>
  <h1 class="my-3 text-dark">Editar información de puesto</h1>
  <form @submit.prevent="updateJob" class="pb-4 row g-3">
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
        disabled
      />
      <div id="claveAyuda" class="form-text">
        Solo admite mayúsculas y números (6 carácteres)
      </div>
    </div>
    <div class="col-md-3">
      <label class="form-label" for="area">Área</label>
      <select
        class="form-select"
        v-model="job.area"
        id="area"
        required="true"
        disabled
      >
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
        maxlength="30"
        pattern="^[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,}$"
        disabled
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
        min="141.7"
        pattern="^\d+\.?\d*$"
        max="3000"
      />
    </div>
    <div class="pb-5 col-12">
      <button type="submit" class="btn btn-outline-primary">
        Guardar información
      </button>
    </div>
  </form>
</template>

<script>
import router from "../router/index.js";

export default {
  name: "EditJob",
  data() {
    return {
      API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
      job: {},
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.getJob();
  },
  methods: {
    async getJob() {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `${this.API_FIREBASE}nomina/trabajos/${this.id}.json?auth=${user.idToken}`
      );
      const data = await res.json();

      this.job = data;
    },
    async updateJob() {
      const user = JSON.parse(localStorage.getItem("user"));
      await fetch(
        `${this.API_FIREBASE}nomina/trabajos/${this.id}.json?auth=${user.idToken}`,
        {
          method: "PATCH",
          body: JSON.stringify(this.job),
        }
      );

      router.push("/dashboard/listjobs");
    },
  },
};
</script>