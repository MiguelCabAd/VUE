                                    //****************************************
                                    //*        MIGUEL CABELLO ADRADA.        *
                                    //****************************************

//Aplicación Principal.

<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dark
    >
      <div class="d-flex align-center">

        <v-img
          alt="Pokemon Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://1000logos.net/wp-content/uploads/2017/05/Pokemon-Logo.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

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
