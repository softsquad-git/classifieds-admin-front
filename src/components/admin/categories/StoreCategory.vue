<template>
<q-form @submit="onSubmit">
  <div class="row">
    <div class="col-lg-4">
      <q-input
        v-model="data.name"
        :label="this.$t('profile.pages.categories.store.name')"
        type="text"
        />
    </div>
    <div class="col-lg-4">
      <q-input
        v-mode="data.icon_class"
        :label="this.$t('profile.pages.categories.store.icon_class')"
        type="text"
        />
    </div>
    <div class="col-lg-4">
      <q-select
        v-model="data.parent_id"
        :options="categories"
        option-label="name"
        option-value="id"
        option-disable="inactive"
        emit-value
        map-options
        :label="$t('profile.pages.categories.store.parent_id')"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <q-btn type="submit" class="q-mt-md q-mb-lg" :label="this.$t('buttons.submit')"/>
    </div>
  </div>
</q-form>
</template>

<script>
  export default {
    name: 'StoreCategory',
    data(){
      return{
        data: {
          name: null,
          icon_class: null,
          parent_id: 0
        },
        categories: []
      }
    },
    mounted () {
     this.parentsCategories()
    },
    methods:{
      onSubmit(){
        this.$axios.post(this.baseURL + 'admin/categories/store', this.data)
        .then(() => {
          this.data.name = null;
          this.data.icon_class = null;
          this.data.parent_id = 0;
          this.$parent.loadData();
          this.$parent.showAddCategoryBlock = false;
        })
        .catch()
      },
      parentsCategories(){
        this.$axios.post(this.baseURL + 'admin/categories/all')
        .then((data) => this.categories = data.data.data)
        .catch()
      }
    }
  }
</script>
