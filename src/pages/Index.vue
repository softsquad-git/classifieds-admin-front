<template>
  <q-page class="flex flex-center">
    <login/>
  </q-page>
</template>

<script>
import Login from '../components/auth/Login'
export default {
  name: 'PageIndex',
  components: { Login }
}
</script>
