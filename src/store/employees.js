import { db } from "../firebase/firebase-config";

const state = {
  employees: {},
  employeesListener: () => {}
};

const getters = {
  employeesGet() {
    return state.employees;
  }
  // getUserUid(state) {
  //   if (state.user) {
  //     return state.user.uid;
  //   } else {
  //     return state.user;
  //   }
  // }
};

const mutations = {
  // setUser(state, user) {
  //   state.user = user;
  // }
  setEmployeesListener(state, listener) {
    if (listener) {
      state.employeesListener = listener;
    } else {
      state.employeesListener();
    }
  },
  setEmployees(state, employees) {
    state.employees = employees;
  }
};

const actions = {
  async getEmployees({ commit }) {
    const employees = db.ref("nomina/empleados");
    employees.on("value", snapshot => {
      const dataEmployees = snapshot.val();
      console.log(dataEmployees);
      commit("setEmployees", dataEmployees);
    });
    // employees.child('empleados').

    //   .get()
    //   .then(snapshot => {
    //     if (snapshot.exists()) {
    //       dataEmployees = snapshot.val();
    //       console.log(dateEmployees);
    //       commit("setEmployeesListener", dataEmployees);
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
