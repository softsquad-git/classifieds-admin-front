<template>
  <div class="padding-40">
    <div class="row">
      <div class="col-lg-9">
        <h4 class="title-page-admin">{{ this.$t('profile.pages._t_classifieds') }}</h4>
      </div>
    </div>
    <div class="content-admin-page">
      <table class="q-table q-table--cell-separator q-table--bordered q-table--no-wrap">
        <thead>
        <tr>
          <th>ID</th>
          <th>Tytuł</th>
          <th>Kategoria</th>
          <th>Status</th>
          <th>Data dodania</th>
          <th>Akcja</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="classified in classifieds">
          <td @click="showDataClassifiedClick(classified)">{{ classified.id }}</td>
          <td>{{ classified.title }}</td>
          <td>{{ classified.category.name }}</td>
          <td>
            <q-btn-dropdown class="full-width"  v-if="classified.status === 'PUBLISHED'" color="green" label="Opublikowane" dropdown-icon="change_history">
              <q-list>
                <q-item clickable v-close-popup @click="setStatusAD('NEW', classified.id)">
                  <q-item-section>
                    <q-item-label>Dodane (do weryfikacji)</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="setStatusAD('ARCHIVE', classified.id)">
                  <q-item-section>
                    <q-item-label>W archiwum</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="setStatusLOCKED('LOCKED', classified.id)">
                  <q-item-section>
                    <q-item-label>Zablokowane</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setStatusAD('PROMO', classified.id)">
                  <q-item-section>
                    <q-item-label>Promowane</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn-dropdown class="full-width"  v-else-if="classified.status === 'NEW'" color="orange" label="Dodane (do weryfikacji)" dropdown-icon="change_history">
              <q-list>
                <q-item clickable v-close-popup @click="setStatusAD('PUBLISHED', classified.id)">
                  <q-item-section>
                    <q-item-label>Opublikowane</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="setStatusAD('ARCHIVE', classified.id)">
                  <q-item-section>
                    <q-item-label>W archiwum</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="setStatusLOCKED('LOCKED', classified.id)">
                  <q-item-section>
                    <q-item-label>Zablokowane</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setStatusAD('PROMO', classified.id)">
                  <q-item-section>
                    <q-item-label>Promowane</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn-dropdown class="full-width"  v-else-if="classified.status === 'ARCHIVE'" color="black" label="W archiwum" dropdown-icon="change_history">
              <q-list>
                <q-item clickable v-close-popup @click="setStatusAD('NEW', classified.id)">
                  <q-item-section>
                    <q-item-label>Dodane (do weryfikacji)</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="setStatusAD('PUBLISHED', classified.id)">
                  <q-item-section>
                    <q-item-label>Opublikowane</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="setStatusLOCKED('LOCKED', classified.id)">
                  <q-item-section>
                    <q-item-label>Zablokowane</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setStatusAD('PROMO', classified.id)">
                  <q-item-section>
                    <q-item-label>Promowane</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>


            <q-btn-dropdown class="full-width"  v-else-if="classified.status === 'LOCKED'" color="red" label="Zablokowane" dropdown-icon="change_history">
              <q-list>
                <q-item clickable v-close-popup @click="setStatusAD('NEW', classified.id)">
                  <q-item-section>
                    <q-item-label>Dodane (do weryfikacji)</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="setStatusAD('PUBLISHED', classified.id)">
                  <q-item-section>
                    <q-item-label>Opublikowane</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="setStatusAD('ARCHIVE', classified.id)">
                  <q-item-section>
                    <q-item-label>W archiwum</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setStatusAD('PROMO', classified.id)">
                  <q-item-section>
                    <q-item-label>Promowane</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn-dropdown class="full-width" v-else-if="classified.status === 'PROMO'" color="pink" label="Promowane" dropdown-icon="change_history">
              <q-list>
                <q-item clickable v-close-popup @click="setStatusAD('NEW', classified.id)">
                  <q-item-section>
                    <q-item-label>Dodane (do weryfikacji)</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="setStatusAD('PUBLISHED', classified.id)">
                  <q-item-section>
                    <q-item-label>Opublikowane</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="setStatusAD('ARCHIVE', classified.id)">
                  <q-item-section>
                    <q-item-label>W archiwum</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setStatusLOCKED('LOCKED', classified.id)">
                  <q-item-section>
                    <q-item-label>Zablokowane</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </td>
          <td>{{ classified.created_at | moment('DD-MM-YYYY H:mm:ss') }}</td>
          <td>
            ff
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <q-dialog
      v-model="showDataClassified"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">{{ classified.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <table class="q-table q-table--cell-separator q-table--bordered q-table--no-wrap">
            <tbody>
            <tr>
              <th>Tytuł</th>
              <td>{{classified.title}}</td>
            </tr>
            <tr>
              <th>Treść</th>
              <td @click="showContent(classified.content)"><b>zobacz</b></td>
            </tr>
            <tr>
              <th>Type</th>
              <td v-if="classified.type === 'PRODUCT'">Produkt</td>
              <td v-if="classified.type === 'AD'">Ogłoszenie</td>
              <td v-if="classified.type === 'AUCTION'">Aukcja</td>
              <td v-if="classified.type === 'AUCTION_PRODUCT'">Aukcja-Produkt</td>
            </tr>
            <tr v-if="classified.type === 'AUCTION' || classified.type === 'AUCTION_PRODUCT'">
              <th>Cena początkowa</th>
              <td>{{ classified.starting_price }}</td>
            </tr>
            <tr v-if="classified.type === 'AUCTION' || classified.type === 'AUCTION_PRODUCT'">
              <th>Czas zakończenia aukcji</th>
              <td>{{ classified.end_time }}</td>
            </tr>
            <tr v-if="classified.type !== 'AUCTION'">
              <th>Cena</th>
              <td>{{classified.price}}</td>
            </tr>
            <tr>
              <th>Możliwość rezerwacji</th>
              <td>{{ classified.is_reservation ? 'Tak' : 'Nie' }}</td>
            </tr>
            <tr>
              <th>Możliwość negocjacji ceny</th>
              <td>{{ classified.is_negotiation ? 'Tak' : 'Nie' }}</td>
            </tr>
            <tr>
              <th>Ilość</th>
              <td>{{classified.quantity ? 'Nie dotyczy' : 'Nie dotyczy'}}</td>
            </tr>
            <tr>
              <th>Stan</th>
              <td>{{classified.state}}</td>
            </tr>
            <tr>
              <th>Wyświetleń</th>
              <td>{{classified.views}}</td>
            </tr>
            <tr>
              <th>Data dodania</th>
              <td>{{classified.created_at | moment('DD-MM-YYYY H:mm:ss')}}</td>
            </tr>
            </tbody>
          </table>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="showContentClassified"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pt-none">
         {{ contentClassified }}
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
    name: 'ListClassifieds',
    data(){
      return{
        classifieds: [],
        dataStatus: {
          status: ''
        },
        showDataClassified: false,
        showContentClassified: false,
        classified: {},
        contentClassified: ''
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      loadData(){
        this.$axios.post(this.baseURL + 'admin/classifieds')
        .then((data) => this.classifieds = data.data.data)
        .catch()
      },

      // status //
      setStatusAD(status, id){
        this.dataStatus.status = status;
        this.setStatus(id);
      },
      setStatusLOCKED(status, id){
        this.dataStatus.status = status;
        this.setStatus(id);
      },
      setStatus(id){
        this.$axios.post(this.baseURL + 'admin/classifieds/set-status/' + id, this.dataStatus)
        .then(() => {
          this.loadData();
        })
        .catch();
      },
      showDataClassifiedClick(classified){
        this.showDataClassified = true;
        this.classified = classified;
      },
      showContent(content){
        this.contentClassified = content;
        this.showContentClassified = true;
      }
    }
  }
</script>
