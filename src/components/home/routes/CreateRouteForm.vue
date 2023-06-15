<template>
  <div>
    <h5 class="q-mt-none">Create a Route</h5>
    <q-form class="q-gutter-y-md" ref="form" @submit.prevent="submit">
      <q-select
        dense
        outlined
        :options="providers"
        v-model="selectedProvider"
        :label="selectedProvider === null ? 'Select a provider' : 'Provider'"
        :rules="providerRules"
      />
      <q-input
        :class="selectedProvider === null ? 'hidden' : ''"
        :disable="selectedProvider === null"
        label="Origin"
        dense
        outlined
        v-model="origin"
        :rules="originRules"
      />
      <q-input
        :class="selectedProvider === null ? 'hidden' : ''"
        :disable="selectedProvider === null"
        label="Destination"
        dense
        outlined
        v-model="destination"
        :rules="destinationRules"
      />
      <q-input
        :class="selectedProvider === null ? 'hidden' : ''"
        :disable="selectedProvider === null"
        label="Side Number"
        dense
        outlined
        v-model="sideNumber"
        :rules="sideNumberRules"
      />
      <q-input
        :class="selectedProvider === null ? 'hidden' : ''"
        :disable="selectedProvider === null"
        label="License Plate"
        dense
        outlined
        v-model="licensePlate"
        :rules="licensePlateRules"
      />
      <div class="row justify-end q-gutter-x-lg">
        <q-btn
          class="rounded-border text-capitalize text-weight-regular"
          type="submit"
          unelevated
          color="primary"
          padding="sm lg"
        >
          <q-icon name="mdi-content-save" size="xs" left />
          Save
        </q-btn>
        <q-btn
          class="rounded-border text-capitalize text-weight-regular"
          @click="cancel"
          flat
          color="red"
          padding="sm lg"
        >
          <q-icon name="mdi-close" size="xs" left />
          Cancel
        </q-btn>
      </div>
    </q-form>
  </div>
</template>
<script setup>
import { computed, defineEmits, ref } from 'vue-demi';
import providers from 'assets/data/fake-providers.json';
import {
  providerRules,
  originRules,
  destinationRules,
  sideNumberRules,
  licensePlateRules,
} from 'src/utils/validation-rules/route.js';

const emit = defineEmits(['save', 'cancel']);

const form = ref(null);
const selectedProvider = ref(null);
const origin = ref();
const destination = ref();
const sideNumber = ref();
const licensePlate = ref();

function submit() {
  emit('save', {
    provider: selectedProvider.value,
    origin: origin.value,
    destination: destination.value,
    side_number: sideNumber.value,
    license_plate: licensePlate.value,
  });
}

function cancel() {
  emit('cancel');
}
</script>

<style>
.slide-hide.q-field {
  display: none;
}
</style>
