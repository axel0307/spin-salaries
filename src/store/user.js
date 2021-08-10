import { auth, db, fb } from "../firebase/firebase-config";

const state = {
  user: null
  // metadato, se guardará la información del usuario para saber cuando se conecto, sabiendo la última conexión y en que parte esta conectado
};

const getters = {
  getUserUid(state) {
    if (state.user) {
      return state.user.uid;
    } else {
      return state.user;
    }
  }
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
  async updateProfile({ commit, state }, { name, email, password }) {
    const user = auth.currentUser;

    if (name) {
      await user.updateProfile({
        displayName: name
      });

      db.runTransaction(async transaction => {
        const query = await db
          .collectionGroup("messages")
          .where("userId", "==", state.user.uid)
          .get();

        query.forEach(doc => {
          transaction.update(doc.ref, { userName: name });
        });
      });
    }

    if (email) {
      await user.updateEmail(email);
    }

    if (password) {
      await user.updatePassword(password);
    }

    commit("setUser", user);
  },
  async doLogin({ commit }, { email, password }) {
    await auth.signInWithEmailAndPassword(email, password);
    commit("setUser", auth.currentUser);
    // currentUser será null si no hay nadie autenticado, por lo tanto cuando se identifica currentUser es la información
    // del usuario autenticado
  },
  async doRegister({ commit }, { name, email, password }) {
    await auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser;
    // Con updateProfile podemos acceder a las propiedades del user, en este caso le pasamos el name del formulario
    await user.updateProfile({
      displayName: name
    });
    commit("setUser", user);
  },
  async doLogout({ commit }) {
    await auth.signOut();
    // commit("setUser", null);
    commit("messages/setMessagesListener", null, { root: true });
    commit("rooms/setRoomsListener", null, { root: true });
    commit("setUserListener", null);
  },
  async doReset(context, email) {
    await auth.sendPasswordResetEmail(email);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
