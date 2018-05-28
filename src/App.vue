<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="{name:item.link}"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!user" @click="conectar()" >
        Entrar
      </v-btn>
      <a v-if="user" 
         @click="desconectar()">
         <strong>{{user.displayName}}</strong>
        <img v-if="user.photoURL" class="photo" :src="user.photoURL" />
      </a>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>

import firebase from '@/services/firebase'

let auth = firebase.getAuth()
let provider = firebase.getGoogleAuthProvider()

export default {
  name: 'App',
  mounted: function () {
    auth.onAuthStateChanged(this.onUserLogin)
  },
  data () {
    return {
      user: undefined,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Home',
        link: 'Home'
      },
      {
        icon: 'gavel',
        title: 'Products',
        link: 'Products'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Curso Vuejs PWA'
    }
  },
  methods: {
    conectar: function () {
      auth.signInWithPopup(provider)
      .catch(function (error) {
        console.log(error.message)
      })
    },
    desconectar: function () {
      auth.signOut().catch(function (error) {
        console.log(error)
      })
    },
    onUserLogin: function (user) {
      this.user = user
    }

  }
}
</script>
<style>
.photo {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
</style>