<template>
  <h1 class="my-3 text-dark">Percepciones</h1>
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
                  Estas percepciones son importes fijos para todos los
                  empleados, el fondo de ahorro, prima vacacional, horas extras
                  entre otros son de acuerdo a su salario, por lo tanto no
                  pueden ser registrados aquí pero se tomaran en cuenta en la
                  nómina.</small
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
          <Perception
            v-for="(perception, i) in perceptions"
            :key="i"
            :data="perception"
          ></Perception>
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