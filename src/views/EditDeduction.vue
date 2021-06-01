<template>
  <h1 class="my-3 text-dark">Editar información de deducción</h1>
  <form @submit.prevent="updateDeduction" class="pb-4 row g-3">
    <div class="col-md-4">
      <label for="clave" class="form-label">Clave</label>
      <input
        type="text"
        v-model.trim="deduction.clave"
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
    <div class="col-md-4">
      <label class="form-label" for="percepcion">Nombre</label>
      <input
        type="text"
        v-model.trim="deduction.nombre"
        class="form-control"
        id="percepcion"
        maxlength="30"
        pattern="^[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,}$"
        disabled
      />
    </div>
    <div class="col-md-4">
      <label for="importe" class="form-label">Importe</label>
      <input
        type="number"
        step="any"
        v-model.number="deduction.importe"
        class="form-control"
        id="importe"
        max="1000"
        min="10"
        pattern="^\d+\.?\d*$"
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
  name: "EditDeduction",
  data() {
    return {
      API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
      deduction: {},
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.getDeduction();
  },
  methods: {
    async getDeduction() {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `${this.API_FIREBASE}/nomina/deducciones/${this.id}.json?auth=${user.idToken}`
      );
      const data = await res.json();

      this.deduction = data;
    },
    async updateDeduction() {
      const user = JSON.parse(localStorage.getItem("user"));
      await fetch(
        `${this.API_FIREBASE}/nomina/deducciones/${this.id}.json?auth=${user.idToken}`,
        {
          method: "PATCH",
          body: JSON.stringify(this.deduction),
        }
      );

      router.push("/dashboard/listdeductions");
    },
  },
};
</script>