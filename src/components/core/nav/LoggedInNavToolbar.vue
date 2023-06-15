<template>
  <q-toolbar class="text-black">
    <!-- <q-btn @click="toggleDrawer" icon="menu" flat round /> -->
    <q-toolbar-title class="row q-gutter-x-lg">
      <HindekeLogo />
      <q-separator vertical />
      <h6 class="q-my-none text-center text-weight-regular">
        {{ menuStore.title }}
      </h6>
    </q-toolbar-title>
    <q-item clickable class="rounded-borders">
      <q-item-section>
        {{ profile.firstName }} {{ profile.lastName }}
      </q-item-section>
      <q-item section avatar class="q-pr-none">
        <q-avatar color="grey-4">
          <img v-if="profile.avatar" :src="profile.avatar" />
          <span v-else> {{ profile.firstName[0] }} </span>
        </q-avatar>
      </q-item>
      <q-menu anchor="bottom right" self="top right">
        <q-list style="min-width: 200px">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="ti-user" size="xs" />
            </q-item-section>
            <q-item-section>
              <q-item-label> Profile </q-item-label>
              <q-item-label caption> View and edit your profile </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable class="text-red" @click="logout">
            <q-item-section avatar>
              <q-icon name="ti-shift-right" size="xs" />
            </q-item-section>
            <q-item-section>
              <q-item-label> Logout </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-item>
  </q-toolbar>
</template>

<script>
import { useIdentityStore } from 'src/stores/identity';
import { useDashMenuStore } from 'src/stores/dashMenu';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import HindekeLogo from 'src/components/brand/HindekeLogo.vue';

export default defineComponent({
  name: 'LoggedInNavToolbar',
  components: { HindekeLogo },
  setup() {
    const identityStore = useIdentityStore();
    const menuStore = useDashMenuStore();
    const router = useRouter();

    const profile = ref(identityStore.profile);

    function logout() {
      identityStore.logout();
      router.go('/');
    }

    return {
      profile,
      logout,
      menuStore,
    };
  },
});
</script>

<style>
.stuff {
  text-align: center;
}
</style>
