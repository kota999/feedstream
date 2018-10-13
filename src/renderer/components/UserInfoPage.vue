<template>
  <div id="wrapper">
    <main>
      <!-- Header -->
      <div>
        <nav class="navbar navbar-default navbar-custom">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">FeedStream</a>
            </div>
          </div>
        </nav>
      </div>
      <div v-if='this.authenticated'>
        <b-alert variant="success" show>Authentication success.</b-alert>
      </div>
      <div v-else>
        <b-alert variant="danger" show>Authentication failed.</b-alert>
      </div>
      <b-tabs>
        <b-tab title="User Info" active>
          <div v-if='this.authenticated'>
            <user-info-block></user-info-block>
          </div>
          <div v-else>
            <p> Please authenticate ! </p>
          </div>
        </b-tab>
        <b-tab title="Auth" >
          <authentication-block></authentication-block>
        </b-tab>
      </b-tabs>
      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <a class="text-muted" href="#" v-on:click="jumpTo('https://github.com/kota999/')">contact to kota999</a>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import UserInfoBlock from '@/components/UserInfoPage/UserInfoBlock'
  import AuthenticationBlock from '@/components/UserInfoPage/AuthenticationBlock'
  import Utils from '@/components/api/Utils'

  export default {
    name: 'userinfo-page',
    components: {
      UserInfoBlock,
      AuthenticationBlock
    },
    methods: {
      ...mapActions([
        'readToken',
        'auth',
        'viewFeed'
      ]),
      jumpTo (url) {
        Utils.jumpTo(url)
      }
    },
    created () {
      this.readToken()
      this.$store.dispatch('auth').then(() => {
        this.viewFeed()
      })
    },
    computed: {
      ...mapGetters([
        'authenticated'
      ])
    }
  }
</script>

<style>
.navbar-custom {
    background-color:  #66CC99;
    color: #ffffff;
    border-radius: 0;
    border-color:  #66CC99;
}
a.navbar-brand { color: #ffffff; }
a.navbar-brand:link { color: #ffffff; }
a.navbar-brand:visited { color: #ffffff; }
a.navbar-brand:hover { color: #ffffff; }
a.navbar-brand:active { color: #ffffff; }

a { color: #28384b; }
a:link { color: #28384b; }
a:visited { color: #28384b; }
a:hover { color: #28384b; }
a:active { color: #28384b; }
</style>
