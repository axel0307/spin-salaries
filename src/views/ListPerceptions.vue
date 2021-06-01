<template>
  <h1 class="my-3 text-dark">Percepciones</h1>
  <div class="mx-auto">
    <div class="table-responsive mx-md-5">
      <table
        class="table table-responsive-sm caption-top table-bordered table-striped table-hover"
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
          <Perception
            v-for="(perception, i) in perceptions"
            :key="i"
            :data="perception"
          ></Perception>
          <!-- <tr>
            <th scope="row">1</th>
            <td>43S4S</td>
            <td>Horas extras</td>
            <td>$100</td>
            <td><i class="mx-1 align-middle bi bi-pencil"></i></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>54S7S</td>
            <td>Vales de despensa</td>
            <td>$1000</td>
            <td><i class="mx-1 align-middle bi bi-pencil"></i></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>56S3S</td>
            <td>Bono de productividad</td>
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
import Loading from "../components/Loading.vue";
import Perception from "../components/Perception.vue";
export default {
  name: "ListPerceptions",
  components: { Loading, Perception },
  data: () => ({
    API_FIREBASE: process.env.VUE_APP_API_FIREBASE,
    perceptions: [],
    load: false,
  }),
  mounted() {
    this.getPerceptions();
  },
  methods: {
    async getPerceptions() {
      this.load = true;
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(
        `${this.API_FIREBASE}nomina/percepciones.json?auth=${user.idToken}`
      );
      const data = await res.json();

      for (let i in data) {
        this.perceptions.push({
          id: i,
          data: data[i],
        });
      }
      this.load = false;
    },
  },
};
</script>