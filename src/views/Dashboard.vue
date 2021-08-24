<template>
  <Header>
    <div class="collapse-dashboard">
      <button
        class="p-0 border-0 navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        aria-label="Toggle navigation"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="offcanvas offcanvas-end navbar-light bg-light"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul
            class="
              mb-2
              navbar-nav
              me-auto
              mb-lg-0
              d-xxl-none d-lg-none d-sm-flex
            "
          >
            <router-link
              to="/dashboard/welcome"
              class="
                pb-3
                my-3
                text-center
                d-flex
                link-dark
                text-decoration-none
                border-bottom
              "
            >
              <span class="mx-auto fs-5 fw-semibold">Spire Admin</span>
            </router-link>
            <li class="nav-item dropdown">
              <a
                class="nav-link fw-bold dropdown-toggle"
                href="#"
                id="empleados"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ><i
                  class="
                    mx-1
                    align-middle
                    bi bi-people-fill
                    icon-size
                    text-danger
                  "
                ></i
                >Empleados</a
              >
              <ul class="dropdown-menu" aria-labelledby="empleados">
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/dashboard/listemployees"
                    >Ver empleados</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/dashboard/registeremployees"
                    >Registrar nuevo empleado</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link fw-bold dropdown-toggle"
                href="#"
                id="puestos"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ><i
                  class="mx-1 align-middle bi bi-wrench icon-size text-danger"
                ></i
                >Puestos de trabajo</a
              >
              <ul class="dropdown-menu" aria-labelledby="puestos">
                <li>
                  <router-link class="dropdown-item" to="/dashboard/listjobs"
                    >Ver puestos de trabajo</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/dashboard/registerjobs"
                    >Registrar nuevo puesto</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link fw-bold dropdown-toggle"
                href="#"
                id="percepciones"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ><i
                  class="mx-1 align-middle bi bi-wallet icon-size text-danger"
                ></i
                >Percepciones</a
              >
              <ul class="dropdown-menu" aria-labelledby="percepciones">
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/dashboard/listperceptions"
                    >Ver percepciones</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/dashboard/registerperceptions"
                    >Registrar nueva percepción</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link fw-bold dropdown-toggle"
                href="#"
                id="deducciones"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ><i
                  class="
                    mx-1
                    align-middle
                    bi bi-ui-checks
                    icon-size
                    text-danger
                  "
                ></i
                >Deducciones</a
              >
              <ul class="dropdown-menu" aria-labelledby="deducciones">
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/dashboard/listdeductions"
                    >Ver deducciones</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/dashboard/registerdeductions"
                    >Registrar nueva deducción</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="my-3 border-top"></li>
            <router-link
              to="/"
              @click="doLogout"
              class="border-0 fw-bold text-dark bg-light text-decoration-none"
              ><i
                class="mx-1 align-middle bi bi-power icon-size text-danger"
              ></i
              >Cerrar Sesión</router-link
            >
          </ul>
        </div>
      </div>
    </div>
  </Header>
  <div class="container-fluid">
    <div class="row">
      <div class="px-0 col-2 d-none d-lg-block">
        <Sidebar></Sidebar>
      </div>
      <div class="col-12 col-lg-9 ms-lg-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";

export default {
  name: "Dashboard",
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      // API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
    };
  },
  computed: {
    // session() {
    //   const user = localStorage.getItem("user");
    //   if (user) {
    //     return true;
    //   }
    //   return false;
    // },
  },
  // mounted() {
  //   this.getUser();
  // },
  methods: {
    async doLogout() {
      try {
        await this.$store.dispatch("user/doLogout");
        this.$router.push({ name: "Home" });
        this.$toast.add({
          severity: "success",
          summary: "Hasta pronto!",
          life: 3000
        });
        // this.$buefy.toast.open({
        //   message: "Logged out success",
        //   type: "is-success"
        // });
      } catch (error) {
        console.log(error.message);
        this.$toast.add({
          severity: "error",
          detail: error.message,
          life: 5000
        });
        // this.$buefy.toast.open({
        //   duration: 4000,
        //   message: error.message,
        //   type: "is-danger"
        // });
      }
    }
    // cerrarSesion() {
    // Se elimina la sesión del usuario en el localStorage
    // localStorage.removeItem("user");
    // }
    // async getUser() {
    //   const user = JSON.parse(localStorage.getItem("user"));

    //   const res = await fetch(
    //     `${this.API_FIREBASE}nomina.json?auth=${user.idToken}`
    //   );

    //   console.log(user);

    //   const data = await res.json();
    // },
  }
};
</script>

<style scoped>
/* Animación del Spinner */

.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
}
.lds-circle > div {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 1px;
  border-radius: 50%;
  background: #f45e61;
  animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
@keyframes lds-circle {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}

/* Animación del logo (flechas) */
.sides {
  --b: 2px;
  --w: 0px;
  padding: 10px;
  border: var(--b) solid var(--c, #0000);
  box-shadow: 0 0 0 100px var(--c, #0000);
  clip-path: polygon(
    0 var(--w),
    var(--b) var(--w),
    var(--b) 0,
    calc(100% - var(--w)) 0,
    calc(100% - var(--w)) var(--b),
    100% var(--b),
    100% calc(100% - var(--w)),
    calc(100% - var(--b)) calc(100% - var(--w)),
    calc(100% - var(--b)) 100%,
    var(--w) 100%,
    var(--w) calc(100% - var(--b)),
    0 calc(100% - var(--b))
  );
  transition: 0.3s 0.3s, clip-path 0.3s;
}
.sides:hover {
  --c: #000;
  --w: -50px;
  transition: 0.3s, clip-path 0.3s 0.3s;
}

/* Fuente de logo */
.fw-semibold {
  font-weight: 600;
}
</style>
