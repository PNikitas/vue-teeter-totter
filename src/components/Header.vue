<template>
  <nav class="header">
    <button @click="pause">
      {{ isPause ? 'Resume' : 'Pause' }}
    </button>
    <button @click="start">
      Start
    </button>
    <button @click="autoplay">
      Autoplay: {{ isAutoplay ? 'ON' : 'OFF' }}
    </button>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'TeeterBoard',
  props: {
    pause: {type: Function, required: true},
    start: {type: Function, required: true},
    autoplay: {type: Function, required: true},
  },
  computed: {
    ...mapGetters(['isPause', 'isAutoplay']),
  }
};
</script>

<style scoped>
.header {
  z-index: 300;
  width: 100%;
  background: green;
}
</style>