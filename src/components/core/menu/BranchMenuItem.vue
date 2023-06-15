<template>
  <q-item
    clickable
    :to="to"
    class="q-py-none text-subtitle2"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    :manual-focus="true"
    :focused="menu"
  >
    <q-item-section>{{ label }}</q-item-section>
    <q-menu
      v-model="menu"
      :anchor="isNested ? 'top end' : 'bottom start'"
      :transition-show="isNested ? 'jump-right' : 'jump-down'"
      :transition-hide="isNested ? 'jump-left' : 'jump-up'"
      @hide="onMenuClose"
    >
      <q-list>
        <span v-for="child in children" v-bind:key="child">
          <BranchMenuItem
            v-if="child.sub"
            :label="child.label"
            :to="child.to"
            :children="child.sub"
            :isNested="true"
            @mouseenter="setChildActive"
            @mouseleave="setChildInactive"
            @closed="
              () => {
                setChildInactive();
                onMouseLeave(0);
              }
            "
          />
          <LeafMenuItem
            v-else
            :label="child.label"
            :to="child.to"
            @mouseenter="setChildActive"
            @mouseleave="
              () => {
                setChildInactive();
                onMouseLeave();
              }
            "
          />
        </span>
      </q-list>
    </q-menu>
    <q-item-section avatar v-if="isNested">
      <q-icon right name="ti-angle-right" size="16px" />
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent, ref } from 'vue';
import LeafMenuItem from './LeafMenuItem.vue';

export default defineComponent({
  name: 'BranchMenuItem',
  props: {
    label: { type: String, required: true },
    to: { type: String, required: true },
    icon: { type: String, default: null },
    children: { type: Array, required: true },
    isNested: { type: Boolean, default: false },
  },
  emits: ['closed'],
  setup(_, ctx) {
    const menu = ref(false);

    const isChildActive = ref(false);

    function onMouseEnter() {
      if (!menu.value) {
        menu.value = true;
      }
    }
    function onMouseLeave() {
      setTimeout(() => {
        if (!isChildActive.value) {
          menu.value = false;
        }
      }, 175);
    }
    function setChildActive() {
      isChildActive.value = true;
    }
    function setChildInactive() {
      isChildActive.value = false;
    }
    function onMenuClose() {
      ctx.emit('closed');
    }
    return {
      menu,
      onMouseEnter,
      onMouseLeave,
      setChildActive,
      setChildInactive,
      onMenuClose,
    };
  },
  components: { LeafMenuItem, LeafMenuItem },
});
</script>
