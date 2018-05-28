<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm12 md10 offset-md1>
        <v-alert type="success" dismissible v-model="alert">
          {{message}}
        </v-alert>
        <v-card>
          <v-toolbar>
            <v-toolbar-side-icon></v-toolbar-side-icon>
          </v-toolbar>
          <v-card-text class="grey lighten-5">
            <v-data-table
              :headers="headers"
              :items="items"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.estoque }}</td>
                <td class="text-xs-right">{{ props.item.grupo }}</td>
                <td class="text-xs-right">{{ props.item.ativo }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-text style="height: 100px; position: relative">
            <v-btn absolute dark fab top right color="pink" to="/admin/new">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '@/services/firebase'
let db = firebase.getDb()

export default {
  name: 'home',
  data () {
    return {
        msg: 'Bem Vindo aos Produtos',
        message: '',
        alert: false,
        e2: {},
        headers: [
          {
            text: 'Descrição',
            align: 'left',
            sortable: true,
            value: 'name'
          },
          { text: 'Estoque', value: 'estoque' },
          { text: 'Grupo', value: 'grupo' },
          { text: 'Ativo', value: 'ativo' },
          { text: 'Ações' }
        ]
    }
  },
  beforeRouteEnter (to, from, next) {
      db.collection('rodeios').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = {
            'id': doc.id,
            'nome': doc.data().nome,
            'descricao': doc.data().descricao,
            'cidade': doc.data().cidade,
            'data': doc.data().data,
            'slug': doc.data().slug
          }
          this.items.push(data)
        })
      })
    },
  methods: {
    deleteItem: function (item) {
      productsRef.child(item['.key']).remove()
      this.message = 'Produto removido com sucesso!';
      this.alert = true;
    },
    editItem: function (item) {
      this.$router.push({ name: 'Edit', params: { id: item['.key'] }})
    }
  }
}
</script>
