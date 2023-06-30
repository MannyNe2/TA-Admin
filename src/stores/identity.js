import { defineStore } from 'pinia';
import storage from 'store';
import { fakeLoginEndpoint } from 'src/services/fake-auth';
import { hindekeClient } from 'src/config/apollo';
import signIn from 'src/queries/signIn.gql';
import { Notify } from 'quasar';

export const useIdentityStore = defineStore('identity', {
  state: () => ({
    accessToken: null,
    userProfile: null,
    userRoles: [],
  }),
  getters: {
    // FIXME: Mutation in a getter may not be allowed
    token(state) {
      if (!state.accessToken) {
        state.accessToken = storage.get('token');
      }
      return state.accessToken;
    },
    profile(state) {
      if (!state.userProfile) {
        state.userProfile = storage.get('profile');
      }
      return state.userProfile;
    },
    roles(state) {
      if (!state.userRoles) {
        state.userRoles = storage.get('roles');
      }
      return state.userRoles;
    },
  },
  actions: {
    // TODO: CRITICAL: Find a good way to store tokens
    setToken(token) {
      this.accessToken = token;
      storage.set('token', token);
    },
    setProfile(profile) {
      this.userProfile = profile;
      storage.set('profile', profile);
    },
    setRoles(roles) {
      this.userRoles = roles;
      storage.set('roles', roles);
    },
    clear() {
      this.accessToken = this.userProfile = null;
      this.userRoles = [];
      // TODO: Delete token and data from storage
      storage.remove('token');
      storage.remove('profile');
      storage.remove('roles');
    },

    async login(address, password) {
      // TODO: Call login endpoint here
      try {
        const res = await hindekeClient
          .query({
            query: signIn,
            variables: {
              address: address,
              password: password,
            },
          })
          .then(({ data }) => data && data.signIn);
        if (res) {
          console.log(res);
          const user = {
            firstName: res.firstName,
            lastName: res.lastName,
            middleName: res.middleName,
            phone: res.phone,
            userId: res.userId,
          };
          try {
            this.setToken(res.accessToken);
            this.setProfile(user);
            this.setRoles(res.role);
            Notify.create({
              message: 'User logged in',
              type: 'positive',
            });
            this.router.push('/');
          } catch (error) {
            console.error(error);
          }
        }
        //router.push('/home');
      } catch (error) {
        return error;
      }
    },

    async signup(user) {
      // TODO: Call signup endpoint here
    },

    async logout() {
      this.clear();
    },

    async refresh() {
      // TODO: Implement token refresh
    },
  },
});
