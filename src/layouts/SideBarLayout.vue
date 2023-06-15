<template>
  <q-layout view="hHr LpR lfr">
    <q-header class="bg-transparent" bordered>
      <q-toolbar>
        <LoggedInNavToolbar />
        <q-separator />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" bordered>
      <template v-slot:mini>
        <q-scroll-area class="fit cursor-pointer">
          <router-link v-for="item in menuItems" :key="item.id" :to="item.href">
            <q-icon name="item.icon" size="sm" color="grey-9" />
          </router-link>
        </q-scroll-area>
      </template>
      <!-- <div>sidebar</div> -->
      <q-list class="q-gutter-y-lg q-pt-lg">
        <router-link
          v-for="item in menuItems"
          :key="item.id"
          :to="item.to"
          style="text-decoration: none; color: inherit"
        >
          <div class="q-pl-md">
            <q-item clickable :active="route.path === item.to">
              <q-item-section avatar>
                <q-icon :name="item.icon" size="sm" color="grey-9" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.title }}</q-item-label>
                <q-item-label caption>{{ item.subtitle }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </router-link>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          appear
          :duration="120"
        >
          <component :is="Component" />
        </transition>
      </router-view>
      <!-- <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
        :duration="100"
      >
        <router-view />
      </transition> -->
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import LoggedInNavToolbar from 'src/components/core/nav/LoggedInNavToolbar.vue';
import { computed, ref } from 'vue-demi';
import { useSidebarMenuStore } from 'src/stores/menus/sidebar-menu';
import { useRoute } from 'vue-router';

const drawer = ref(true);
const sidebarMenuStore = useSidebarMenuStore();
const menuItems = sidebarMenuStore.menuItems;
const route = useRoute();

const $q = useQuasar();
const headerBackgroundColorClass = computed(() => {
  return $q.dark.isActive ? props.darkBackground : props.lightBackground;
});
const headerForegroundColorClass = computed(() => {
  return $q.dark.isActive ? 'text-white' : 'text-black';
});
</script>

<style>
</style>
