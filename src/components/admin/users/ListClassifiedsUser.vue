<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-light text-dark">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none">
         <div v-if="classifieds.length > 0">
           <table class="q-table q-table--cell-separator q-table--bordered q-table--no-wrap">
             <thead>
             <tr>
               <th>ID</th>
               <th>Tytuł</th>
               <th>Kategoria</th>
               <th>Status</th>
               <th>Data dodania</th>
             </tr>
             </thead>
             <tbody>
             <tr v-for="classified in classifieds">
               <td>{{ classified.id }}</td>
               <td>{{ classified.title }}</td>
               <td>{{ classified.category.name }}</td>
               <td v-if="classified.status === 'PUBLISHED'">Opublikowane</td>
               <td v-else-if="classified.status === 'NEW'">Dodane</td>
               <td v-else-if="classified.status === 'LOCKED'">Zablokowane</td>
               <td v-else-if="classified.status === 'ARCHIVE'">W archiwum</td>
               <td v-else-if="classified.status === 'PROMO'">Promowane</td>
               <td>{{ classified.created_at | moment('DD-MM-YYYY H:mm:ss') }}</td>
             </tr>
             </tbody>
           </table>
         </div>
          <div class="no-data shadow-3" v-else>
            {{ this.$t('info.no_items') }}
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import ListClassifieds from "../classifieds/ListClassifieds";
  export default {
    name: "ListClassifiedsUser",
    components: {ListClassifieds},
    data(){
      return{
        dialog: false,
        maximizedToggle: true
      }
    },
    props: {
      classifieds: []
    },
    methods: {
      onModalClassifieds() {
        this.dialog = true
      }
    }
  }
</script>
