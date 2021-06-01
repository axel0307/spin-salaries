<template>
  <tr>
    <th scope="row">{{ data.data.clave }}</th>
    <td>{{ data.data.nombre }}</td>
    <td>{{ data.data.importe.toFixed(2) }}</td>
    <td>
      <router-link
        class="link-dark"
        :to="`/dashboard/editperception/${data.id}`"
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