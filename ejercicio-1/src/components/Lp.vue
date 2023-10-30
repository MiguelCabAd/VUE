                //******************************************************************************************
                //EXPLICACION: En este componente se realiza una lista de tarjetas en las que se muestran  *
                //los albumes. El procedimiento y el formato de la página es el mismo que en artistas.     *
                //La única diferencia es un combobox para mostrar la lista de artistas actualizada.        *
                //******************************************************************************************


<template>
  <v-card>
<h1 class="text-center">---------------------------ALBUMES---------------------------</h1>

       <!--v-text-field v-model="album" label="Introduzca un nombre"></v-text-field>
            <v-btn @click="guardarLp">Guardar</v-btn-->

    <v-list>
        <v-list-item-group v-if="albumes.length > 0">
            <v-list-item v-for="(album, i) in albumes" :key="i">
                <v-list-item-content>
                    <v-list-item-title>{{ album }}</v-list-item-title>
                </v-list-item-content>

                <v-icon small @click="editarLp(i)" color="green"> mdi-pencil </v-icon>
                <v-icon small @click="borrarLp(i)" color="red"> mdi-delete </v-icon>

            </v-list-item>
        </v-list-item-group>
    
        <v-list-item v-else>
             <v-list-item-content>No hay albumes.</v-list-item-content>
        </v-list-item>

    </v-list>

        <h1 class="text-center">Guardar Nuevos Albumes</h1>

        <v-text-field v-model="album" label="Escriba un nombre y pulse Guardar"></v-text-field>
        <v-btn block  color = "green" @click="guardarLp">Guardar</v-btn>

        <v-snackbar v-model="existe" color="error">
          ERROR: el album ya existe.
          <v-btn color="white" @click="existe = false" light>Cerrar</v-btn>
        </v-snackbar>

    <h1 class="text-center">Lista de Artistas</h1>
    <v-combobox
        label="Lista de Artistas"
        :items="artistas"
    ></v-combobox>

      <v-card
        class="mx-auto"
        elevation="1"
        max-width="500"
      >
      <v-card-title class="py-5 font-weight-black">Editar Albumes</v-card-title>

      <v-card-text>
    
          <v-text-field
            v-model="lpAntiguo"
            label="Escriba el nombre del album a editar"
            single-line
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="lpNuevo"
            label="Escriba el nuevo nombre y pulse el icono del lápiz"
            single-line
            variant="outlined"
          ></v-text-field>

          </v-btn>
      </v-card-text>
    </v-card>

  </v-card>
</template>

<script>

import {mapState} from 'vuex'

export default {
  data() {
    return {
      album: '',
      lpAntiguo: '',
      lpNuevo: '',
      existe: false
    };
  },

  computed: {
    ...mapState(['albumes']),
    ...mapState(['artistas'])
  },

  methods: {
    guardarLp() {
        if (this.album.trim() !== '') { // Verificar si el album existe
            const comprobar = this.$store.state.albumes.includes(this.album);

            if (comprobar) {
                
                this.existe = true;

            } else {
                this.$store.commit('guardarLp', this.album);
                this.album = '';
            }
        }   
    },
    borrarLp(i) {
      this.$store.commit('borrarLp', i);
    },

    editarLp(i){
        if (this.lpAntiguo.trim() !== '') { // Verificar si el album existe
          const comprobar = this.$store.state.albumes.includes(this.lpAntiguo);

        if (comprobar) {           
        
            this.$store.commit('borrarLp', i); //Mismo procedimiento que para editar artistas.
            this.$store.commit('editarLp', this.lpNuevo);
            this.lpAntiguo = '';
            this.lpNuevo = '';


        } else {

            this.existe = false;

        }
      } 
    }

  }
};
</script>
