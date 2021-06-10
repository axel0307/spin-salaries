<template>
  <h1 class="my-3 text-dark">Deducciones</h1>
  <div class="mx-auto">
    <div class="table-responsive mx-md-5">
      <table
        class="table  table-responsive-sm caption-top table-bordered table-striped table-hover"
      >
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
          <!-- <tr>
            <th scope="row">1</th>
            <td>43S4S</td>
            <td>IMSS</td>
            <td>$100</td>
            <td><i class="mx-1 align-middle bi bi-pencil"></i></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>54S7S</td>
            <td>ISR</td>
            <td>$1000</td>
            <td><i class="mx-1 align-middle bi bi-pencil"></i></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>56S3S</td>
            <td>Infonavit</td>
            <td>$1000</td>
            <td><i class="mx-1 align-middle bi bi-pencil"></i></td>
          </tr> -->
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