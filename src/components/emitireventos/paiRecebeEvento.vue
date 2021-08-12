<template>
  <div class="home">
    <click-counter :counter="clickCount"/>
    <button @click="increaseCounter">Increase count</button>
    <p class="message" v-show="messageShown">You have clicked button more than 5 times!</p>
  </div>
</template>

<script>
import ClickCounter from './emitireventos.vue'
export default {
  name: 'Home',
  components: { ClickCounter },
  data () {
    return {
      clickCount: 0,
      messageShown: false
    }
  },
  methods: {
    increaseCounter () {
      this.clickCount++
    }
  }
}
</script>