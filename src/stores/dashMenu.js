import { defineStore } from 'pinia';

export const useDashMenuStore = defineStore('dashMenu', {
  state: () => ({
    currentTitle: null,
    currentIcon: null,
  }),
  getters: {
    title(state) {
      return state.currentTitle;
    },
    icon(state) {
      return state.icon;
    },
  },
  actions: {
    setCurrentTitle(title) {
      this.currentTitle = title;
    },
    setCurrentIcon(icon) {
      this.currentIcon = icon;
    },
  },
});
