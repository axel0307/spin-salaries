<template>
  <tr>
    <th scope="row">{{ data.data.clave }}</th>
    <td>{{ data.data.area }}</td>
    <td>{{ data.data.nombre }}</td>
    <td>{{ data.data.salario }}</td>
    <td>{{ (data.data.salario * 7).toFixed(2) }}</td>
    <td>{{ (data.data.salario * 15).toFixed(2) }}</td>
    <td>
      <router-link class="link-dark" :to="`/dashboard/editjob/${data.id}`"
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
