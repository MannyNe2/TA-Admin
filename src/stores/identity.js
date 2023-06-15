import { defineStore } from 'pinia';
import storage from 'store';
import { fakeLoginEndpoint } from 'src/services/fake-auth';

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

    async login(credentials) {
      this.clear();
      // TODO: Call login endpoint here
      try {
        const response = await fakeLoginEndpoint(credentials);
        this.setToken(response.accessToken);
        this.setProfile(response.user);
        this.setRoles(response.roles);
        return {
          success: true,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
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
