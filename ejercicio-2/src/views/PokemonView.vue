//Vista para el componente creado.


<template>
  <Pokemon />
</template>

<script>
  import Pokemon from '../components/Pokemon'

  export default {
    name: 'Home',

    components: {
      Pokemon,
    },
  }
</script>
