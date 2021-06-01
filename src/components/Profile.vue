<template>
  <div class="d-flex align-items-center pt-sm-2 pt-lg-5">
    <div class="col-6 d-none d-lg-flex ps-5">
      <img
        src="../../src/assets/img/undraw_growing.svg"
        class="img-fluid"
        alt="imageLogin"
      />
    </div>
    <div class="col-auto col-lg-4 mx-auto">
      <div class="row d-lg-none text-dark">
        <img
          src="../../src/assets/img/group.svg"
          class="img-fluid py-2"
          alt="imageLogin"
        />
      </div>
      <h1 class="fw-bold text-danger">Hola {{ usuario }}</h1>
      <h1 class="text-dark">Es bueno verte de nuevo</h1>
      <p class="text-muted">
        <small>Recuerda que puedes navegar entre las diferentes opciones</small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    usuario: "Axel",
  }),
};
</script>

<style>
.icon-user {
  font-size: 8rem;
}
h1 {
  font-family: "Farro-Medium", sans-serif;
}

h5 {
  font-family: "Farro-Light", sans-serif;
}
</style>