                //*********************************************************************************************
                //EXPLICACION: En este componente se realiza una tabla para mostrar los álbumes con su        *
                //respectivo artista. También se añade una toolbar con un combobox para que se puedan ver     *
                //los artistas en formato lista y un botón para añadir un nuevo álbum a la tabla. Para borrar *
                //o editar, se hace uso de iconos con sus respectivos funcionamientos, para editar se muestra *
                //un desplegable para introducir la información para el nuevo álbum y para borrar se pregunta *
                //al usuario si desea confirmar la eliminación.                                               *
                //*********************************************************************************************

<template>

  <v-data-table
    :headers="headers"
    :items="albumes"
    sort-by="Nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          color="green"
      >
        <v-toolbar-title>ÁLBUMES</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

          <v-combobox
            label="Mostrar lista de Artistas"
            color="#BAFFEB"
            :items="artistas"
          ></v-combobox>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn  class="mb-2" color="green"v-bind="attrs" v-on="on">
              Nuevo Álbum
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.Nombre"
                      label="Nombre del Álbum"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <!--v-text-field
                      v-model="editedItem.Artista"
                      label="Nombre del Artista"
                    ></v-text-field-->

                    <v-combobox
                        v-model="editedItem.Artista"
                        label="Nombre del Artista"
                        :items="artistas"
                    ></v-combobox>


                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.Año"
                      label="Año"
                    >
                        
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>Eliminar Álbum</v-card-title>
              <v-card-text>
                  ¿Seguro que desea eliminar este álbum?
              </v-card-text>

            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cancelar">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="eliminar">Continuar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editar(item)" color="green"> mdi-pencil </v-icon>
      <v-icon small @click="borrar(item)" color="red"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>


export default {
  data: () => ({
    artista: null,
    dialog: false,
    dialogDelete: false,
    drawer: false,
    group: null,
    headers: [
      { text: "Nombre del Álbum", align: "start", value: "Nombre" },
      { text: "Nombre del Artista", value: "Artista" },
      { text: "Año", value: "Año" },
      { text: "Editar/Eliminar", value: "actions", sortable: false },
    ],
    albumes: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      Nombre: 0,
      Artista: 0,
      Año: 0,
    },
    defaultItem: {
      name: "",
      Nombre: 0,
      Artista: 0,
      Año: 0,
    },
  }),

  watch: {
      group () {
        this.drawer = false
      },
  },

  computed: {
    artistas(){
        return this.$store.state.artistas;
        return this.$store.state.albumes;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.albumes = [
        {
          Nombre: "AM",
          Artista: "Artic Monkeys",
          Año: "2013",
        },
        {
          Nombre: "The Suburbs",
          Artista: "Arcade Fire",
          Año: "2010",
        },
        {
          Nombre: "What Went Down",
          Artista: "Foals",
          Año: "2015",
        },
        {
          Nombre: "Melodrama",
          Artista: "Lorde",
          Año: "2017",
        },
        {
          Nombre: "Greatest Hits",
          Artista: "Carpenters",
          Año: "1972",
        },
        {
          Nombre: "Violator",
          Artista: "Depeche Mode",
          Año: "1990",
        },
      ];
    },

    editar(item) {
      this.editedIndex = this.albumes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    borrar(item) {
      this.editedIndex = this.albumes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    eliminar() {
      this.albumes.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    cancelar() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.albumes[this.editedIndex], this.editedItem);
      } else {
        this.albumes.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
