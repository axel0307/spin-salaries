<template>
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light"
      aria-label="Main navigation"
    >
      <div class="container-fluid">
        <div class="navbar-brand unexpected font-header align-middle">
          Spin Salaries
          <div class="lds-circle align-middle"><div></div></div>
        </div>
        <slot></slot>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Animación del Spinner */

.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
}
.lds-circle > div {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 1px;
  border-radius: 50%;
  background: #f45e61;
  animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
@keyframes lds-circle {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}

/* Fuente de logo */
.font-header {
  font-family: "Rubik", sans-serif;
}

/*Ultimo */
.unexpected {
  display: inline-block;
  vertical-align: middle;
  font-size: 1.25rem;
  font-family: "Rubik", sans-serif;
  margin: 10px;
  cursor: pointer;
  padding: 4px;
  border: 0.125rem solid;
  outline: 0.125rem solid #0000;
  outline-offset: 100px;
  transition: 0s;
}
.unexpected:hover {
  outline-offset: -0.125rem;
  border-color: #0000;
  outline-color: currentColor;
  transition: 0.5s;
}
</style>