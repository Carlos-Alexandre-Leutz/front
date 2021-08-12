<template>
  <transition>
    <li>
      <a @click="onCollapseClick(showMenuList, routerMenuPath)">
        <slot name="menu-name"> </slot>
        <!-- <span class="badge badge-pill badge-info float-right">03</span> -->
      </a>
      <transition
        name="menu-collapse"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
      >
        <ul v-show="showMenuList" aria-expanded="false" class="menu-collapse">
          <slot name="list-items"> </slot>
        </ul>
      </transition>
    </li>
  </transition>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  props: ["routerMenuPath"],
  setup() {
    var router = useRouter();
    var showMenuList = ref(false);

    const onCollapseClick = (e, path) => {
      showMenuList.value = !e;
      if (path) router.push(path);
    };

    const beforeEnter = el => {
      console.log("el collapse: ", el);
      el.style.height = "0";
    };

    const enter = el => {
      el.style.height = el.scrollHeight + "px";
    };

    const beforeLeave = el => {
      el.style.height = el.scrollHeight + "px";
    };

    const leave = el => {
      el.style.height = "0";
    };

    return {
      showMenuList,
      onCollapseClick,
      beforeEnter,
      enter,
      beforeLeave,
      leave
    };
  }
};
</script>

<style></style>
