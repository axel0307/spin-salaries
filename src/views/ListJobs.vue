<template>
  <h1 class="my-3 text-dark">Puestos de trabajo</h1>
  <div class="mx-auto">
    <div class="table-responsive mx-md-5">
      <table
        class="table table-responsive-sm table-bordered table-striped table-hover"
      >
        <thead>
          <tr>
            <th scope="col">Clave</th>
            <th scope="col">Área</th>
            <th scope="col">Nombre</th>
            <th scope="col">Salario Diario</th>
            <th scope="col">Salario Semanal</th>
            <th scope="col">Salario Quincenal</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <Job v-for="(job, i) in jobs" :key="i" :data="job"></Job>
          <!-- <tr>
            <th scope="row">1</th>
            <td>43S4S</td>
            <td>Construcción Civil</td>
            <td>Arquitecto</td>
            <td>5.00</td>
            <td>500</td>
            <td>5000</td>
            <td><i class="mx-1 align-middle bi bi-pencil"></i></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>54S7S</td>
            <td>Recursos Humanos</td>
            <td>Secretaria</td>
            <td>10.00</td>
            <td>1000</td>
            <td>10000</td>
            <td><i class="mx-1 align-middle bi bi-pencil"></i></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>56S3S</td>
            <td>Relaciones Públicas</td>
            <td>Administrador</td>
            <td>7.00</td>
            <td>700</td>
            <td>7000</td>
            <td><i class="mx-1 align-middle bi bi-pencil"></i></td>
          </tr> -->
        </tbody>
      </table>
      <Loading class="mx-auto" v-if="load"></Loading>
    </div>
  </div>
</template>

<script>
import Job from "../components/Job.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "ListJobs",
  components: { Loading, Job },
  data: () => ({
    API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
    jobs: [],
    load: false,
  }),
  mounted() {
    this.getJobs();
  },
  methods: {
    async getJobs() {
      this.load = true;
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/trabajos.json?auth=${user.idToken}`
      );
      const data = await res.json();

      for (let i in data) {
        this.jobs.push({
          id: i,
          data: data[i],
        });
      }
      this.load = false;
    },
  },
};
</script>