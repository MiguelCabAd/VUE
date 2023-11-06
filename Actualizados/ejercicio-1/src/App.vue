                                          //*******************************
                                          //* MIGUEL CABELLO ADRADA.      *
                                          //*******************************

//Aplicación Principal --> El programa empieza por aquí. En el "router-view" se cargan los enlaces que se quieran poner a otras páginas.

<template>
  <v-app>
    

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
