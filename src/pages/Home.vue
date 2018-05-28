<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm4 v-for="(item, i) in items" :key="i">
        <v-card>
          <v-card-media :src="item.image" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{item.name}}</h3>
              <div>{{item.descricao}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Curtir</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '@/services/firebase'
let productsRef = firebase.getDb().ref('products')
export default {
  firebase: {
    items: productsRef
  },
  name: 'home',
  data () {
      return {
          msg: 'Bem Vindo ao aplicativo VueJS'
      }
  }
}
</script>
