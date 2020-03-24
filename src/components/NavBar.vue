<template>
  <div>
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu"/>
        <q-toolbar-title>Admin</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="250"
      :breakpoint="700"
      elevated
      content-class="bg-dark text-white"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-btn :to="{name: 'Profile'}" class="full-width nav-profile" :label="this.$t('profile.title')"/>
          <q-btn :to="{name: 'ListCategories'}" class="full-width nav-profile" :label="this.$t('profile.pages._t_categories')"/>
          <q-btn :to="{name: 'ListUsers'}" class="full-width nav-profile" :label="this.$t('profile.pages._t_users')"/>
          <q-btn :to="{name: 'ListClassifieds'}" class="full-width nav-profile" :label="this.$t('profile.pages._t_classifieds')"/>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="user.s.avatar_src" :alt="user.name">
          </q-avatar>
          <div class="text-weight-bold">{{ user.name + ' ' + user.last_name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </q-img>
    </q-drawer>

  </div>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {
        drawerLeft: false
      }
    },
    props: {
      user: {}
    }
  }
</script>
