<template>
  <h1 class="my-3 text-dark">Pago de nómina</h1>
  <h5 class="text-start">Emisor</h5>
  <div class="row">
    <div class="col-md-2 text-start">
      <label for="rfc" class="text-start">RFC:</label>
      <!-- <span>CFS9909291H5</span> -->
    </div>
    <div class="col-md-4 text-start">
      <!-- <label for="folio" class="form-label">Folio fiscal:</label> -->
      <!-- <p>e6dbc18f-cf0e-46bc-90b1-a57c6d224bd0</p> -->
      <span class="text-start">CFS9909291H5</span>
    </div>
  </div>
  <div class="row">
    <div class="col-md-2 text-start">
      <!-- <label for="rfc" class="form-label">RFC:</label> -->
      <label for="folio" class="text-start">Folio fiscal:</label>
      <!-- <span>CFS9909291H5</span> -->
      <label for="folio" class="text-start">Fecha y hora de emisión:</label>
    </div>
    <div class="col-md-4 text-start">
      <!-- <label for="folio" class="form-label">Folio fiscal:</label> -->
      <p class="text-start">e6dbc18f-cf0e-46bc-90b1-a57c6d224bd0</p>
      <!-- <span>{{ moment("dddd, MMMM Do YYYY") }}</span> -->
    </div>
  </div>
</template>

<script>
// Vue.use(require("vue-moment"));

export default {
  data() {
    return {
    //   fecha: new Data(),
    };
  },
};
</script>

<style>
</style>