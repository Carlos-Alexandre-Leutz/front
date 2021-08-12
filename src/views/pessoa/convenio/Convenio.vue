<template>
  <div class="d-flex flex-column">
    <a
      v-if="true"
      class="ml-auto m-1 btn btn-sm btn-primary"
      href="/#/convenio/novo"
      :title="title"
    >
      {{ $i18n.translate("adicionar") }}
    </a>
  </div>
  <div class="card shadow">
    <div class="card-header">
      {{ $i18n.translate("convenio") }}
    </div>
    <div v-if="componentePaginacao != undefined" class="card-body">
      <suspense>
        <template #default>
          <Table
            class="table-bordless table-striped"
            :headerColumns="hColumns"
            :items="items"
            :componentePaginacao="componentePaginacao"
            pathPaginaAtual="convenio"
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
                  class="d-flex flex-center justify-content-center align-items-center"
                >
                  <button
                    data-edit="2"
                    class="btn btn-sm btn-primary mr-2"
                    :title="visualizar"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <button :title="editar" data-edit="1" class="btn btn-sm btn-warning mr-2">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button :title="excluir" data-edit="0" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
            </template>
          </Table>
        </template>
        <template #fallback>
          {{ $i18n.translate("carregandoTabela") }}
        </template>
      </suspense>
    </div>
  </div>
</template>
<script>
import Table from "../../../components/table/Table";
import { ref, inject, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import servico from "../../../services/pessoa/convenio";
import Swal from "sweetalert2";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import traducaoParametros from "../../../plugins/i18n/parametros"
export default {
  setup() {
    const {
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
        key: "nome",
        label: "nome",
      },
      {
        key: "desconto",
        label: "desconto",
      },
    ]);
    const defaultModal = inject("defaultModal");
    const defaultModalActions = inject("defaultModalActions");
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
    let title;
    let languagePageNow = langParametos();
    title = ` ${languagePageNow.add} ${languagePageNow.convenio}`;

    const onEdit = e => {
      let lengBrEs = lang();
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }
      if (e.target.dataset.edit == 1) {
        router.push("/convenio/editar/" + e.item.id);
      }
      if (e.target.dataset.edit == 2) {
        console.log("visualizar");
        router.push("/convenio/visualizar/" + e.item.id + "/visualizar");
      }
      if (e.target.dataset.edit == 0) {
        itemSelected = e.item.id;
        console.log(e.item);
        let descricaoItemSelected = e.item.nome;
        Swal.fire({
          icon: "question",
          title: `${lengBrEs.desejaExcluir}`,
          confirmButtonText: `${lengBrEs.sim}`,
          text: ` ${lengBrEs.oItem}  "${descricaoItemSelected}"?`,
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
          items.value = await onGetitensTabela().then;
        } catch (err) {
          console.error("Erro ao buscar Tipo de contato!", err);
        }
      };
      watch(defaultModalActions, actions => {
        if (actions.confirmAction) onDelete(itemSelected);
      });
    });

    return {
      items,
      hColumns,
      onEdit,
      defaultModal,
      componentePaginacao,
      atualizarComp,
      title
    };
  },
  components: {
    Table,
  },
};
</script>
