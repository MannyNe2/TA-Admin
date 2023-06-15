<template>
  <q-page class="q-px-xl q-py-lg column">
    <h4 class="q-my-none text-weight-bold">Providers</h4>
    <div class="col row justify-center items-center text-center">
      <UnderConstruction />
    </div>
  </q-page>
</template>

<script setup>
import { useDashMenuStore } from 'src/stores/dashMenu';
import { onMounted } from 'vue-demi';
import UnderConstruction from 'src/components/core/misc/UnderConstruction.vue';

const dashMenuStore = useDashMenuStore();

onMounted(() => {
  dashMenuStore.setCurrentTitle('Providers');
});
</script>

<style>
</style>
