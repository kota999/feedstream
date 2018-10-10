<template>
  <div>
    <b-card>
      <b-media>
        <!-- Thumbnail -->
        <img slot="aside" v-bind:src='this.thumbnail' alt="Thumbnail" />
        <!-- Table -->
        <b-table stacked :items="item"></b-table>
      </b-media>
    </b-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'user-info-block',
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    computed: {
      ...mapGetters([
        'id',
        'name',
        'email',
        'thumbnail'
      ]),
      item: function () {
        return [
          { ID: this.id, Name: this.name, Email: this.email }
        ]
      }
    }
  }
</script>

<style>
</style>
