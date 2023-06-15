<template>
  <q-page class="row justify-center items-center text-center">
    <UnderConstruction />
  </q-page>
</template>

<script setup>
import { useDashMenuStore } from 'src/stores/dashMenu';
import { onMounted } from 'vue-demi';
import UnderConstruction from 'src/components/core/misc/UnderConstruction.vue';

const dashMenuStore = useDashMenuStore();

onMounted(() => {
  dashMenuStore.setCurrentTitle(null);
});
</script>

<style>
</style>
