<template>
  <div>    
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback> Carregando pagina... </template>
    </Suspense>
  </div>
</template>

<script>
import { provide, reactive } from "vue";

export default {
  components: {},
  setup() {
    const defaultModal = reactive({
      show: false,
      title: "",
      bodyMessage: "",
    });

    const defaultModalActions = reactive({
      confirmAction: false,
      cancelAction: false,
    });

    provide("defaultModal", defaultModal);
    provide("defaultModalActions", defaultModalActions);

    const onClickExample = () => {
      console.log("Getting axios instance: ", this.$http);
    };
    return { onClickExample };
  },
  mounted() {
    console.log("Getting Axios Instance: ", this.$http);
  },
};
</script>
