<template>
  <q-toolbar class="q-px-none">
    <!-- <q-btn @click="toggleDrawer" icon="menu" flat round /> -->
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
  </q-toolbar>
</template>

<script>
import { defineComponent, ref } from 'vue';
import HindekeLogo from 'src/components/brand/HindekeLogo.vue';
import AuthCard from 'src/components/auth/AuthCard.vue';
import LinkMenu from 'src/components/core/menu/LinkMenu.vue';
import menuLinks from 'assets/data/landing-menu.json';

export default defineComponent({
  name: 'AnonymousNavToolbar',
  components: {
    AuthCard,
    HindekeLogo,
    LinkMenu,
  },
  setup() {
    const authDialogLogin = ref(false);
    const authDialogSignup = ref(false);
    const links = ref(menuLinks);

    function openDialog(signupDialog = false) {
      authDialogSignup.value = signupDialog;
      authDialogLogin.value = !signupDialog;
    }

    return {
      authDialogLogin,
      authDialogSignup,
      links,
      openDialog,
    };
  },
});
</script>
