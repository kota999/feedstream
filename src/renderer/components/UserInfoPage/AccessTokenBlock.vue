<template>
  <div>
    <b-form-textarea id="textarea"
                     v-model="tkn"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6">
    </b-form-textarea>
    <b-button size='' v-on:click="refresh()">Refresh</b-button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'access-token-page',
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
      refresh () {
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
