<template>
  <div class="d-flex flex-column">
    <a
      v-if="true"
      class="ml-auto m-1 btn btn-sm btn-primary popover-content wmtooltip"
      href="/#/usuario/novo"
      :data-tooltip="$i18n.translate('adicionarUsuario')"
    >
      {{ $i18n.translate("adicionar") }}
    </a>
    <div class="card shadow">
      <div class="card-header">
        {{ $i18n.translate("usuarios") }}
      </div>
      <div v-if="componentePaginacao != undefined" class="card-body">
        <Suspense>
          <template #default>
            <Table
              class="table-borderless table-striped"
              :headerColumns="hColumns"
              :items="items"
              :componentePaginacao="componentePaginacao"
              pathPaginaAtual="usuario"
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
                  <button
                    data-edit="2"
                    class="btn btn-sm btn-primary mr-2 wmtooltip"
                    :data-tooltip="$i18n.translate('visualizar')"
                  >
                    <i data-edit="2" class="fas fa-eye"></i>
                  </button>
                  <button
                    :data-tooltip="$i18n.translate('editar')"
                    data-edit="1"
                    class="btn btn-sm btn-warning mr-2 wmtooltip"
                  >
                    <i data-edit="1" class="fas fa-edit"></i>
                  </button>
                  <button
                    :data-tooltip="$i18n.translate('excluir')"
                    data-edit="0"
                    class="btn btn-sm btn-danger wmtooltip"
                  >
                    <i data-edit="0" class="fas fa-trash-alt"></i>
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
import Table from "../../../../src/components/table/Table.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import servico from "../../../../src/services/usuario/usuario";
import Swal from "sweetalert2";
import traducaoAlertas from "../../../plugins/i18n/alertas";

export default {
  setup() {
    const {
      params: { page },
    } = useRoute();
    const getpage = () => {
      return page ? page : store.state.page;
    };
    getpage();
    var router = useRouter();
    var store = useStore();
    var items = ref(null);
    var itemSelected = ref(null);
    let componentePaginacao = ref(null);
    let hColumns = ref([
      { key: "nome", label: "nome" },
      { key: "email", label: "email" },
    ]);
    const lang = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoAlertas.br;
      if (langDefault != "br") {
        langTrad = traducaoAlertas.es;
      }
      return langTrad;
    };
    const onEdit = e => {
      let lengBrEs = lang();
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }
      if (e.target.dataset.edit == 1) {
        console.log("Editar", e.item.id);
        router.push("/usuario/editar/" + e.item.id);
      }
      if (e.target.dataset.edit == 2) {
        console.log("Editar", e.item.id);
        router.push("/usuario/visualizar/" + e.item.id + "/visualizar");
      }
      if (e.target.dataset.edit == 0) {
        itemSelected = e.item.id;
        console.log(e.item);
        let descricaoItemSelected = e.item.email;
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
                  }
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: `${lengBrEs.erro}`,
                  text: `${lengBrEs.erro} "${descricaoItemSelected}  ${response.status} "  ${lengBrEs.naoFoiExcluido}`,
                });
              }
            });
          }
        });
      }
    };
    const reduzDescricao = str => {
      if (str.length >= 20) {
        return str.substring(0, 20) + "...";
      } else {
        return str;
      }
    };
    function atualizarComp() {
      var names = document.location.href;
      var nameList = names.split("/");
      let page = nameList[nameList.length - 1];
      componentePaginacao.value = false;
      servico.getGridPage(page).then(response => {
        componentePaginacao.value = response;
        response.itens.forEach(index => {
          index.email = reduzDescricao(index.email);
          index.nome = reduzDescricao(index.nome);
        });
        items.value = response.itens;
      });
    }
    onMounted(async () => {
      const onGetitensTabela = async page => {
        if (!page) page = 1;
        try {
          var resp = await servico.getGridPage(page);
          console.log("resp", resp);
          resp.itens.forEach(index => {
            index.email = reduzDescricao(index.email);
            index.nome = reduzDescricao(index.nome);
          });
          return [resp.itens, resp]; //paginação
        } catch (err) {
          console.error("Erro ao buscar grupos de usuário!", err);
        }
      };
      let itensPaginacao = await onGetitensTabela(page);
      items.value = itensPaginacao[0];
      componentePaginacao.value = itensPaginacao[1];
    });

    return {
      items,
      componentePaginacao,
      hColumns,
      onEdit,
      reduzDescricao,
      atualizarComp,
    };
  },
  components: {
    Table,
  },
};
</script>

