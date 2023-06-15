<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-10">
        <h4 class="text-weight-bold">Routes</h4>
        <q-table
          :columns="columns"
          :rows="routeData"
          no-data-label="No routes found"
        >
          <template v-slot:top>
            <q-space />
            <q-btn
              color="primary"
              unelevated
              outline
              :ripple="false"
              class="text-capitalize rounded-borders"
              @click="routeCreateDialog = true"
            >
              <q-icon left name="mdi-plus" />
              New Route
            </q-btn>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="provider" :props="props">
                {{ props.row.provider }}
              </q-td>
              <q-td key="origin" :props="props">
                {{ props.row.origin }}
              </q-td>
              <q-td key="destination" :props="props">
                {{ props.row.destination }}
              </q-td>
              <q-td key="side_number" :props="props">
                {{ props.row.side_number }}
              </q-td>
              <q-td key="license_plate" :props="props">
                {{ props.row.license_plate }}
              </q-td>
              <q-td
                key="actions"
                :props="props"
                class="row justify-end bg-transparent"
              >
                <q-btn
                  flat
                  round
                  color="grey-6"
                  icon="mdi-pencil"
                  size="sm"
                  disable
                />
                <q-btn
                  flat
                  round
                  color="grey-6"
                  icon="mdi-delete"
                  size="sm"
                  class="q-ml-sm"
                  @mouseenter="onDeleteButtonMouseEnter"
                  @mouseleave="onDeleteButtonMouseLeave"
                  @click="stageDelete(props.row)"
                />
              </q-td>
            </q-tr>
          </template>

          <template v-slot:no-data="{ message }">
            <div class="full-width q-py-lg q-gutter-y-md">
              <div class="row flex-center text-grey-7 q-gutter-x-lg">
                <div>
                  <q-icon size="lg" name="sentiment_dissatisfied" />
                </div>
                <div>
                  <h6 class="text-weight-regular q-my-none">
                    {{ message }}
                  </h6>
                </div>
              </div>
              <div>
                <h6
                  class="
                    q-my-none
                    text-subtitle2 text-center text-grey-7 text-weight-light
                  "
                >
                  Click the
                  <q-icon
                    name="mdi-plus"
                    color="primary"
                    size="sm"
                    class="q-mx-sm"
                  />
                  button to create a new route
                </h6>
              </div>
            </div>
          </template>
        </q-table>
        <q-dialog v-model="routeCreateDialog">
          <q-card style="width: 400px" class="q-pa-lg">
            <CreateRouteForm
              @save="onSave"
              @cancel="routeCreateDialog = false"
            />
          </q-card>
        </q-dialog>

        <q-dialog
          v-model="routeDeleteDialog"
          @before-hide="beforeDeleteDialogHide"
        >
          <q-card style="width: 400px" class="q-pa-lg">
            <h6 class="q-mt-none q-mb-sm text-weight-regular">Confirm</h6>
            <p class="text-body2 text-grey-9 q-mb-none">
              Are you sure you want to delete this route?
            </p>
            <p class="text-caption text-grey-7">
              (This action can not be undone)
            </p>

            <q-separator class="q-my-md" />
            <div v-if="toDelete" class="text-center">
              <div class="text-weight-bold">{{ toDelete.provider }}</div>
              <div class="q-mt-sm text-grey-9">
                {{ toDelete.origin }}
                <q-icon name="mdi-arrow-right" class="q-mx-md" />
                {{ toDelete.destination }}
              </div>
            </div>
            <q-separator class="q-mt-md q-mb-lg" />

            <div class="row justify-end q-gutter-x-md">
              <q-btn
                unelevated
                color="red"
                @click="deleteRoute"
                class="text-capitalize text-weight-regular"
              >
                <q-icon name="mdi-delete" left />
                Delete
              </q-btn>
              <q-btn
                flat
                color="primary"
                @click="routeDeleteDialog = false"
                class="text-capitalize text-weight-regular"
              >
                <q-icon name="mdi-close" left />
                Cancel
              </q-btn>
            </div>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// TODO: Sort out async/await
import { useDashMenuStore } from 'src/stores/dashMenu';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue-demi';
import { getRouteProviders } from 'src/services/fake-route-data.js';
import CreateRouteForm from 'src/components/home/routes/CreateRouteForm.vue';
import store from 'store';
import { faker } from '@faker-js/faker';
import _ from 'lodash';

const DATA_KEY = 'saved_routes';

// const routeData = getRouteProviders();
const dashMenuStore = useDashMenuStore();
const routeData = ref(store.get(DATA_KEY));

const deleteBtnColor = 'text-grey-6';
const deleteBtnHoverColor = 'text-red-9';

function onDeleteButtonMouseEnter(event) {
  event.target.classList.replace(deleteBtnColor, deleteBtnHoverColor);
}
function onDeleteButtonMouseLeave() {
  event.target.classList.replace(deleteBtnHoverColor, deleteBtnColor);
}

onMounted(() => {
  dashMenuStore.setCurrentTitle('Routes');
});

onBeforeUnmount(() => {
  dashMenuStore.setCurrentTitle(null);
});

const routeDeleteDialog = ref(false);
const toDelete = ref();
function stageDelete(route) {
  toDelete.value = route;
  routeDeleteDialog.value = true;
}
function beforeDeleteDialogHide() {
  toDelete.value = null;
}
function deleteRoute() {
  if (toDelete.value) {
    _.remove(routeData.value, (item) => item.id === toDelete.value.id);
  }
  store.set(DATA_KEY, routeData.value);
  routeDeleteDialog.value = false;
}
const routeCreateDialog = ref(false);
function onSave(data) {
  routeData.value = store.get(DATA_KEY);
  if (!routeData.value) {
    routeData.value = [];
  }
  routeData.value.push({
    id: faker.datatype.uuid(),
    ...data,
  });
  store.set(DATA_KEY, routeData.value);
  routeCreateDialog.value = false;
}

const columns = [
  {
    name: 'provider',
    label: 'Provider',
    field: (row) => row.provider,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'origin',
    label: 'Origin',
    field: (row) => row.origin,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'destination',
    label: 'Destination',
    field: (row) => row.destination,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'side_number',
    label: 'Side Number',
    field: (row) => row.side_number,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'license_plate',
    label: 'Licence Plate',
    field: (row) => row.license_plate,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: 'actions',
    label: '',
    align: 'right',
    sortable: 'false',
  },
];
</script>

<style>
</style>
