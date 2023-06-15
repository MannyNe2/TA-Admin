import { useSidebarMenuStore } from 'src/stores/menus/sidebar-menu';

export default function setSidebarItems(items) {
  return (to, from, next) => {
    const store = useSidebarMenuStore();
    console.log(items);
    store.setMenuItems(items);
    return next();
  };
}
