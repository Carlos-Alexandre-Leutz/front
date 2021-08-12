<template>
    <button @click="switchLanguage">Switch language</button>
</template>
<script>
import { useI18n } from "../../../src/plugins/i18n/i18nPlugin"
export default {
  setup() {
    const i18n = useI18n();
    const switchLanguage = () => {
      const locale = i18n.locale.value === "br" ? "es" : "br";
      i18n.locale.value = locale;
    };
    return{
      switchLanguage,
      useI18n      
    }
  }
}
</script>