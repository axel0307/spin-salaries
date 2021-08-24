<template>
  <div class="container">
    <Toast />
    <div class="pt-4 row">
      <div class="col-8 d-none d-lg-flex">
        <img
          src="../../src/assets/img/undraw_login.svg"
          class="img-fluid"
          alt="imageLogin"
        />
      </div>

      <div class="col-auto mx-auto col-lg-4">
        <div class="pt-3">
          <Card>
            <template #header>
              <img
                src="../../src/assets/img/spin-salaries.svg"
                class="p-2 mx-auto img-fluid d-flex"
                style="max-width: 6rem"
                alt="logo"
              />
            </template>
            <template #title>
              <h3 class="p-text-center text-danger">Iniciar Sesión</h3>
            </template>
            <template #content>
              <form
                @submit.prevent="handleSubmit(!v$.$invalid)"
                class="text-start"
              >
                <div class="p-fluid">
                  <div class="p-field mt-0 m-3">
                    <label
                      for="email"
                      :class="{ 'p-error': v$.email.$invalid && submitted }"
                      >Email</label
                    >
                    <span class="p-input-icon-right">
                      <i class="pi pi-envelope" />
                      <InputText
                        id="email"
                        v-model="v$.email.$model"
                        :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                      />
                    </span>
                    <span v-if="v$.email.$error && submitted">
                      <span
                        id="email-error"
                        v-for="(error, index) of v$.email.$errors"
                        :key="index"
                      >
                        <small class="p-error">{{ error.$message }}</small>
                      </span>
                    </span>
                    <small
                      v-else-if="
                        (v$.email.$invalid && submitted) ||
                        v$.email.$pending.$response
                      "
                      class="p-error"
                      >{{
                        v$.email.required.$message.replace("Value", "Email")
                      }}</small
                    >
                  </div>
                  <div class="p-field m-3">
                    <label
                      for="password"
                      :class="{
                        'p-error': v$.password.$invalid && submitted
                      }"
                      >Password</label
                    >
                    <span class="p-input-icon-right">
                      <i class="pi pi-unlock" />
                      <Password
                        id="password"
                        v-model="v$.password.$model"
                        :class="{
                          'p-invalid': v$.password.$invalid && submitted
                        }"
                        :feedback="feed"
                      />
                    </span>
                    <small
                      v-if="
                        (v$.password.$invalid && submitted) ||
                        v$.password.$pending.$response
                      "
                      class="p-error"
                      >{{
                        v$.password.required.$message.replace(
                          "Value",
                          "Password"
                        )
                      }}</small
                    >
                  </div>
                </div>
                <div class="text-center">
                  <Button
                    type="submit"
                    label="Entrar"
                    class="p-button-sm p-button-info my-3"
                  />
                </div>
              </form>
            </template>
          </Card>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    // API_KEY: process.env.VUE_APP_API_TOOL_KIT,
    // URL_API: process.env.VUE_APP_URL_GOOGLEAPIS,
    email: "",
    password: "",
    submitted: false,
    feed: false
  }),
  validations() {
    return {
      email: {
        required,
        email
      },
      password: {
        required
      }
    };
  },
  methods: {
    async doLogin() {
      try {
        await this.$store.dispatch("user/doLogin", {
          email: this.email,
          password: this.password
        });
        // localStorage.setItem("user", JSON.stringify(email));
        this.$router.push({ name: "Welcome" });
        this.$toast.add({
          severity: "success",
          summary: "Bienvenido(a)",
          life: 3000
        });
        // router.push("/dashboard/welcome");
      } catch (error) {
        console.log(error.message);
        this.$toast.add({
          severity: "error",
          detail: error.message,
          life: 5000
        });
      }
    },

    handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }
      this.doLogin();
    }
  }
};
</script>

<style scoped>
.icon-size {
  font-size: 1.2rem;
}

h1 {
  font-family: "Farro-Medium", sans-serif;
}
</style>