<template>
  <div class="d-flex flex-column">
    <a
      v-if="true"
      class="ml-auto m-1 btn btn-sm btn-primary"
      href="/#/floral/novo"
      :title="floral"
    >
      {{ $i18n.translate("adicionar") }}
    </a>
    <div class="card shadow">
      <div class="card-header">
        {{ $i18n.translate("floral") }}
      </div>
      <div v-if="componentePaginacao" class="card-body">
        <Suspense>
          <template #default>
            <Table
              class="table-borderless table-striped"
              :headerColumns="hColumns"
              :items="items"
              :componentePaginacao="componentePaginacao"
              pathPaginaAtual="floral"
              action="true"
              @on-action-click="onEdit"
              v-on:click="atualizarComp"
            >
              <template v-slot:table-header-actions>
                <div
                  class="
                    d-flex
                    flex-center
                    justify-content-center
                    align-items-center
                  "
                >
                  {{ $i18n.translate("acoes") }}
                </div>
              </template>
              <template v-slot:table-actions>
                <div
                  class="
                    d-flex
                    flex-center
                    justify-content-center
                    align-items-center
                  "
                >
                  <button data-edit="1" class="btn btn-sm btn-warning mr-2">
                    {{ $i18n.translate("editar") }}
                  </button>
                  <button data-edit="0" class="btn btn-sm btn-danger">
                    {{ $i18n.translate("deletar") }}
                  </button>
                </div>
              </template>
            </Table>
          </template>
          <template #fallback>
            {{ $i18n.translate("carregandoTabela") }}
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>
<script>
import Table from "../../../components/table/Table";
import { ref, inject, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import servico from "../../../services/venda/floral";
import Swal from "sweetalert2";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import traducaoParametros from "../../../plugins/i18n/parametros"
export default {
  setup() {
    // levar para dentro do componente de paginação se der
    let {
      params: { page }, // depois fazer uma parada pra quando n tiver o paramerto da pagina navegar para pagina 1
    } = useRoute();
    const getpage = () => {
      return page ? page : store.state.page;
    };
    getpage();
    let router = useRouter();
    let store = useStore();
    let items = ref(null);
    let itemSelected = ref(null);
    let componentePaginacao = ref(null);
    let hColumns = ref([
      {
        key: "volume",
        label: "volume",
      },
      {
        key: "qtdInicialTabela",
        label: "qtdInicialTabela",
      },
      {
        key: "qtdFinalTabela",
        label: "qtdFinalTabela",
      },
      {
        key: "valorVendaTabela",
        label: "valorVendaTabela",
      },
    ]);
    //criar um inject/lib desse codigo
    const defaultModal = inject("defaultModal");
    const defaultModalActions = inject("defaultModalActions");
    //criar um inject desse codigo
    const lang = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoAlertas.br;
      if (langDefault != "br") {
        langTrad = traducaoAlertas.es;
      }
      return langTrad;
    };
    const langParametos = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoParametros.br;
      if (langDefault != "br") {
        langTrad = traducaoParametros.es;
      }
      return langTrad;
    };
    let floral;
    let languagePageNow = langParametos();
    floral = `${languagePageNow.add} ${languagePageNow.floral}`;
  
    const onEdit = e => {
      let lengBrEs = lang();
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }
      if (e.target.dataset.edit == 1) {
        console.log("Editar", e.item.id);
        router.push("/floral/editar/" + e.item.id);
      }
      if (e.target.dataset.edit == 0) {
        itemSelected = e.item.id;
        console.log(e.item);
        let descricaoItemSelected = e.item.volume;
        Swal.fire({
          icon: "question",
          title: `${lengBrEs.desejaExcluir}`,
          confirmButtonText: `${lengBrEs.sim}`,
          text: ` ${lengBrEs.oItem} ${lengBrEs.comVolume}  "${descricaoItemSelected}"?`,
          showCancelButton: true,
          cancelButtonText: `${lengBrEs.canselar}`,
        }).then(response => {
          if (response.isConfirmed) {
            servico.remove(itemSelected).then(response => {
              if (response.status == 200) {
                Swal.fire({
                  icon: "success",
                  title: `${lengBrEs.concluido}`,
                  text: `${lengBrEs.oItem} "${descricaoItemSelected}" ${lengBrEs.foiExcluido} `,
                }).then(result => {
                  if (result.isConfirmed) {
                    atualizarComp();
                  } else {
                    atualizarComp();
                  }
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: `${lengBrEs.erro}`,
                  text: `${lengBrEs.erro} ${response.status} "${descricaoItemSelected}"  ${lengBrEs.naoFoiExcluido}`,
                });
              }
            });
          }
        });
      }
    };
    function atualizarComp() {
      var names = document.location.href;
      var nameList = names.split("/");
      let page = nameList[nameList.length - 1];
      componentePaginacao.value = false;
      servico.getGridPage(page).then(response => {
        componentePaginacao.value = response;
        items.value = response.itens;
      });
    }
    onMounted(async () => {
      const onGetitensTabela = async page => {
        if (!page) page = 1;
        try {
          var resp = await servico.getGridPage(page);
          return [resp.itens, resp]; //paginação
        } catch (err) {
          console.error("Erro ao buscar grupos de usuário!", err);
        }
      };
      let itensPaginacao = await onGetitensTabela(page);
      items.value = itensPaginacao[0];
      componentePaginacao.value = itensPaginacao[1]; //paginação
      const onDelete = async item => {
        try {
          await servico.remove(item.id, store.state.contaFake);
          items.value = await onGetitensTabela();
        } catch (err) {
          console.error("Erro ao buscar grupos de usuário!", err);
        }
      };
      watch(defaultModalActions, actions => {
        if (actions.confirmAction) onDelete(itemSelected);
      });
    });
    return {
      items,
      componentePaginacao,
      hColumns,
      onEdit,
      defaultModal,
      atualizarComp,
      floral,
    };
  },
  components: {
    Table,
  },
};
</script>
