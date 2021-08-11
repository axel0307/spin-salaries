// import Vue from "vue";
import { createStore } from "vuex";
// Importamos los modulos para Vuex
import user from "./user";
import employees from "./employees";
// Importamos el auth de firebase
import { auth } from "../firebase/firebase-config";

// Vue.use(Vuex);

const store = createStore({
  state: {
    isLoading: true
  },
  mutations: {
    setLoading(state, loading) {
      state.isLoading = loading;
    }
  },
  actions: {
    // Checamos lo autentificación
    checkAuth({ commit, dispatch }) {
      // Para mantener el state de autenticado, usamos el método onAuthStateChanged
      auth.onAuthStateChanged(async function(user) {
        // Si existe el usuario entonces que haga el commit con el user
        if (user) {
          commit("user/setUser", user);
          try {
            await dispatch("employees/getEmployees");
          } catch (error) {
            console.log(error);
          }
        } else {
          commit("user/setUser", null);

          commit("employees/setEmployees", []);
          commit("employees/setEmployeesListener", null);
        }
      });
    }
  },
  modules: {
    user,
    employees
  }
});

export default store;

// Initial load
store.dispatch("checkAuth"); // Hacemos el dispatch de la action checkAuth
