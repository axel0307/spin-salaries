<template>
  <div class="d-flex flex-fill flex-grow-1 px-0 h-100">
    <div
      class="bg-light shadow-sm mb-0 bg-body rounded d-none d-lg-block"
      style="min-width: 210px; min-height: 76.5vh"
    >
      <router-link
        to="/dashboard/welcome"
        class="d-flex pb-3 my-3 link-dark text-decoration-none border-bottom text-center"
      >
        <span class="fs-5 fw-semibold mx-auto">Spire Admin</span>
      </router-link>
      <ul class="list-unstyled ps-0">
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard"
            aria-expanded="false"
          >
            <i
              class="bi bi-people-fill icon-size text-danger align-middle mx-1"
            ></i
            >Empleados
          </button>
          <div class="collapse" id="dashboard">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <router-link
                  class="link-dark rounded"
                  to="/dashboard/listemployees"
                  >Ver empleados</router-link
                >
              </li>
              <li>
                <router-link
                  class="link-dark rounded"
                  to="/dashboard/registeremployees"
                  >Registrar nuevo empleado</router-link
                >
              </li>
            </ul>
          </div>
        </li>

        <li class="mb-1">
          <button
            class="btn btn-toggle rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
          >
            <i class="bi bi-wrench icon-size text-danger align-middle mx-1"></i
            >Puestos de trabajo
          </button>
          <div class="collapse" id="dashboard-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <router-link class="link-dark rounded" to="/dashboard/listjobs"
                  >Ver puestos de trabajo</router-link
                >
              </li>
              <li>
                <router-link
                  class="link-dark rounded"
                  to="/dashboard/registerjobs"
                  >Registrar nuevo puesto</router-link
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#orders-collapse"
            aria-expanded="false"
          >
            <i class="bi bi-wallet icon-size text-danger align-middle mx-1"></i
            >Percepciones
          </button>
          <div class="collapse" id="orders-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <router-link
                  class="link-dark rounded"
                  to="/dashboard/listperceptions"
                  >Ver percepciones</router-link
                >
              </li>
              <li>
                <router-link
                  class="link-dark rounded"
                  to="/dashboard/registerperceptions"
                  >Registrar nueva percepción</router-link
                >
              </li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#account-collapse"
            aria-expanded="false"
          >
            <i
              class="bi bi-ui-checks icon-size text-danger align-middle mx-1"
            ></i
            >Deducciones
          </button>
          <div class="collapse" id="account-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <router-link
                  class="link-dark rounded"
                  to="/dashboard/listdeductions"
                  >Ver deducciones</router-link
                >
              </li>
              <li>
                <router-link
                  class="link-dark rounded"
                  to="/dashboard/registerdeductions"
                  >Registrar nueva deducción</router-link
                >
              </li>
            </ul>
          </div>
        </li>

        <li class="border-top my-3"></li>
        <router-link
          to="/"
          @click="cerrarSesion"
          class="fw-bold list-group-item list-group-item-action border-0"
          ><i class="bi bi-power icon-size text-danger align-middle mx-1"></i>
          Cerrar Sesión</router-link
        >
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    cerrarSesion() {
      // Se elimina la sesión del usuario en el localStorage
      localStorage.removeItem("user");
    },
  },
};
</script>

<style scoped>
.icon-size {
  font-size: 1.2rem;
}

.b-example-divider {
  width: 1.5rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.bi {
  vertical-align: -0.125em;
  pointer-events: none;
  fill: currentColor;
}

.dropdown-toggle {
  outline: 0;
}

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  background-color: transparent;
  border: 0;
}
.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, 0.85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: 0.5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, 0.85);
}
.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.fw-semibold {
  font-weight: 600;
}
</style>