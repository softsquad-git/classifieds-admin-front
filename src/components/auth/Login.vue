<template>

  <q-form
    @submit="onSubmit"
    class="q-gutter-md shadow-3 padding-10"
    style="width: 400px;"
  >

    <q-input

      v-model="email"
      :label="this.$t('auth.login.email')"
      lazy-rules
      type="email"
      :rules="[ val => val && val.length > 2 || this.$t('auth.login.validations.email')]"
    />

    <q-input

      v-model="password"
      :label="this.$t('auth.login.password')"
      lazy-rules
      type="password"
      :rules="[ val => val && val.length > 2 || this.$t('auth.login.validations.password')]"
    />

    <div>
      <q-btn :label="this.$t('buttons.submit')" type="submit" color="primary"/>
    </div>
  </q-form>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      onSubmit () {
        this.$axios.post(this.baseURL + 'auth/login', {
          email: this.email,
          password: this.password
        })
        .then((data) => {
          const access_token = data.data.access_token;
          localStorage.setItem('token', access_token);
          this.$router.push('/admin')
        })
        .catch((data) => {
          console.log(data.errors)
        })
      }
    }
  }
</script>
