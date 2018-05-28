<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm12 md10 offset-md1>
        <form @submit.prevent="saveProduct">
          <pre>{{ user }}</pre>
          <v-text-field label="Nome" 
                        v-model="model.name" 
                        :counter="10" 
                        :error-messages="errors.collect('name')"
                        v-validate="'required|max:10'"
                        data-vv-name="name"
                        required></v-text-field>
          <h5>Hello, {{model.name}}</h5>
          <v-checkbox :label="`Movimenta Estoque: ${model.estoque.toString()}`" v-model="model.estoque"></v-checkbox>
          <v-text-field label="Descrição" 
                        v-model="model.descricao" 
                        :error-messages="errors.collect('descricao')"
                        v-validate="'required'"
                        data-vv-name="descricao"
                        required></v-text-field>
          <v-select
            :items="items"
            v-model="model.grupo"
            label="Grupo"
            single-line
            :error-messages="errors.collect('grupo')"
            v-validate="'required'"
            data-vv-name="grupo"
            required
          ></v-select>
          <input type="file" 
          :multiple="false" 
          ref="fileInput" 
          @change="onFileChange">
           
          <pre>{{ error }}</pre>
          <img :src="model.image" class="image">
          <v-progress-circular
            :size="100"
            :width="15"
            :rotate="360"
            :value="status"
            color="teal"
            v-if="status"
            class="image"
          >{{ status }}
          </v-progress-circular>
          <v-switch :label="`Ativo: ${model.ativo.toString()}`" v-model="model.ativo"></v-switch>
          <v-btn @click="saveProduct">Salvar</v-btn>
          <v-btn @click="clear">Limpar</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '@/services/firebase'
let productsRef = firebase.getDb().ref('products')

export default {
  name: "home",
  data () {
    return {
      status: null,
      error: '',
      user: null,
      model: {
        name: "",
        descricao: "",
        estoque: true,
        grupo: '',
        ativo: true,
        teste: false
      },
      items: ['Grupo 1',
          'Grupo 2',
          'Grupo 3',
          'Grupo 4'
        ],
      dictionary: {
        custom: {
          name: {
            required: () => 'Nome não pode ser nulo.',
            max: 'O campo não pode conter mais que 10 caracteres.'
          },
          grupo: {
            required: () => 'O Grupo deve ser informado'
          },
          descricao: {
            required: () => 'A Descrição deve ser informada.'
          }
        }
      }
    }
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },
  methods: {
    saveProduct: function () {
      this.$validator.validateAll().then((errors) =>  {
        //console.log(this.errors);
        //console.log(this.model);
        if (errors) {
          productsRef.push(this.model);
          this.clear();
          this.$router.push({ name: 'Products'});
        }
      });
      
    },
    clear: function () {
      this.model = {
        name: "",
        estoque: true,
        grupo: '',
        ativo: true,
        teste: false,
        image: ''
      }
      this.$validator.reset()
    },
    onFileChange: function (event) {
      var files = event.target.files || event.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage: function (file) {
      var storageRef = firebase.getStorage().ref()
      var uploadTask = storageRef.child('images/' + file.name).put(file)
      var _this = this
      uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        _this.status = Math.round(progress);
      }, function(error) {
        _this.error = error;
      }, function () {
        _this.onImage(uploadTask)
      })
    },
    onImage: function (image) {
      var _this = this
      console.log(image.snapshot.downloadURL);
      _this.model.image = image.snapshot.downloadURL
    }
  }
}
</script>
<style>
  .image {
    height: 100px;
    width: 100px;
  }
</style>

