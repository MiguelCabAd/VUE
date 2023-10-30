                          //**************************************************************
                          //EXPLICACIÓN: Se crean tantas tarjetas como elementos tenga   *
                          //el array "pokedex", que contiene elementos de tipo axios con *
                          //los nombres de los pokemon que se van guardando en el método *
                          // "mostrarPokedex".                                           *
                          //**************************************************************


<template>
  <v-card>

        <h1 class="text-center"POKEMON</h1>
        <v-btn block  color = "yellow" @click="mostrarPokedex">Mostrar Pokedex</v-btn>

    <v-list>
        <v-list-item-group v-if="pokedex.length > 0">
            <v-list-item v-for="(pkm, i) in pokedex" :key="i">
                <v-list-item-content>
                
                    <v-list-item-title>{{ pkm.name }}</v-list-item-title> 

                </v-list-item-content>          
            </v-list-item>
        </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>

  import axios from 'axios'; //Se importa Axios.

  export default {
    name: 'HelloWorld',

    data(){
      return{

        pokedex: [] //Array para almacenar los objetos de tipo pokemon.
        
      };
      
    },
    created(){

    },

    methods: {

      mostrarPokedex() {
        let instance = this;
      
        axios
        .get("http://pokeapi.co/api/v2/evolution-chain/1")
        .then((response) => {              
            let pokemon = {
              name: response.data.chain.species.name,
              //informacion: response.data.chain.species.url
            };

            instance.pokedex.push(pokemon);
            //console.log(response.data.chain.species.url);
            console.log(response);
        })
        .catch((err) => {

          console.log(err);

        });

        axios
        .get("http://pokeapi.co/api/v2/evolution-chain/2")
        .then((response) => {              
            let pokemon = {
              name: response.data.chain.species.name,
              //informacion: response.data.chain.species.url
            };

            instance.pokedex.push(pokemon);
            //console.log(response.data.chain.species.url);
            console.log(response);
        })
        .catch((err) => {

          console.log(err);

        });

        axios
        .get("http://pokeapi.co/api/v2/evolution-chain/3")
        .then((response) => {              
            let pokemon = {
              name: response.data.chain.species.name,
              //informacion: response.data.chain.species.url
            };

            instance.pokedex.push(pokemon);
            //console.log(response.data.chain.species.url);
            console.log(response);
        })
        .catch((err) => {

          console.log(err);

        });

        axios
        .get("http://pokeapi.co/api/v2/evolution-chain/4")
        .then((response) => {              
            let pokemon = {
              name: response.data.chain.species.name,
              //informacion: response.data.chain.species.url
            };

            instance.pokedex.push(pokemon);
            //console.log(response.data.chain.species.url);
            console.log(response);
        })
        .catch((err) => {

          console.log(err);

        });

        axios
        .get("http://pokeapi.co/api/v2/evolution-chain/5")
        .then((response) => {              
            let pokemon = {
              name: response.data.chain.species.name,
              //informacion: response.data.chain.species.url
            };

            instance.pokedex.push(pokemon);
            //console.log(response.data.chain.species.url);
            console.log(response);
        })
        .catch((err) => {

          console.log(err);

        });
        //console.log(this.pokedex);        
      }
    }
  };
</script>
