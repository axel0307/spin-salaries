<template>
  <h1 class="my-3 text-dark">Empleados</h1>
  <div class="mx-auto">
    <div v-if="employees" class="table-responsive mx-md-5">
      <table
        class="
          table
          caption-top
          table-responsive-sm table-bordered table-striped table-hover
        "
      >
        <caption>
          <div class="d-flex justify-content-center">
            <i class="mx-1 my-auto fw-bold icon-size align-right bi bi-pen"></i
            ><span class="pe-4"> = Editar empleado</span>
            <i
              class="
                mx-1
                my-auto
                fw-bold
                icon-size
                align-right
                bi bi-piggy-bank
              "
            ></i
            ><span class="pe-4"> = Pagar nómina</span>
            <i
              class="mx-1 my-auto fw-bold icon-size align-right bi bi-door-open"
            ></i
            ><span class="pe-4"> = Realizar finiquito</span>
          </div>
        </caption>
        <thead>
          <tr>
            <th scope="col">Clave</th>
            <th scope="col">Nombre</th>
            <th scope="col">Área</th>
            <th scope="col">Trabajo</th>
            <th scope="col">Salario Diario</th>
            <th scope="col">Clase</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <Employee
            v-for="(employee, i) in employees"
            :key="i"
            :data="employee"
          ></Employee>
        </tbody>
      </table>
    </div>
    <Loading class="mx-auto" v-else></Loading>
  </div>
</template>

<script>
import Employee from "../components/Employee.vue";
import Loading from "../components/Loading.vue";
import { mapState } from "vuex";

export default {
  name: "ListEmployees",
  data: () => ({
    // API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
    // employees: [],
    load: false
  }),
  components: { Employee, Loading },
  // mounted() {
  //   this.getEmployees();
  // },
  // methods: {
  //   async getEmployees() {
  //     this.load = true;
  //     const user = JSON.parse(localStorage.getItem("user"));

  //     const res = await fetch(
  //       `${this.API_FIREBASE}nomina/empleados.json?auth=${user.idToken}`
  //     );
  //     const data = await res.json();

  //     for (let i in data) {
  //       this.employees.push({
  //         id: i,
  //         data: data[i],
  //       });
  //     }
  //     this.load = false;
  //   },
  // },
  computed: {
    ...mapState("employees", ["employees"])
    // employeesList() {
    //   return this.employees;
    // }
  }
};
</script>

<style scoped>
.icon-size {
  font-size: 1.3rem;
}
</style>