<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" v-for="(item, index) in hColumns" :key="index">
            <div>
              {{ $i18n.translate(item.label) }}
            </div>
          </th>
          <th v-if="lAction" id="tableHeaderActions">
            <slot name="table-header-actions"></slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr scope="row" v-for="(rowObj, index) in items" :key="index">
          <td v-for="(rowValue, index) in getColumns(rowObj)" :key="index">
            {{ rowValue }}
          </td>
          <td
            v-if="lAction"
            :id="'tableAction' + index"
            :data-item="rowObj"
            @click="onActionClick($event, rowObj)"
          >
            <slot name="table-actions"></slot>
          </td>
        </tr>
      </tbody>
    </table>
    <paginacao
      @click="$emit('click')"
      v-bind:pathPaginaAtual="pathPaginaAtual1"
      v-bind:componentePaginacao="componentePaginacao"
    ></paginacao>
    <!--aqui Showing 1 to 5 of 6 records -->
    <!--Mostrando 1 a 5 de 6 registros -->
  </div>
</template>
<script>
import { ref } from "vue";
import paginacao from "../../components/paginacao/paginacao";
export default {
  components: {
    paginacao,
  },
  props: [
    "headerColumns",
    "items",
    "action",
    "componentePaginacao",
    "pathPaginaAtual",
  ],
  async setup(props, { emit }) {
    
    var hColumns = ref(props.headerColumns);
    var lAction = ref(props.action ? props.action : false);
    var lItems = ref(await props.items);
    let pathPaginaAtual1 = ref(props.pathPaginaAtual);
    let componentePaginacao = ref(props.componentePaginacao);
    //mostra e esconde os botoes da paginação
    let paginasBoll = false;
    console.log("componentePaginacao", componentePaginacao);

    if (componentePaginacao.value.totalDePaginas >= 2) {
      paginasBoll = true;
    }

    const getColumns = obj => {
      var columnsValues = [];
      //algum dia fazer mais bonito para as bixonas não reclamarem
      for (let index = 0; index < hColumns.value.length; index++) {
        const key = hColumns.value[index].key;
        columnsValues.push(obj[key]);
      }
      //   console.log("getRows test: ", columnsValues);
      return columnsValues;
    };
    const atualizaPaginacao = () => {
      // componentePaginacao.value = false;
        
      //   items.value = response.itens;
      console.log("chamou essa funcao")
      
    };
    atualizaPaginacao();
    const onActionClick = (e, obj) => {
      // console.log("Table: OnActionClick: ", e);
      e.item = obj;
      emit("on-action-click", e);
    };
    return {
      lAction,
      hColumns,
      lItems,
      pathPaginaAtual1,
      getColumns,
      onActionClick,
      paginasTeste: paginasBoll,
      atualizaPaginacao,
    };
  },
};
</script>

<style></style>
