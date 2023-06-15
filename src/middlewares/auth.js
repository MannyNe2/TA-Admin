import { useIdentityStore } from 'src/stores/identity';

export default function auth(to, from, next) {
  const store = useIdentityStore();
  if (!store.token) {
    if (to.name != 'login') {
      return next({ name: 'login' });
    } else {
      return next();
    }
  }
  return next();
}
