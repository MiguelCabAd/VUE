                        //*********************************************************************************************
                        //EXPLICACION: En este componente se realiza una lista de tarjetas en las que se muestran los *
                        //nombres de los personajes de Harry Potter junto a su raza y su patronus. Con un v-for       *
                        //se recorre el array personajes y se va montando cada tarjeta con los textos y la imagen     *
                        //correspondiente (esta API trae mucha información y se podría añadir mucha más). Para hacer  *
                        //la petición se realiza un GET y se espera al response, de donde se consigue la información  *
                        //para el array personajes.                                                                   *
                        //*********************************************************************************************

<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Harry Potter Characters</h2>
      </v-col>
    </v-row>
    
    <v-row dense>
      <v-col cols="12">
      <ul v-for="personaje in personajes" :key="personaje.id">
       <v-card
            color="#BAFFEB"
            >

            <v-avatar
                class="ma-3"
                size="125"
                tile
              >
              <v-img :src="personaje.image"></v-img>
            </v-avatar>

            <v-card-title>{{ personaje.name }}</v-card-title>
            <v-card-text>{{ personaje.house }}</v-card-text>
            <v-card-text>{{ personaje.species }}</v-card-text>
            <v-card-text>{{ personaje.patronus }}</v-card-text>          

        </v-card> 
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from 'axios'; //Se importa Axios.

export default {
  name: 'peticion',

  data() {
    return {

      personajes: [] //Array dónde se guarda toda la información de la API.
    
    };
  },

  created(){

  },

  methods: {
    mostrarPersonajesHp() {
      axios
        .get("https://hp-api.onrender.com/api/characters")
        .then((response) => {
          this.personajes = response.data;
        });
    },
  },
  mounted() {
    this.mostrarPersonajesHp(); //Con mounted, se invoca la función para mostrar la página.
  },
};
</script>
