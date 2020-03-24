<template>
  <q-layout view="lHh Lpr lFf">
    <nav-bar :user="user"/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import NavBar from '../components/NavBar'
  export default {
    name: 'AdminLayout',
    components: { NavBar },
    data(){
      return {
        user: {}
      }
    },
    mounted () {
      this.$axios.post(this.baseURL + 'user')
      .then((data) => this.user = data.data.data)
    }
  }
</script>
