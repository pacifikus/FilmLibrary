<template lang="pug">
    .content-wrapper
        section
            .container
                .auth
                    .auth__banner
                        img(src="../../assets/film.png")
                    .auth__form
                        h1.ui-title-2 Login
                        form(@submit.prevent="onSubmit")
                          .form-item(:class="{ errorInput: $v.email.$error}")
                            input(
                              type="email"
                              placeholder="Email"
                              v-model="email"
                              :class="{ error: $v.email.$error}"
                              @change="$v.email.$touch()"
                            )
                            .error(v-if="!$v.email.required") Field is required
                          .form-item(:class="{ errorInput: $v.password.$error}")
                            input(
                              type="password"
                              placeholder="Password"
                              v-model="password"
                              :class="{ error: $v.password.$error}"
                              @change="$v.password.$touch()"
                            )
                            .error(v-if="!$v.password.required") Field is required
                          .button-list
                            button.button.button-primary(
                              type="submit"
                            )
                              span(v-if="loading") Loading...
                              span(v-else) Login

                          .buttons-list.buttons-list--info
                            p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                            p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                            p.typo__p(v-else) {{ submitStatus }}

                          .button-list.buttons-list--info
                            span Need a registration?
                              router-link(to="/registration")  Enter here

</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            console.log('login')
            this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="stylus" scoped>
  .auth
    display flex

  .auth__banner
    width 40%
    margin-right 10%
  .auth__form
    width 50%

  .form-item
    .error
      display none
      margin-bottom 8px
      font-size 13.4px
      color:  #fc5c65
    &.errorInput
      .error
        display block
  input
    &.error
      border-color: #fc5c65

  .button-list
    text-align right
    margin-bottom 20px
    &.buttons-list--info
      text-align center
      &:last-child
        margin-bottom 0px
    color #444ce0

 .buttons-list--info
    p
      text-align center
      margin-bottom 20px
</style>
