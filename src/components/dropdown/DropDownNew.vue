<template>
  <div v-click-outside="onClickOutside" class="dropdown btn-group">
    <button class="btn dropdown-toggle" @click="onMainButtonClick(show)">
      <slot name="main-button-icon"></slot>
      <slot name="main-button-text"></slot>
    </button>
    <ul class="dropdown-menu dropdown-content" :class="showClass()">
      <slot name="list-items"></slot>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: [""],
  setup() {
    var show = ref(false);

    const onMainButtonClick = e => {
      show.value = !e;
    };

    const close = () => {
      show.value = false;
    };

    const showClass = () => {
      if (show.value) {
        return "show";
      }

      return "";
    };

    const onClickOutside = () => {
      close();
    };

    return { show, onMainButtonClick, showClass, close, onClickOutside };
  }
};
</script>

<style></style>
