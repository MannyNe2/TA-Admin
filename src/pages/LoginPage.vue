<template>
  <!-- <div class="full-height row bg-red">
    <div class="q-col col-6 bg-primary">
      <h1 class="text-white text-center">Hindeke Admin Panel</h1>
    </div>
    <div class="q-col col-6">some</div>
  </div> -->
  <q-page>
    <div class="row fixed-full">
      <div class="col-6 bg-primary text-white text-center row items-center">
        <div class="col q-px-xl">
          <!-- <h1 class="q-my-none text-weight-bold">Hindeke</h1> -->
          <HindekeLogo size="lg" :light="true" />
          <q-separator
            color="white"
            class="q-mt-lg q-mb-lg"
            style="opacity: 20%"
          />
          <h5 class="q-my-none text-weight-thin">Administrator Dashboard</h5>
        </div>
      </div>
      <div class="col-6 q-px-lg row justify-center items-center">
        <div style="width: 400px">
          <LoginCard />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import HindekeLogo from 'src/components/brand/HindekeLogo.vue';
import LoginCard from 'src/components/auth/LoginCard.vue';
export default { components: { HindekeLogo, LoginCard } };
</script>

<style>
</style>
