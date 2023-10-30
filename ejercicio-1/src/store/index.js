import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artistas:['Arctic Monkeys','Arcade Fire','Foals', 'Lorde', 'Carpenters', 'Bruce Springsteen', 'Roosvelt', 'Depeche Mode'],
    albumes:['Arctic Monkeys - AM','Arcade Fire - The Suburbs','Foals - What Went Down', 'Lorde - Melodrama', 'Carpenters - Greatest Hits', 'Bruce Springsteen - Born in the USA', 'Roosvelt - Polydance', 'Depeche Mode - Violator']
  },
  getters: {
  },
  mutations: {
    guardar(state, artista){ //METODOS PARA ARTISTAS.
      state.artistas.push(artista);
    },
    borrar(state, i){
      state.artistas.splice(i,1);
    },
    editar(state, nombre){
      state.artistas.unshift(nombre);
    },


    guardarLp(state, album){ //METODOS PARA ALBUMES.
      state.albumes.push(album);
    },
    borrarLp(state, i){
      state.albumes.splice(i,1);
    },
    editarLp(state, nombre){
      state.albumes.unshift(nombre);
    }
  },
  actions: {
  },
  modules: {
  }
})
