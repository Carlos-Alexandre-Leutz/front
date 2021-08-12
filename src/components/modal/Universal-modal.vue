<template>
  <vmodal name="example"
         @before-open="beforeOpen"
         @before-close="beforeClose">
    <span>Hello, {{ name }}!</span>
  </vmodal>
</template>
<script>
import vmodal from 'vue-js-modal'
export default {
  components:{
    vmodal
  },
  name: 'Example',
  data () {
    return {
      name: 'Tom'
    }
  },
  methods: {
    beforeOpen (event) {
      console.log(event)
      console.log('Opening...')
    },
    beforeClose (event) {
      console.log('Closing...')
      // What a gamble... 50% chance to cancel closing
      if (Math.random() < 0.5) {
        event.cancel()
      }
    }
  }
}
</script>