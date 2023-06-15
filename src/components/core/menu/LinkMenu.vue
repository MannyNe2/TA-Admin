<template>
  <div class="row q-gutter-x-sm">
    <span v-for="link in menuLinks" v-bind:key="link">
      <BranchMenuItem
        v-if="link.sub"
        :label="link.label"
        :to="link.to"
        :children="link.sub"
      />
      <LeafMenuItem v-else :label="link.label" :to="link.to" />
    </span>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import BranchMenuItem from './BranchMenuItem.vue';
import LeafMenuItem from './LeafMenuItem.vue';

export default defineComponent({
  name: 'LinkMenu',
  components: { BranchMenuItem, LeafMenuItem },
  props: {
    links: { type: Array, required: true },
  },

  setup(props) {
    const menuLinks = ref(props.links);
    return {
      menuLinks,
    };
  },
});
</script>
