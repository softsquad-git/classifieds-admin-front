<template>
    <div>
      <div v-if="classifieds.length > 0">
        <table class="q-table q-table--cell-separator q-table--bordered q-table--no-wrap">
          <thead>
          <tr>
            <th>ID</th>
            <th>Tytuł</th>
            <th>Użytkownik</th>
            <th>Status</th>
            <th>Data dodania</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="classified in classifieds">
            <td @click="previewClassified(classified)">{{classified.id}}</td>
            <td>{{classified.title}}</td>
            <td @click="previewClassifiedUser(classified.user)">{{classified.user.name + ' ' + classified.user.last_name}}</td>
            <td>
              <span v-if="classified.status === 'NEW'">Dodane</span>
              <span v-else-if="classified.status === 'PUBLISHED'">Opublikowane</span>
              <span v-else-if="classified.status === 'ARCHIVE'">W archiwum</span>
              <span v-else-if="classified.status === 'LOCKED'">Zablokowane</span>
              <span v-else-if="classified.status === 'PROMO'">Promowane</span>
            </td>
            <td>{{ classified.created_at | moment('D.MM.YYYY') }} r.</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="no-data shadow-3" v-else>
        {{ this.$t('info.no_items') }}
      </div>
      <q-dialog
        v-model="inceptionPreviewClassified"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">{{classified.title}}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
           <p class="__c_a_content" v-html="classified.content"></p>
            <div class="__c__a_data">
              <div class="__c_a_type">Rodzaj:
              <span v-if="classified.type === 'AUCTION'">Aukcja</span>
              <span v-else-if="classified.type === 'AD'">Ogłoszenie</span>
              <span v-else-if="classified.type === 'PRODUCT'">Produkt</span>
              <span v-else-if="classified.type === 'AUCTION_PRODUCT'">Aukcja - Produkt</span>
              </div>
              <div class="__c_a_type_p" v-if="classified.type === 'AUCTION'">
                <span>Cena początkowa: {{ classified.starting_price }}</span>
                <span>Zakończenie aukcji: {{classified.end_time}}</span>
              </div>
              <div class="__c_a_type_p" v-else-if="classified.type === 'AD'">
                <span>Cena: {{classified.price}}</span>
              </div>
              <div class="__c_a_type_p" v-else-if="classified.type === 'PRODUCT'">
                <span>Cena: {{classified.price}}</span>
              </div>
              <div class="__c_a_type_p" v-if="classified.type === 'AUCTION_PRODUCT'">
                <span>Cena początkowa: {{ classified.starting_price }}</span>
                <span>Cena: {{ classified.price}}</span>
                <span>Zakończenie aukcji: {{classified.end_time}}</span>
              </div>
              <div class="__c_a_is">Możliwość negocjacji: <span v-if="classified.is_negotiation === 1">Tak</span><span v-else>Nie</span></div>
              <div class="__c_a_is">Możliwość rezerwacji: <span v-if="classified.is_reservation === 1">Tak</span><span v-else>Nie</span></div>
              <div class="__c_a_quantity">Ilość: <span>{{ classified.quantity }}</span></div>
              <div class="__c_a_views">Wyświetleń: <span>{{ classified.views }}</span></div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog
        v-model="inceptionPreviewClassifiedUser"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">{{classifiedUser.name + ' ' + classifiedUser.last_name}}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="__c__a_data">
              <div class="__c_a_user">ID: <span>{{classifiedUser.id}}</span></div>
              <div class="__c_a_user">Imię i nazwisko: <span>{{ classifiedUser.name + ' ' + classifiedUser.last_name }}</span></div>
              <div class="__c_a_user">E-mail: <span>{{ classifiedUser.email }}</span></div>
              <div class="__c_a_user">Data urodzenia: <span>{{ classifiedUser.birthday }}</span></div>
              <div class="__c_a_user">Data rejestracji: <span>{{ classifiedUser.created_at }}</span></div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
</template>

<script>

  export default {
    name: 'PreviewClassifiedsCategory',
    props: {
      classifieds: []
    },
    data(){
      return{
        inceptionPreviewClassified: false,
        inceptionPreviewClassifiedUser: false,
        classified: {},
        classifiedUser: {}
      }
    },
    methods: {
      previewClassified(classified){
        this.classified = classified;
        this.inceptionPreviewClassified = true;
      },
      previewClassifiedUser(user){
        this.classifiedUser = user;
        this.inceptionPreviewClassifiedUser = true;
      }
    }
  }
</script>
