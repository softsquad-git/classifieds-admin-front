<template>
  <div class="padding-40">
    <div class="row">
      <div class="col-lg-9">
        <h4 class="title-page-admin">{{ this.$t('profile.pages._t_users') }}</h4>
      </div>
    </div>
    <div class="content-admin-page">
      <table class="q-table q-table--cell-separator q-table--bordered q-table--no-wrap">
        <thead>
        <tr>
          <th>ID</th>
          <th>Imię i nazwisko</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Data rejestracji</th>
          <th>Akcja</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users">
          <td @click="showDataUserWin(user)">{{ user.id }}</td>
          <td>{{ user.name + ' ' + user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.status }}</td>
          <td>{{ user.created_at | moment('DD-MM-YYYY') }} r.</td>
          <td>
            <q-btn-dropdown color="info" class="full-width" label="Opcje">
              <q-list>
                <q-item clickable v-close-popup @click="showClassifiedsUser(user.id)">
                  <q-item-section>
                    <q-item-label>Lista ogłoszeń</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <q-dialog
      v-model="showDataUser"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Dane użytkownika: {{ user.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <table class="q-table q-table--cell-separator q-table--bordered q-table--no-wrap">
            <tbody>
            <tr>
              <th>Imię i nazwisko</th>
              <td>{{ user.name + ' ' + user.last_name }}</td>
            </tr>
            <tr>
              <th>E-mail</th>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <th>Data urodzenia</th>
              <td>{{ user.birthday }}</td>
            </tr>
            <tr>
              <th>Płeć</th>
              <td v-if="user.sex === 'WOMAN'">Kobieta</td>
              <td v-else-if="user.sex === 'MAN'">Mężczyzna</td>
              <td v-else>Nie dodano</td>
            </tr>
            <tr>
              <th>Telefon</th>
              <td>{{ user.phone ? 'Nie dodano' : 'Nie dodano' }}</td>
            </tr>
            <tr>
              <th>Miasto</th>
              <td>{{ user.city ? 'Nie dodano' : 'Nie dodano' }}</td>
            </tr>
            <tr>
              <th>Kod pocztowy</th>
              <td>{{ user.post_code ? 'Nie dodano' : 'Nie dodano' }}</td>
            </tr>
            <tr>
              <th>Adres</th>
              <td>{{ user.address ? 'Nie dodano' : 'Nie dodano' }}</td>
            </tr>
            <tr>
              <th>Data rejestracji</th>
              <td>{{ user.created_at | moment('DD-MM-YYYY h:mm:s') }}</td>
            </tr>
            </tbody>
          </table>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <list-classifieds-user ref="ListClassifiedsUser" :classifieds="classifieds"/>
  </div>
</template>

<script>
  import ListClassifiedsUser from "./ListClassifiedsUser";

  export default {
    name: 'ListUsers',
    components: {
      'list-classifieds-user': ListClassifiedsUser,
    },
    data() {
      return {
        users: [],
        classifieds: [],
        user: {},
        showDataUser: false,
        user_id: ''
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.$axios.post(this.baseURL + 'admin/users')
          .then((data) => this.users = data.data.data)
          .catch()
      },
      showDataUserWin(user) {
        this.showDataUser = true;
        this.user = user;
      },
      showClassifiedsUser(id) {
        this.classifieds = [];
        this.$axios.post(this.baseURL + 'admin/classifieds?user_id='+id)
        .then((data) => this.classifieds = data.data.data)
        .catch();
        this.$refs.ListClassifiedsUser.onModalClassifieds();
      }
    }
  }
</script>
