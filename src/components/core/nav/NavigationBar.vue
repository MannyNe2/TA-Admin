<template>
  <q-header
    :class="`row justify-center q-pa-sm q-gutter-y-sm backdrop-blur-md ${headerBackgroundColorClass}`"
  >
    <div :class="`col col-8 q-px-none ${headerForegroundColorClass}`">
      <LoggedInNavToolbar v-if="isLoggedIn" />
      <AnonymousNavToolbar v-else />

      <!-- <q-toolbar :class="`${headerForegroundColorClass} q-px-none`">
        <q-btn @click="toggleDrawer" icon="menu" flat round />
        <q-toolbar-title class="row q-gutter-x-lg items-center">
          <HindekeLogo />
          <LinkMenu :links="links" />
        </q-toolbar-title>
        <div class="q-gutter-sm row">
          <q-btn
            label="Sign In"
            class="text-capitalize"
            flat
            @click="openDialog(false)"
          />
          <q-btn
            label="Create an account"
            class="text-capitalize rounded rounded-md"
            color="primary"
            unelevated
            outline
            @click="openDialog(true)"
          />
          <q-dialog
            transition-show="jump-down"
            transition-hide="jump-up"
            v-model="authDialogLogin"
            position="top"
          >
            <AuthCard />
          </q-dialog>
          <q-dialog
            transition-show="jump-down"
            transition-hide="jump-up"
            v-model="authDialogSignup"
            position="top"
          >
            <AuthCard :startSignup="true" />
          </q-dialog>
        </div>
      </q-toolbar> -->
    </div>
    <!-- <q-drawer
      v-model="drawer"
      overlay
      transition-show="jump-right"
      transition-hide="jump-left"
    >
      <q-layout view="hHh lpr fFf" container style="height: 100%">
        <q-header
          :class="`${headerForegroundColorClass} backdrop-blur-md ${headerBackgroundColorClass}`"
          :elevated="false"
        >
          <q-toolbar class="row justify-end q-pa-sm">
            <q-btn @click="toggleDrawer" icon="chevron_left" flat round />
          </q-toolbar>
        </q-header>
        <q-page-container>
          <q-list>
            <q-item v-for="num in 100" v-bind:key="num">
              <q-item-section> Hello x{{ num }} </q-item-section>
            </q-item>
          </q-list>
        </q-page-container>
      </q-layout>
    </q-drawer> -->
  </q-header>
</template>
<script>
import { ref, computed, defineComponent, inject } from 'vue';
import { useIdentityStore } from 'src/stores/identity';
import AnonymousNavToolbar from 'src/components/core/nav/AnonymousNavToolbar.vue';
import LoggedInNavToolbar from 'src/components/core/nav/LoggedInNavToolbar.vue';

export default defineComponent({
  name: 'NavigationBar',
  props: {
    lightBackground: { type: String, default: 'bg-translucent' },
    darkBackground: { type: String, default: 'bg-dark-translucent' },
  },
  components: { AnonymousNavToolbar, LoggedInNavToolbar },
  setup(props) {
    const identityStore = useIdentityStore();
    const drawer = ref(false);

    const $q = inject('quasar');
    const isLoggedIn = computed(
      () => identityStore.token && identityStore.profile
    );

    const headerBackgroundColorClass = computed(() => {
      return $q.dark.isActive ? props.darkBackground : props.lightBackground;
    });
    const headerForegroundColorClass = computed(() => {
      return $q.dark.isActive ? 'text-white' : 'text-black';
    });

    return {
      drawer,
      headerBackgroundColorClass,
      headerForegroundColorClass,
      isLoggedIn,

      toggleDrawer() {
        drawer.value = !drawer.value;
      },
    };
  },
});
</script>
