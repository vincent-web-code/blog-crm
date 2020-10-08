import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categoryPage: null,
    categorySize: null,
    adminUserPage: null,
    adminUserSize: null,
    articlePage: null,
    articleSize: null
  },
  mutations: {
    SET_CATEGRORY_PAGE(state: any, data: number): void {
      state.categoryPage = data
    },

    SET_CATEGRORY_SIZE(state: any, data: number): void {
      state.categorySize = data
    },

    SET_ARTICLE_PAGE(state: any, data: number): void {
      state.articlePage = data
    },

    SET_ARTICLE_SIZE(state: any, data: number): void {
      state.articleSize = data
    },

    SET_ADMINUSER_PAGE(state: any, data: number): void {
      state.adminUserPage = data
    },

    SET_ADMINUSER_SIZE(state: any, data: number): void {
      state.adminUserSize = data
    },
    

    
  },
  actions: {},
  modules: {}
});
