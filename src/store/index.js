import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    allUsers: [
      {
        id: 1,
        name: "junsoo",
        email: "junsoo@dssc.mil.kr",
        password: "1234",
      },
      {
        id: 1,
        name: "junsoo",
        email: "wooodmon@naver.com",
        password: "1234",
      },
    ],
    isLogin: false,
    isLoginError: false,
  },
  mutations: {
    //로그인 성공
    loginSuceess(state, payload) {
      state.isLogin = true;
      state.isLoginError = false;
      state.userInfo = payload;
    },
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    },
    //로그인 실패
  }, //state 상태값 변경
  actions: {
    //로그인 시도
    login({ state, commit }, loginObj) {
      let selectedUser = null;
      state.allUsers.forEach((user) => {
        if (user.email == loginObj.email) selectedUser = user;
      });
      if (selectedUser === null || selectedUser.password !== loginObj.password)
        commit("loginError");
      else {
        commit("loginSuceess", selectedUser);
        router.push({ name: "mypage" });
      }
    },
    logout({ commit }) {
      commit("logout");
      router.push({ name: "home" });
    },
  }, // 비지니스 로직
  modules: {},
});
