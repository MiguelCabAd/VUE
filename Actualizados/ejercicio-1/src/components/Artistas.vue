                        //******************************************************************************************
                        //EXPLICACION: En este componente se realiza una lista de tarjetas en las que se muestran  *
                        //los nombres de los artistas. Para cada nombre se añade un icono para editar y otro para  *
                        //eliminar. Para eliminar un artista, simplemente pulsar en el icono de la papelera, para  *
                        //editar, previamente hay que escribir el artista que se quiere editar y el nombre nuevo   *
                        //en la tarjeta que se muestra, una vez hecho esto, pulsar en guardar.                     * 
                        //Para guardar un artista nuevo, simplemente escribir el nombre en la barra                *
                        //de texto y pulsar el botón de guardar.                                                   *
                        //******************************************************************************************

<template>
  <v-card>
    <v-app-bar
          color="blue accent-4"
          dark         
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>ARTISTAS</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item v-for="(artista, i) in artistas" :key="i">
                <v-list-item-content>
                  <v-list-item-title>{{artista}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>

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

        <v-snackbar v-model="existe" color="error">
          ERROR: el artista ya existe.
          <v-btn color="white" @click="existe = false" light>Cerrar</v-btn>
        </v-snackbar>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Editar artista</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-text-field  v-model="artistaEditado" label="Nombre"></v-text-field>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" variant="text" @click="close">Cancelar</v-btn>
                    <v-btn color="blue" variant="text" @click="save">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
      existe: false,
      artistaEditado: '', //Artista a guardar tras la edicion. 
      editedIndex: null,
      dialog: false,//Para la opcion de Editar.
      drawer: false,
      group: null,
    };
  },

  watch: {
      group () {
        this.drawer = false
      },
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
        this.artistaEditado = this.artistas[i];
        this.editedIndex = i;   
        this.dialog = true;
    },

    close() {
        this.dialog = false;
        this.editedArtista = '';
        this.editedIndex = null;
    },

    save() {
        if (this.artistaEditado.trim() !== '') { //Verificar si el artista existe
            const comprobar = this.$store.state.artistas.includes(this.artistaEditado);

            if (comprobar) {
                
                this.existe = true; //Si el artista existe, se mostrará un mensaje de error.

            } else {
              if(this.indiceEditado !== null){
                this.artistas[this.editedIndex]=this.artistaEditado;
              }
              this.artistaEditado = '';
              this.editedIndex  = null;
              this.close();
            }
        }  
    }
  }
};
</script>
