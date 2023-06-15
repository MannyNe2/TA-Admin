<template>
  <q-item class="text-subtitle2 rounded-md" clickable :to="to">
    <q-item-section>{{ label }}</q-item-section>
  </q-item>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LeafMenuItem',
  props: {
    label: { type: String, required: true },
    to: { type: String, required: true },
    icon: { type: String, default: null },
    isNested: { type: Boolean, default: false },

    setup() {
      return {
        label,
        to,
        icon,
        isNested,
      };
    },
  },
});
</script>
