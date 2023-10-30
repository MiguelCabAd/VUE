                        //******************************************************************************************
                        //EXPLICACION: En este componente se realiza una lista de tarjetas en las que se muestran  *
                        //los nombres de los artistas. Para cada nombre se añade un icono para editar y otro para  *
                        //eliminar. Para eliminar un artista, simplemente pulsar en el icono de la papelera, para  *
                        //editar, previamente hay que escribir el artista que se quiere editar y el nombre nuevo   *
                        //en la tarjeta que se muestra abajo, una vez hecho esto, pulsar en el icono del lapiz     *
                        //del artista. Para guardar un artista nuevo, simplemente escribir el nombre en la barra   *
                        //de texto y pulsar el botón de guardar.                                                   *
                        //******************************************************************************************

<template>
  <v-card>
    <h1 class="text-center">---------------------------ARTISTAS---------------------------</h1>

       <!--v-text-field v-model="artista" label="Introduzca un nombre"></v-text-field> 
            <v-btn @click="guardar">Guardar</v-btn-->

    <v-list>
        <v-list-item-group v-if="artistas.length > 0">
            <v-list-item v-for="(artista, i) in artistas" :key="i">
                <v-list-item-content>
                    <v-list-item-title>{{ artista }}</v-list-item-title>
                </v-list-item-content>
                
                <v-icon small @click="editar(i)" color="blue"> mdi-pencil </v-icon>
                <v-icon small @click="borrar(i)" color="red"> mdi-delete </v-icon>

            </v-list-item>
        </v-list-item-group>
    
        <v-list-item v-else>
             <v-list-item-content>No hay artistas.</v-list-item-content>
        </v-list-item>

    </v-list>

        <h1 class="text-center">Guardar Nuevos Artistas</h1>

        <v-text-field v-model="artista" label="Escriba un nombre y pulse Guardar"></v-text-field>
        <v-btn block  color = "blue" @click="guardar">Guardar</v-btn>

        <v-card
          class="mx-auto"
          elevation="1"
          max-width="500"
        >
        <v-card-title class="py-5 font-weight-black">Editar Artistas</v-card-title>
  
        <v-card-text>
      
            <v-text-field
              v-model="artistaAntiguo"
              label="Escriba el nombre del artista a editar"
              single-line
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="artistaNuevo"
              label="Escriba el nuevo nombre y pulse el icono del lápiz"
              single-line
              variant="outlined"
            ></v-text-field>

            </v-btn>
        </v-card-text>
      </v-card>

  <v-snackbar v-model="existe" color="error">
    ERROR: el artista ya existe.
    <v-btn color="white" @click="existe = false" light>Cerrar</v-btn>
  </v-snackbar>

  </v-card>
</template>

<script>

import {mapState} from 'vuex'

export default {
  data() {
    return {
      artista: '',
      artistaAntiguo: '', //Artista antiguo a editar.
      artistaNuevo: '', //Nombre para el Artista nuevo para editar.
      existe: false
    };
  },

  computed: {
    ...mapState(['artistas'])
  },

  methods: {
    guardar() {
        if (this.artista.trim() !== '') { //Verificar si el artista existe
            const comprobar = this.$store.state.artistas.includes(this.artista);

            if (comprobar) {
                
                this.existe = true; //Si el artista existe, se mostrará un mensaje de error.

            } else {
                this.$store.commit('guardar', this.artista);
                this.artista = '';
            }
        }   
    },
    borrar(i) {
      this.$store.commit('borrar', i);
    },

    editar(i){
        if (this.artistaAntiguo.trim() !== '') { // Verificar si el artista ya existe
          const comprobar = this.$store.state.artistas.includes(this.artistaAntiguo);

        if (comprobar) {           
        
            this.$store.commit('borrar', i); //Una vez se comprueba que el artista a editar existe, se borra el antiguo y se añade el nuevo.
            this.$store.commit('editar', this.artistaNuevo);
            this.artistaAntiguo = '';
            this.artistaNuevo = '';


        } else {

            this.existe = false;

        }
      }   
    }

  }
};
</script>
