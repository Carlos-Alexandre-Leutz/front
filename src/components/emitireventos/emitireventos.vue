<template>
  <div class="click-counter">
    You clicked {{$props.counter}} {{$props.counter !== 1 ? 'times' : 'time'}}
  </div>
</template>

<script>
export default {
  name: 'ClickCounter',
  props: {
    counter: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    counter: {
      handler (newVal) {
        if (newVal > 5) {
          this.$parent.messageShown = true
        }
      }
    }
  }
}
</script>