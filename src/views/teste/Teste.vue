<template>
  <!-- <div>
    <Tabs :tabs="tabs" @on-click-tab="onClickTab"> </Tabs>
    <div v-if="tabs[0].active"></div>
    <div v-if="tabs[1].active"></div>
  </div>
  <div>
    <div class="form-group">
      <label>Tipo de Pessoa</label>
      <Select :options="options"></Select>
    </div>

  </div> -->
  <Select2 :multiplo="true" :items="items" />
</template>

<script>
import { reactive, ref } from "vue";
// import Tabs from "../../components/tabs/Tabs";
// import Select from "../../components/select/Select";
import Select2 from "../../components/select/Select2";

export default {
  setup() {
    //esse é o objeto tabs que eu estou falando como ele é reativo qualquer alteração que ele sofrer
    // ja vai alterar ele por padrão então logo vai aparecer algo
    // vc tem um exemplo dos panel
    const tabs = reactive([
      { name: "Tab1", active: true },
      { name: "Tab2", active: false }
    ]);

    console.log("Tabs: ", tabs);

    const onClickTab = tab => {
      console.log("Tab clicked! ", tab); // ta vendo aqui ao clicar la dentro do componente ele cham esse metodo
      //ai vc pode informar os objetos desta view para aparecerem ou sumirem por aqui
      // ou vc pode utilizar o proprio objeto tabs
    };

    const options = reactive([{ obj: "objeto1" }, { obj: "objeto2" }]);

    var items = ref(null);

    const onGetTeste = page => {
      if (!page) page = 1;
      try {
        //var resp = await servico.getGrid();
        var resp = [
          { id: "1", label: "Teste luis 1" },
          { id: "2", label: "Teste luis 2" },
          { id: "3", label: "Teste luis 3" },
          { id: "4", label: "Teste luis 4" }
        ];

        return resp;
      } catch (err) {
        console.error("Erro ao buscar teste!", err);
      }
    };

    items.value = onGetTeste();

    return { tabs, onClickTab, options, items, onGetTeste };
  },
  components: {
    // Tabs,
    // Select,
    Select2
  }
};
</script>

<style></style>
