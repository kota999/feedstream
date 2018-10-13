<template>
  <div>
    <br/>
    <p>
      Getting access token for your account:
      <a class="text-muted" href="#" v-on:click="jumpTo('https://cloud.feedly.com/v3/auth/dev')">here</a>
    </p>
    <b-form-textarea id="textarea"
                     v-model="tkn"
                     placeholder="Enter access token"
                     :rows="3"
                     :max-rows="6">
    </b-form-textarea>
    <b-button size='' v-on:click="register()">Register</b-button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import Utils from '@/components/api/Utils'

  export default {
    name: 'authentication-page',
    data () {
      return {
        tkn: ''
      }
    },
    methods: {
      ...mapActions([
        'writeToken',
        'readToken',
        'auth'
      ]),
      jumpTo (url) {
        Utils.jumpTo(url)
      },
      register () {
        if (this.tkn !== '') {
          console.log('token: ' + this.tkn.trim())
          this.writeToken({token: this.tkn.trim()})
          this.readToken()
          this.auth()
        }
      }
    }
  }
</script>
