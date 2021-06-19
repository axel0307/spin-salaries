<template>
  <h1 class="my-3 text-dark">Deducciones</h1>
  <div class="mx-auto">
    <div class="table-responsive mx-md-5">
      <table
        class="table  caption-top table-responsive-sm table-bordered table-striped table-hover"
      >
        <caption>
          <div class="text-center col-md-12">
            <div
              class="border-0 alert alert-primary d-flex align-items-center"
              role="alert"
            >
              <div class="text-center align-middle">
                <i class="bi bi-info-circle-fill icon-size"></i>
                <small>
                  Estas deducciones son importes fijos para todos los empleados,
                  el ISR, IMSS y el Infonavit son de acuerdo a su salario, por
                  lo tanto no pueden ser registrados aquí pero se tomaran en
                  cuenta en la nómina.</small
                >
              </div>
            </div>
          </div>
        </caption>
        <thead>
          <tr>
            <th scope="col">Clave</th>
            <th scope="col">Nombre</th>
            <th scope="col">Importe</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <Deduction
            v-for="(deduction, i) in deductions"
            :key="i"
            :data="deduction"
          ></Deduction>
        </tbody>
      </table>
      <Loading class="mx-auto" v-if="load"></Loading>
    </div>
  </div>
</template>

<script>
import Deduction from "../components/Deduction.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "ListDeductions",
  components: { Loading, Deduction },
  data: () => ({
    API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
    deductions: [],
    load: false,
  }),
  mounted() {
    this.getDeductions();
  },
  methods: {
    async getDeductions() {
      this.load = true;
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
      }
      this.load = false;
    },
  },
};
</script>

<style>
.icon-size {
  font-size: 1.2rem;
}
</style>