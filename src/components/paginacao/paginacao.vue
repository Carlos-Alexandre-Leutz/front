<template>
  <div>
    <pagination
      v-if="PaginacaoVazia"
      class="paginacao"
      v-model="page"
      :per-page="perPage"
      :records="records"
      @paginate="navegar"
    />

    <!-- {{ $i18n.translate("mostrando") }}
    {{ $i18n.translate(mostrandoDe) }}
    {{ $i18n.translate("a") }}
    {{ $i18n.translate(mostrandoAte) }}
    {{ $i18n.translate("de") }}
    {{ $i18n.translate(records) }}
    {{ $i18n.translate("registros") }} -->
  </div>
</template>
<script>
//tem que alterar a forma como comunica o clique pq ta pegando do componente de tabel inteiro

import { useRouter, useRoute } from "vue-router";
import pagination from "v-pagination-3";
import { useStore } from "vuex";
//import vue from "vue"
export default {
  components: { pagination },
  props: ["componentePaginacao", "pathPaginaAtual"],
  data(props) {
    const {
      params: { page }, // depois fazer uma parada pra quando n tiver o paramerto da pagina navegar para pagina 1
    } = useRoute();
    const getpage = () => {
      return page ? page : store.state.page;
    };
    getpage();

    let router = useRouter();
    let store = useStore();

    let mostrandoDe;
    let mostrandoAte;
    let pagina = props.componentePaginacao;
    let pathPaginaAtual = props.pathPaginaAtual;
    let paginaAtual = pagina.pagina;
    let totalItens = pagina.total;
    let itensPorPagina = pagina.itensPorPagina;
    let totalDePaginas = pagina.totalDePaginas;
    let PaginacaoVazia = false;
    // const verificaRegistros = (
    //   paginaAtual,
    //   totaldeRegistros,
    //   itensPorPagina
    // ) => {
    //   console.log(paginaAtual, totaldeRegistros, itensPorPagina, totalDePaginas);
    //   if (paginaAtual > 1) {
    //     let restoDivisao = totaldeRegistros % itensPorPagina;
    //     console.log("restoDivisao", restoDivisao);
    //     console.log("totalDePaginas", totalDePaginas);


    //     let divisao = totaldeRegistros % itensPorPagina;
    //     console.log("de", divisao,"ate", divisao + itensPorPagina - 1, "de", totaldeRegistros ,"registros");


    //   } else {
    //     let divisao = totaldeRegistros % itensPorPagina;
    //     console.log("de", divisao,"ate", divisao + itensPorPagina - 1, "de", totaldeRegistros ,"registros");


    //   }
    // };
    // verificaRegistros(paginaAtual, totalItens, itensPorPagina,totalDePaginas);

    if (totalDePaginas != 1) {
      PaginacaoVazia = true;
    }
    const navegar = a => {
      router.push(`/${pathPaginaAtual}/${a}`);
    };
    const recaregarComponente = () => {
      PaginacaoVazia = false;
    };
    return {
      recaregarComponente,
      PaginacaoVazia,
      navegar,
      page: paginaAtual,
      records: totalItens,
      perPage: itensPorPagina,
      mostrandoDe,
      mostrandoAte,
      //verificaRegistros,
    };
  },
};
</script>
<style scoped>
.paginacao {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}
</style>