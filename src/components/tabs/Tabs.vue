<template>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <a
        :class="'nav-item nav-link ' + getClassActive(tab.active)"
        @click="onClickTab(tab)"
        v-for="(tab, index) in tabs"
        :key="index"
        :hidden="tab.hidden"
      >
        {{ $i18n.translate(tab.name) }}
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["tabs"],
  setup(props, { emit }) {
    const onClickTab = tab => {
      emit("on-click-tab", tab);
      props.tabs.forEach(t => {
        t.active = false;
      });

      tab.active = true;
    };

    const getClassActive = active => {
      if (active) {
        return "active";
      }
      return "";
    };

    return {
      getClassActive,
      onClickTab
    };
  }
};
</script>

<style></style>
