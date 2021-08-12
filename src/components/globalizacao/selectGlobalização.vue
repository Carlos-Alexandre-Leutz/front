<template>
  <div>
    <br />
    <div class="cont-select">
      <select
        v-model="idioma"
        class="form-select"
        id="select"
        @change="switchLanguage"
      >
        <option id="selectPortuges" value="br">Português</option>
        <option id="selectEspanhol" value="es">Espanhol</option>
      </select>
    </div>
  </div>
</template>
<script>
import { useI18n } from "../../../src/plugins/i18n/i18nPlugin";
export default {
  setup() {
    let idioma = localStorage.getItem("idioma") || "br";
    //verificar  se tem um idima setado no localstrog antes de iniciar a seção
    let langDefault = localStorage.getItem("idioma") || "br";
    const i18n = useI18n();
    if (langDefault == "es") {
      var locale = "es";
      i18n.locale.value = locale;
      localStorage.setItem("idioma", locale);
    }
    const switchLanguage = () => {
      var e = document.getElementById("select");
      var locale = e.options[e.selectedIndex].value;
      i18n.locale.value = locale;
      localStorage.setItem("idioma", locale);
      langDefault = locale;
    };
    return {
      switchLanguage,
      useI18n,
      langDefault,
      idioma
    };
  }
};
</script>
