<template>
  <h1 class="my-3 text-dark">Puestos de trabajo</h1>
  <div class="mx-auto">
    <div class="table-responsive mx-md-5">
      <table
        class="
          table table-responsive-sm table-bordered table-striped table-hover
        "
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