<template>
  <q-card flat class="bg-transparent">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-card-section>
        <h4 class="text-weight-light text-center text-primary q-my-none">
          Welcome back!
        </h4>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <!-- TODO: Inupt validation rules -->
        <q-input
          outlined
          v-model="email"
          label="Email, Phone, or Username"
          class="rounded-borders"
          :rules="[(val) => !!val || 'Email, phone, or username required']"
        >
          <template v-slot:prepend>
            <q-icon left size="xs" name="fa-solid fa-user" />
          </template>
        </q-input>
        <q-input
          outlined
          v-model="password"
          label="Password"
          type="password"
          class="rounded-borders"
          :rules="[(val) => !!val || 'Password required']"
        >
          <template v-slot:prepend>
            <q-icon left size="xs" name="fa-solid fa-key" />
          </template>
        </q-input>
        <div class="row justify-center">
          <div class="col-auto q-pr-sm">
            <q-checkbox
              v-model="stayLoggedIn"
              label="Remember me on this device"
              checked-icon="fa-solid fa-circle-check"
              unchecked-icon="fa-regular fa-circle"
              class="text-subtitle2 text-grey-7"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-btn
          type="submit"
          label="Login"
          color="primary"
          size="lg"
          unelevated
          class="text-capitalize text-body2 rounded-borders"
          padding="md xl"
        />
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

import { useIdentityStore } from 'src/stores/identity';

export default defineComponent({
  name: 'LoginCard',
  emits: ['select-signup'],
  setup(_, ctx) {
    const router = useRouter();

    const email = ref(null);
    const password = ref(null);
    const stayLoggedIn = ref(false);

    const store = useIdentityStore();

    async function onSubmit() {
      const loginStatus = await store.login({
        email: email.value,
        password: password.value,
      });
      if (loginStatus.success) {
        Notify.create({
          message: 'User logged in',
          type: 'positive',
        });
        router.push('/');
      } else {
        Notify.create({
          message: loginStatus.message,
          type: 'negative',
        });
      }
    }

    function selectSignup() {
      ctx.emit('select-signup');
    }

    return {
      email,
      password,
      stayLoggedIn,
      onSubmit,
      selectSignup,
    };
  },
});
</script>
