<template>
  <div class="padding-40">
    <div class="row">
      <div class="col-lg-9">
        <h4 class="title-page-admin">{{ this.$t('profile.pages._t_categories') }}</h4>
      </div>
      <div class="col-lg-3 text-center">
        <q-btn @click="showAddCategoryBlock ^= true" class="glossy icon-plus-admin-page" round color="secondary" icon="note_add"/>
      </div>
      <div class="col-lg-12">
        <store-category v-show="showAddCategoryBlock"/>
      </div>
    </div>
    <div class="content-admin-page">
      <table class="q-table q-table--cell-separator q-table--bordered q-table--no-wrap">
        <thead>
        <tr>
          <th>ID</th>
          <th>Nazwa</th>
          <th>Data dodania</th>
          <th>Akcja</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}
            <q-form @submit="onSubmitEdit(category.id)" v-show="category.id === show_edit_category">
              <q-input v-model="categoriesEdit.name" type="text"/>
              <q-btn type="submit" class="icon-action q-mt-sm" outline round color="warning" icon="edit"/>
              <q-btn @click="closeFormEditCategory" class="icon-action q-mt-sm" outline round color="negative"
                     icon="highlight_off"/>
            </q-form>
          </td>
          <td>{{ category.created_at | moment('D.MM.YYYY') }} r.</td>
          <td class="text-right">
            <q-btn @click="editCategory(category.id, category.name)" class="icon-action" outline round color="warning"
                   icon="edit"/>
            <q-btn @click="removeCategory(category.id)" class="icon-action" outline round color="negative" icon="delete"/>
            <q-btn @click="previewOffersInCategory(category.id)" class="icon-action" outline round color="info"
                   icon="visibility"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-light text-dark">
        <q-bar>
          <q-space/>

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

        <q-card-section>
          <div class="text-h6">Ogłoszenia ({{classifieds.length}})</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <preview-classifieds-category :classifieds="classifieds"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import PreviewClassifiedsCategory from './PreviewClassifiedsCategory'
  import StoreCategory from './StoreCategory'

  export default {
    name: 'ListCategories',
    components: {
      StoreCategory,
      PreviewClassifiedsCategory
    },
    data () {
      return {
        categories: [],
        classifieds: [],
        categoriesEdit: {
          name: null
        },
        show_edit_category: null,
        dialog: false,
        maximizedToggle: true,
        showAddCategoryBlock: false
      }
    },
    mounted () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$axios.post(this.baseURL + 'admin/categories')
          .then((data) => this.categories = data.data.data)
          .catch()
      },
      editCategory (id, name) {
        this.categoriesEdit.name = name
        this.show_edit_category = id
      },
      onSubmitEdit (id) {
        this.$axios.post(this.baseURL + 'admin/categories/update/' + id, this.categoriesEdit)
          .then(() => {
            this.loadData()
            this.closeFormEditCategory()
          })
          .catch((data) => console.log(data))
      },
      closeFormEditCategory () {
        this.show_edit_category = null
      },
      previewOffersInCategory (id) {
        this.$axios.post(this.baseURL + 'admin/categories/show/' + id)
          .then((data) => {
            this.classifieds = data.data.data
            this.dialog = true
          })
          .catch()
      },
      removeCategory(id){
        this.$axios.post(this.baseURL + 'admin/categories/remove/' + id)
        .then(() => {
          this.loadData()
        })
        .catch()
      }
    }
  }
</script>
