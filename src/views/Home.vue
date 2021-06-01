<template>
  <Header></Header>
  <Form class="pb-5"></Form>
</template>

<script>
// @ is an alias to /src
import Form from "@/components/Form.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Form,
    Header,
  },
};
</script>

