// import Vue from "vue";
import { createStore } from "vuex";
// Importamos los modulos para Vuex
import user from "./user";
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
    checkAuth({ commit }) {
      // Para mantener el state de autenticado, usamos el método onAuthStateChanged
      auth.onAuthStateChanged(async function(user) {
        // Si existe el usuario entonces que haga el commit con el user
        if (user) {
          commit("user/setUser", user);
        } else {
          commit("user/setUser", null);
        }
      });
    }
  },
  modules: {
    user
  }
});

export default store;

// Initial load
store.dispatch("checkAuth"); // Hacemos el dispatch de la action checkAuth
