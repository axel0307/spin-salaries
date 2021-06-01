<template>
  <h1 class="my-3 text-dark">Registro de percepciones</h1>
  <form @submit.prevent="createPerception" class="pb-4 row g-3">
    <div class="col-md-4">
      <label for="clave" class="form-label">Clave</label>
      <input
        type="text"
        v-model.trim="perception.clave"
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
    <div class="col-md-4">
      <label class="form-label" for="percepcion">Nombre</label>
      <input
        type="text"
        v-model.trim="perception.nombre"
        class="form-control"
        id="percepcion"
        maxlength="30"
        pattern="^[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,}$"
      />
    </div>
    <div class="col-md-4">
      <label for="importe" class="form-label">Importe</label>
      <input
        type="number"
        step="any"
        v-model.number="perception.importe"
        class="form-control"
        id="importe"
        max="1000"
        min="10"
        pattern="^\d+\.?\d*$"
      />
    </div>
    <div class="pb-5 col-12">
      <button
        type="button"
        class="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#botonRegistrar"
      >
        Registrar percepción
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
              Antes de continuar recuerda que solo podrás modificar el importe
              de la percepción
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
  name: "RegisterPerceptions",
  data() {
    return {
      API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
      perception: {
        clave: "",
        nombre: "",
        importe: "",
      },
    };
  },
  methods: {
    async createPerception() {
      const user = JSON.parse(localStorage.getItem("user"));

      await fetch(
        `${this.API_FIREBASE}nomina/percepciones.json?auth=${user.idToken}`,
        {
          method: "POST",
          body: JSON.stringify(this.perception),
        }
      );

      router.push("/dashboard/listperceptions");
    },
  },
};
</script>