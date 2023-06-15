<template>
  <router-link class="col col-auto row justify-center" to="/">
    <img
      v-if="light || isDark"
      fetchpriority="high"
      draggable="false"
      alt="Hindeke logo white"
      src="/images/logo/logo-white.png"
      :height="`${imgHeight}`"
    />
    <img
      v-else
      fetchpriority="high"
      draggable="false"
      alt="Hindeke logo black"
      src="/images/logo/logo-black.png"
      :height="`${imgHeight}`"
    />
  </router-link>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'HindekeLogo',
  props: {
    size: String,
    light: Boolean,
    dark: Boolean,
  },
  setup(props) {
    const $q = useQuasar();

    const isDark = computed(() => {
      return $q.dark.isActive;
    });

    const imgHeight = computed(() => {
      if (props.size === 'sm') {
        return 16;
      } else if (props.size === 'lg') {
        return 64;
      } else if (props.size === 'xl') {
        return 96;
      } else {
        return 32;
      }
    });

    return {
      isDark,
      imgHeight,
    };
  },
});
</script>
