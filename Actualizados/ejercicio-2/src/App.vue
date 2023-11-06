                                    //****************************************
                                    //*        MIGUEL CABELLO ADRADA.        *
                                    //****************************************

//Aplicación Principal.

<template>
  <v-app>
    <v-app-bar
      app
      color="green"
      dark
    >
      <div class="d-flex align-center">

        <v-img
          alt="Hp Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://logos-world.net/wp-content/uploads/2020/12/Hogwarts-Logo.png"
          width="140"
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
