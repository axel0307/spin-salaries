import { auth } from "../firebase/firebase-config";

const state = {
  user: null
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

const actions = {
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(
        user => {
          unsubscribe();
          resolve(user);
        },
        () => {
          reject();
        }
      );
    });
  },
  async doLogin({ commit }, { email, password }) {
    await auth.signInWithEmailAndPassword(email, password);
    commit("setUser", auth.currentUser);
    // currentUser será null si no hay nadie autenticado, por lo tanto cuando se identifica currentUser es la información
    // del usuario autenticado
  },
  async doLogout({ commit }) {
    await auth.signOut();
    commit("setUser", null);
    // commit("messages/setMessagesListener", null, { root: true });
    // commit("rooms/setRoomsListener", null, { root: true });
    // commit("setUserListener", null);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
