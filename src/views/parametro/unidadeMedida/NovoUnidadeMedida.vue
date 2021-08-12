<template>
  <div>
    <Tabs :tabs="tabs"> </Tabs>
    <form @submit="validarForm">
      <div v-if="tabs[0].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center">
                  {{ $i18n.translate("cadastro") }}
                  {{ $i18n.translate("de") }}
                  {{ $i18n.translate("unidadeMedida") }}
                </strong>
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <small>
                        {{ $i18n.translate("camposObrigatorio") }}
                      </small>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <label> * {{ $i18n.translate("descricao") }} </label>
                      <input
                        v-model="viewModel.descricao"
                        class="form-control"
                        type="text"
                        placeholder="Digite uma descrição"
                        maxlength="50"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <label> * {{ $i18n.translate("sigla") }} </label>
                      <input
                        v-model="viewModel.sigla"
                        class="form-control"
                        type="text"
                        maxlength="5"
                        placeholder="Digite uma sigla"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <label>* {{ $i18n.translate("tipo") }}</label>
                      <Multiselect
                        v-model="viewModel.tipo"
                        placeholder="Selecione o Tipo"
                        :options="optionsTipos"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <label>{{ $i18n.translate("fatorLactobacilos") }}</label>
                      <input
                        v-model="viewModel.fatorLactobacilos"
                        class="form-control"
                        type="number"
                        placeholder="Digite um Fator Lactobacilos"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="tabs[1].active">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="card shadow">
              <header class="card-header">
                <strong class="align-self-center">
                  {{ $i18n.translate("unidadeConversao") }}
                </strong>
              </header>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <small>
                        {{ $i18n.translate("camposObrigatorio") }}
                      </small>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-8 col-md-9 col-lg-9 col-xl-9">
                    <div class="form-group">
                      <label>
                        * {{ $i18n.translate("unidadeConversao") }}
                      </label>
                      <Multiselect
                        v-model="viewModelConversao.unidadeMedidaConversaoId"
                        placeholder="Selecione o Tipo"
                        :options="optionsUnidadeConversao"
                        :searchable="true"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-3 col-lg-3 col-xl-3">
                    <div class="form-group">
                      <label> * {{ $i18n.translate("fatorConversao") }} </label>
                      <input
                        v-model="viewModelConversao.fatorConversao"
                        class="form-control"
                        type="number"
                        placeholder="Digite um Fator de Conversão"
                      />
                    </div>
                  </div>
                </div>
                <div class="align-right mt-3 ml-1">
                  <button
                    class="btn-padrao btn-confirmar mr-1"
                    type="button"
                    v-on:click="salvarConversao()"
                  >
                    {{ $i18n.translate("adicionar") }}
                  </button>
                  <button
                    class="btn btn-secondary"
                    type="button"
                    v-on:click="limparCampos()"
                  >
                    {{ $i18n.translate("canselar") }}
                  </button>
                </div>
              </div>
            </div>
            <suspense>
              <template #default>
                <Table
                  class="table-bordless table-striped"
                  :headerColumns="hColumns"
                  :items="itemsConversao"
                  action="true"
                  @on-action-click="onEdit"
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
                        data-edit="1"
                        class="btn btn-sm btn-warning mr-2"
                        type="button"
                      >
                        {{ $i18n.translate("editar") }}
                      </button>
                      <button
                        data-edit="0"
                        class="btn btn-sm btn-danger"
                        type="button"
                      >
                        {{ $i18n.translate("deletar") }}
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
      </div>
      <div class="row">
        <div class="d-flex mt-3 ml-1">
          <button class="btn btn-success mr-2" type="submit">
            {{ $i18n.translate("salvar") }}
          </button>
          <button
            class="btn btn-secondary"
            type="reset"
            @click="$router.push('/unidadeMedida/1')"
          >
            {{ $i18n.translate("voltar") }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import servico from "../../../services/parametro/unidadeMedida.js";
import servicoSeletor from "../../../services/seletor.js";
import Multiselect from "@vueform/multiselect";
import Tabs from "../../../components/tabs/Tabs";
import Table from "../../../components/table/tablesimple";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
import enumSelect from "../../../services/enum/enum.js";

export default {
  setup() {
    const tabs = reactive([
      { name: "Unidade Medida", active: true }, //traduzir essa bigorna aqui depois
      { name: "Unidade Conversão", active: false },
    ]);

    const {
      params: { unidadeMedidaId },
    } = useRoute();

    const store = useStore();
    var optionsTipos = ref([]);
    var optionsUnidadeConversao = ref([]);
    var itemsConversao = ref([]);
    // var itemSelected = ref(null);

    var hColumns = ref([
      {
        key: "descricaoUndMedidaConversao",
        label: "Descrição",
      },
      {
        key: "fatorConversao",
        label: "Fator Conversão",
      },
    ]);

    const getId = () => {
      console.log("unidadeMedidaId:", unidadeMedidaId);
      return unidadeMedidaId ? unidadeMedidaId : store.state.emptyGuid;
    };

    var viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
      sigla: ref(""),
      tipo: ref(""),
      fatorLactobacilos: ref(""),
      unidadeConversao: ref([]),
    });

    var viewModelConversao = ref({
      id: ref(uuidv4()),
      unidadeMedidaId: ref(getId()),
      unidadeMedidaConversaoId: ref(""),
      descricaoUndMedidaConversao: ref(""),
      fatorConversao: ref(""),
      persistido: Boolean,
    });

    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
    const lang = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoAlertas.br;
      if (langDefault != "br") {
        langTrad = traducaoAlertas.es;
      }
      return langTrad;
    };
    const validarForm = e => {
      e.preventDefault();
      let lengBrEs = lang();
      let itemSelected = viewModel.value.descricao;
      let tipo = typeof viewModel.value.tipo;
      if (!viewModel.value.descricao || !viewModel.value.sigla) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `Prencha a aba unidade de medida`,
        });
      } else if (tipo == "number") {
        console.log("numbero");
        if (
          viewModel.value.id !== store.state.emptyGuid &&
          viewModel.value.id !== undefined
        ) {
          servico.edit(viewModel.value).then(response => {
            if (response.status == 200) {
              Swal.fire({
                icon: "success",
                title: `${lengBrEs.concluido}`,
                text: `${lengBrEs.oItem} "${itemSelected}" ${lengBrEs.foiEditado}.`,
              });
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} "${itemSelected}"  ${lengBrEs.naoFoiEditado}.`,
              });
            }
          });
        } else {
          console.log("viewmodel:", viewModel.value);
          servico.add(viewModel.value).then(response => {
            if (response.status == 200) {
              Swal.fire({
                icon: "success",
                title: `${lengBrEs.concluido}`,
                text: `${lengBrEs.oItem} "${itemSelected}" ${lengBrEs.foiAdicionado}.`,
              });
              viewModel.value.descricao = ref("");
              viewModel.value.sigla = ref("");
              viewModel.value.tipo = ref("");
              viewModel.value.fatorLactobacilos = ref("");
              viewModel.value.unidadeConversao = ref([]);
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} ${itemSelected} ${lengBrEs.naoFoiAdicionado}.`,
              });
            }
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    };

    const salvarConversao = () => {
      let lengBrEs = lang();

      if (
        (viewModelConversao.value.unidadeMedidaConversaoId &&
          viewModelConversao.value.fatorConversao != undefined) ||
        ""
      ) {
        viewModelConversao.value.descricaoUndMedidaConversao =
          optionsUnidadeConversao.value.find(
            f => f.value == viewModelConversao.value.unidadeMedidaConversaoId
          ).label;
      } else {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo} `,
        });
        return;
      }

      if (
        viewModelConversao.value.Id == undefined ||
        viewModelConversao.value.id == ""
      ) {
        viewModelConversao.value.Id = uuidv4();
        console.log("tava vazil");
      }
      var conversao = JSON.parse(JSON.stringify(viewModelConversao.value));
      console.log(conversao);
      var registroEdicao = viewModel.value.unidadeConversao.find(
        c => c.id == viewModelConversao.value.id
      );
      var undConversao = viewModel.value.unidadeConversao.find(
        c =>
          c.unidadeMedidaConversaoId ==
          viewModelConversao.value.unidadeMedidaConversaoId
      );

      if (registroEdicao !== undefined || undConversao !== undefined) {
        let usaIdUndConversao = false;
        if (registroEdicao === undefined) {
          registroEdicao = ref({});
          usaIdUndConversao = true;
        }
        registroEdicao.value = conversao;
        console.log("registroEdicao", registroEdicao.value);

        if (usaIdUndConversao) {
          registroEdicao.value.id = undConversao.id;
        }

        console.log("registroEdicao", registroEdicao.value);

        var item = viewModel.value.unidadeConversao.find(
          c => c.id == registroEdicao.value.id
        );
        console.log("item", item);
        item.unidadeMedidaConversaoId =
          registroEdicao.value.unidadeMedidaConversaoId;
        item.descricaoUndMedidaConversao =
          registroEdicao.value.descricaoUndMedidaConversao;
        item.fatorConversao = registroEdicao.value.fatorConversao;

        var conversaoLista = itemsConversao.value.find(
          e => e.id == registroEdicao.value.id
        );
        conversaoLista.descricaoUndMedidaConversao =
          registroEdicao.value.descricaoUndMedidaConversao;
        conversaoLista.fatorConversao = registroEdicao.value.fatorConversao;
        console.log(registroEdicao.value);
        console.log(conversaoLista);
      } else {
        conversao.persistido = false;
        viewModel.value.unidadeConversao.push(conversao);

        var conversaoGrid = ref({
          id: viewModelConversao.value.id,
          unidadeMedidaId: viewModel.value.id,
          descricaoUndMedidaConversao:
            viewModelConversao.value.descricaoUndMedidaConversao,
          fatorConversao: viewModelConversao.value.fatorConversao,
        });
        itemsConversao.value.push(conversaoGrid.value);
      }

      limparCampos();
    };
    const limparCampos = () => {
      viewModelConversao.value.id = ref(uuidv4());
      viewModelConversao.value.unidadeMedidaConversaoId = ref("");
      viewModelConversao.value.descricaoUndMedidaConversao = ref("");
      viewModelConversao.value.fatorConversao = ref("");
    };
    const onDelete = item => {
      try {
        var conversao = viewModel.value.unidadeConversao.find(
          c => c.id == item.id
        );
        if (conversao.persistido) {
          servico
            .removeConversao(conversao.unidadeMedidaId, conversao.id)
            .then(resp => {
              if (resp.status != 200) {
                Swal.fire({
                  icon: "error",
                  title: "Erro",
                  text: "Erro ao excluir Unidade Conversão!",
                }).then(a => {
                  if (a.isConfirmed) {
                    document.location.reload(true);
                  }
                });
              }
            });
        } else {
          var indexViewModel =
            viewModel.value.unidadeConversao.indexOf(conversao);
          viewModel.value.unidadeConversao.splice(indexViewModel, 1);
        }
        var indexGrid = itemsConversao.value.indexOf(item);
        itemsConversao.value.splice(indexGrid, 1);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao processar requisição!",
        });
      }
    };
    const onEdit = e => {
      if (!e || !e.target || !e.target.dataset) {
        console.log("Objeto Errado");
        return;
      }

      if (e.target.dataset.edit == 0) {
        Swal.fire({
          icon: "question",
          title: "Confirmar exclusão!",
          text: "Você confirma exclusão deste registro?",
          showCancelButton: true,
        }).then(response => {
          if (response.isConfirmed) {
            onDelete(e.item);
          }
        });
      } else {
        var conversao = viewModel.value.unidadeConversao.find(
          c => c.id == e.item.id
        );
        viewModelConversao.value = JSON.parse(JSON.stringify(conversao));
      }
    };
    onMounted(async () => {
      const ObterUnidadeMedida = async id => {
        var retorno = await servico.getId(id);
        viewModel.value.id = retorno.id;
        viewModel.value.descricao = retorno.descricao;
        viewModel.value.sigla = retorno.sigla;
        viewModel.value.tipo = retorno.tipo;
        viewModel.value.fatorLactobacilos = retorno.fatorLactobacilos;
        viewModel.value.unidadeConversao = retorno.unidadeConversao;
        itemsConversao.value = await servico.getGridConversao(unidadeMedidaId);
      };

      const obterSeletor = async url => {
        var retornoBack = await servicoSeletor.obterSeletorGenerico(url);
        var returnMetodo = [];
        retornoBack.forEach(e => {
          returnMetodo.push({ value: e.id, label: e.descricao });
        });
        console.log(returnMetodo);
        return returnMetodo;
      };

      optionsTipos.value = enumSelect.UnidadeMedidaTipo; //await obterSeletor("unidadeMedida/obter-seletor-tipos");
      optionsUnidadeConversao.value = await obterSeletor(
        "unidadeMedida/obter-seletor"
      );

      try {
        console.log("id:", unidadeMedidaId);
        if (unidadeMedidaId !== undefined) {
          ObterUnidadeMedida(unidadeMedidaId);
        }
      } catch (err) {
        console.error("Erro ao obter unidade de medida para edição", err);
      }
    });

    return {
      viewModel,
      viewModelConversao,
      getEditMode,
      store,
      servico,
      optionsTipos,
      optionsUnidadeConversao,
      tabs,
      hColumns,
      itemsConversao,
      Swal,
      validarForm,
      salvarConversao,
      onDelete,
      onEdit,
    };
  },
  components: { Multiselect, Tabs, Table },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>