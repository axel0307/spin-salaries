<template>
  <tr>
    <th class="align-middle" scope="row">{{ data.clave }}</th>
    <td class="align-middle">
      {{ data.nombre + " " + data.pApellido + " " + data.sApellido }}
    </td>
    <td class="align-middle">{{ data.trabajo.area }}</td>
    <td class="align-middle">{{ data.trabajo.nombre }}</td>
    <td class="align-middle">{{ data.trabajo.salario }}</td>
    <td class="align-middle">{{ data.clase }}</td>
    <td class="align-middle">
      <router-link
        class="link-primary"
        :to="`/dashboard/editemployee/${data.id}`"
        ><i class="mx-1 my-auto icon-size fw-bold align-right bi bi-pen"></i
      ></router-link>
      <router-link
        v-if="data.status == true || data.status == 'true'"
        class="link-success"
        :to="`/dashboard/payment/${data.id}`"
        ><i
          style="font-size: 1.5rem"
          class="mx-1 my-auto icon-size-g fw-bold align-left bi bi-piggy-bank"
        ></i
      ></router-link>
      <router-link
        v-if="data.status == true || data.status == 'true'"
        class="link-danger"
        :to="`/dashboard/liquidate`"
        ><i
          class="mx-1 my-auto icon-size fw-bold align-left bi bi-door-open"
        ></i
      ></router-link>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style scoped>
.icon-size {
  font-size: 1.3rem;
}

.icon-size-g {
  font-size: 1.5rem;
}
</style>