import { defineStore } from 'pinia';

export const useSidebarMenuStore = defineStore('sidebarmenu', {
  state: () => ({
    sidebarMenuItems: null,
  }),
  getters: {
    menuItems(state) {
      return state.sidebarMenuItems;
    },
  },
  actions: {
    setMenuItems(menuItems) {
      this.sidebarMenuItems = menuItems;
    },
  },
});
