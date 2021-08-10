<template>
  <div class="container">
    <div class="pt-4 row">
      <div class="col-8 d-none d-lg-flex">
        <img
          src="../../src/assets/img/undraw_login.svg"
          class="img-fluid"
          alt="imageLogin"
        />
      </div>

      <div class="col-auto mx-auto col-lg-4">
        <div
          v-if="errors"
          class="
            alert alert-danger
            d-flex
            align-items-center
            alert-dismissible
            fade
            show
          "
          role="alert"
        >
          <div>
            <i
              class="
                mx-1
                align-middle
                bi bi-shield-exclamation
                icon-size
                text-danger
              "
            ></i
            >Datos incorrectos
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <div class="pt-3 card">
          <img
            src="../../src/assets/img/spin-salaries.svg"
            class="p-2 mx-auto img-fluid d-flex"
            style="max-width: 6rem"
            alt="logo"
          />
          <h1 class="h1 text-danger font-weight-bolder">Iniciar Sesión</h1>
          <form
            @submit.prevent="doLogin"
            class="px-4 py-3 needs-validation"
            novalidate
          >
            <div class="mb-3 form-floating">
              <input
                type="email"
                v-model.trim="email"
                class="form-control"
                id="user"
                placeholder="email@example.com"
              />
              <label for="user"
                ><i
                  class="
                    mx-1
                    align-middle
                    bi bi-person-circle
                    icon-size
                    text-primary
                  "
                ></i
                >Correo Electrónico</label
              >
            </div>
            <div class="mb-3 form-floating">
              <input
                type="password"
                v-model.trim="password"
                class="form-control"
                id="pass"
                placeholder="Password"
              />
              <label for="pass"
                ><i
                  class="
                    mx-1
                    text-center
                    align-middle
                    bi bi-lock-fill
                    icon-size
                    text-primary
                  "
                ></i
                >Contraseña</label
              >
            </div>
            <button type="submit" class="btn btn-outline-danger">Entrar</button>
            <!-- <n-button type="primary">Primary</n-button> -->
          </form>
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            type="button"
            href.prevent="#"
            data-bs-toggle="modal"
            data-bs-target="#olvide"
          >
            ¿Olvidaste tu contraseña?</a
          >

          <!-- Modal -->
          <div
            class="modal fade"
            id="olvide"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            data-bs-scroll="true"
            tabindex="-1"
            aria-labelledby="olvidePassword"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-sm modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header d-none d-lg-flex">
                  <h5 class="modal-title" id="olvidePassword">Oh no...</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  Necesitas llamar al siguiente número 55-43-37-25-44 para
                  hablar con un asesor de Recursos Humanos y te restablezca tu
                  contraseña
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="my-0 btn btn-outline-success"
                    data-bs-dismiss="modal"
                  >
                    Entendido<i class="mx-1 align-middle bi bi-check-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index.js";
// import { NButton } from "naive-ui";

export default {
  data: () => ({
    // API_KEY: process.env.VUE_APP_API_TOOL_KIT,
    // URL_API: process.env.VUE_APP_URL_GOOGLEAPIS,
    email: "",
    password: "",
    errors: false
  }),
  // components: {
  //   NButton
  // },
  methods: {
    async doLogin() {
      try {
        await this.$store.dispatch("user/doLogin", {
          email: this.email,
          password: this.password
        });
        localStorage.setItem("user", JSON.stringify(email));

        router.push("/dashboard/welcome");
      } catch (error) {
        console.log(error.message);
      }
    }
    // Debe ser una función asincrona, de otra forma va a fallar
    /*
    async validarUsuario() {
      if (this.password.length >= 6 && this.email != "") {
        try {
          const resp = await fetch(`${this.URL_API}?key=${this.API_KEY}`, {
            method: "POST",
            body: JSON.stringify({
              email: this.email,
              password: this.password,
              returnSecureToken: true
            })
          });

          const data = await resp.json();

          if (data.error) {
            this.errors = true;
          } else {
            this.errors = false;
            //console.log(data); // Vemos todo el objeto JSON del usuario que se loguea

            // Almacenamos la sesion de los usuarios en LocalStorage
            localStorage.setItem("user", JSON.stringify(data));

            // Realizamos una redirección hacia la ruta de "welcome.vue"
            router.push("/dashboard/welcome");
          }
        } catch (error) {}
      } else {
        return console.log("algo fallo");
      }
    }
    */
  }
};
</script>

<style scoped>
.icon-size {
  font-size: 1.2rem;
}

h1 {
  font-family: "Farro-Medium", sans-serif;
}
</style>