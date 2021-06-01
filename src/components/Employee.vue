<template>
  <tr>
    <th scope="row">{{ data.data.clave }}</th>
    <td>
      {{
        data.data.nombre + " " + data.data.pApellido + " " + data.data.sApellido
      }}
    </td>
    <td>{{ data.data.trabajo.area }}</td>
    <td>{{ data.data.trabajo.nombre }}</td>
    <td>{{ data.data.trabajo.salario }}</td>
    <td>{{ data.data.clase }}</td>
    <td>
      <router-link class="link-dark" :to="`/dashboard/editemployee/${data.id}`"
        ><i class="bi bi-pencil align-middle mx-1"></i
      ></router-link>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>