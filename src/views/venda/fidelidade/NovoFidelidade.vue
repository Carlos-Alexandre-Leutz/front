<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("fidelidade") }}
              </strong>
            </header>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>{{ $i18n.translate("camposObrigatório") }}</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a Descrição"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("pontosIniciais") }}</label>
                    <input
                      v-model="viewModel.pontosIniciais"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a Descrição"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label
                      >*{{ $i18n.translate("pontosPrimeiraCompra") }}</label
                    >
                    <input
                      v-model="viewModel.pontosPrimeiraCompra"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a Descrição"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("validadePontos") }}</label>
                    <input
                      v-model="viewModel.validadePontos"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a Descrição"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("avisarCom") }}</label>
                    <input
                      v-model="viewModel.avisoCliente"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a Descrição"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card shadow mt-2">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("formaPagamento") }}
              </strong>
            </header>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>{{ $i18n.translate("camposObrigatório") }}</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("formaPagamento") }}</label>
                    <Multiselect
                      v-model="
                        viewModelFormaPagamento.fidelidadeFormasPagamento
                      "
                      placeholder="Selecione a forma de pagamento"
                      :searchable="true"
                      :options="optionsFormaPagamento"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("valor") }}</label>
                    <input
                      v-model="viewModelFormaPagamento.valor"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a Descrição"
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("pontos") }}</label>
                    <input
                      v-model="viewModelFormaPagamento.pontos"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a Descrição"
                    />
                  </div>
                </div>
              </div>
              <div class="align-right mt-3 ml-1">
                <button
                  class="btn-padrao btn-confirmar mr-1"
                  type="button"
                  v-on:click="validaCadastros('formaPagamento')"
                >
                  {{ $i18n.translate("adicionar") }}
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  v-on:click="limparCampos()"
                >
                  {{ $i18n.translate("cancelar") }}
                </button>
              </div>
            </div>
          </div>
          <suspense>
            <template #default>
              <Table
                class="table-bordless table-striped"
                :headerColumns="hColumns"
                :items="itemsFormaPagamento"
                action="true"
                @on-action-click="onEditFormaPagamento"
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


          <div class="card shadow mt-2">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("premeios") }}
              </strong>
            </header>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>{{ $i18n.translate("camposObrigatório") }}</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("produto") }}</label>
                    <Multiselect
                      v-model="viewModelpremio.produtoId"
                      placeholder="Selecione o produto"
                      :searchable="true"
                      :options="optionsFormaPagamento"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("pontos") }}</label>
                    <input
                      v-model="viewModelpremio.pontos"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a Descrição"
                    />
                  </div>
                </div>
              </div>
              <div class="align-right mt-3 ml-1">
                <button
                  class="btn-padrao btn-confirmar mr-1"
                  type="button"
                  v-on:click="validaCadastros('premio')"
                >
                  {{ $i18n.translate("adicionar") }}
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  v-on:click="limparCampos()"
                >
                  {{ $i18n.translate("cancelar") }}
                </button>
              </div>
            </div>
          </div>
          <suspense>
            <template #default>
              <Table
                class="table-bordless table-striped"
                :headerColumns="hColumnsPremio"
                :items="itemsPremio"
                action="true"
                @on-action-click="onEditPremio"
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

          <div class="d-flex mt-3 ml-1">
            <button class="btn btn-success mr-2" type="submit">
              {{ $i18n.translate("salvar") }}
            </button>
            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/fidelidade/1')"
            >
              {{ $i18n.translate("voltar") }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/venda/fidelidade/fidelidade";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
import Table from "../../../components/table/tablesimple";
import { v4 as uuidv4 } from "uuid";

export default {
  components: { Multiselect, Table },
  setup() {
    const {
      params: { grupoUsuarioId },
    } = useRoute();
    let viewModelFidelidadeFormasPagamento = ref({});
    let optionsFormaPagamento = ref([]);
    let retornoFormaPagamento = [];
    const store = useStore();
    const getId = () => {
      console.log("grupoUsuarioId:", grupoUsuarioId);
      return grupoUsuarioId ? grupoUsuarioId : store.state.emptyGuid;
    };
    let itemsFormaPagamento = ref([]);
    let itemsPremio = ref([]);
    let hColumns = ref([
      {
        key: "fidelidadeFormasPagamento",
        label: "fidelidadeFormasPagamento",
      },
      {
        key: "valor",
        label: "valor",
      },
      {
        key: "pontos",
        label: "pontos",
      },
    ]);
    let hColumnsPremio = ref([     
      {
        key: "produtoId",
        label: "produtoId",
      },
      {
        key: "pontos",
        label: "pontos",
      },
    ]);
    const onGetSelect = async () => {
      var retornoBackSeletor = await servico.getSeletor();
      console.log("retornoBackSeletor", retornoBackSeletor);
      var returnMetodoNcm = [];
      retornoBackSeletor.forEach(front => {
        returnMetodoNcm.push({ value: front.id, label: front.descricao });
      });
      optionsFormaPagamento.value = returnMetodoNcm;
      return returnMetodoNcm;
    };
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
      pontosIniciais: ref(),
      validadePontos: ref(),
      pontosPrimeiraCompra: ref(),
      avisoCliente: ref(),
      unidadeConversao: ref([]),
      formaPagamento: ref([]),
      premio: ref([])
    });
    let viewModelFormaPagamento = ref({
      id: ref(),
      valor: ref(""),
      pontos: ref(""),
      fidelidadeFormasPagamento: ref(),
    });
    let viewModelpremio = ref({
      id: ref(),
      produtoId: ref(),
      pontos: ref(""),
    });
    retornoFormaPagamento.value = onGetSelect();
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
      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico.edit(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.descricao}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.descricao}"  ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.oItem} "${viewModel.value.descricao}" ${lengBrEs.foiAdicionado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.descricao} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
    };

    const validaCadastros = a => {
      //aqui validar os itens obrigatorios de cada cadastro
      salvarCadastro(a);
    };
    const salvarCadastro = a => {
      var viewModelValue;
      var viewModelItens;
      var viewModelItemEdicaoJson;
      var itemsEdicao;

      if (a == "formaPagamento") {
        console.log("formaPagamento")
        viewModelValue = viewModel.value.formaPagamento;
        viewModelItens = viewModelFormaPagamento.value;
        itemsEdicao = itemsFormaPagamento.value;

        viewModelItemEdicaoJson = JSON.parse(
          JSON.stringify(viewModelFormaPagamento.value)
        );
      } else if (a == "premio") {
        viewModelValue = viewModel.value.premio;
        viewModelItens = viewModelpremio.value;
        itemsEdicao = itemsPremio.value;
        viewModelItemEdicaoJson = JSON.parse(
          JSON.stringify(viewModelpremio.value)
        );
      }

      if (viewModelItens.id == undefined || viewModelItens.id == "") {
        viewModelItens.id = uuidv4();
        viewModelItemEdicaoJson.persistido = false;
        viewModelValue.push(viewModelItemEdicaoJson);
        var itensGrid;
        if (a == "formaPagamento") {
          itensGrid = ref({
            id: viewModelItens.id,
            valor: viewModelItens.valor,
            pontos: viewModelItens.pontos,
            fidelidadeFormasPagamento: viewModelItens.fidelidadeFormasPagamento,
          });
          itemsFormaPagamento.value.push(itensGrid.value);
          limparCamposFormaPagamento();
        } else if (a == "premio") {
          itensGrid = ref({
            id: viewModelItens.id,
            produtoId: viewModelItens.produtoId,
            pontos: viewModelItens.pontos,
          });
          console.log("itensGrid", itensGrid);
          itemsPremio.value.push(itensGrid.value);
          limparCamposPremio();
        }
      } else {
        //tem id
        console.log("id clicado", viewModelItens.id);
        console.log("viewModel.value.contatos", viewModelValue);
        var intemParaEditar = "vazil";
        const filtrando = value => {
          if (value.id == viewModelItens.id) {
            intemParaEditar = value;
          }
        };

        itemsEdicao.filter(filtrando);
        console.log("intemParaEditar", intemParaEditar);
        let registroEdicaoRetornoFiltro = intemParaEditar;

        if (a == "formaPagamento") {
          registroEdicaoRetornoFiltro.id = viewModelItemEdicaoJson.id;
          registroEdicaoRetornoFiltro.valor = viewModelItemEdicaoJson.valor;
          registroEdicaoRetornoFiltro.pontos = viewModelItemEdicaoJson.pontos;
          registroEdicaoRetornoFiltro.fidelidadeFormasPagamento = viewModelItemEdicaoJson.fidelidadeFormasPagamento;
         
          limparCamposFormaPagamento();
        } else if (a == "premio") {
          registroEdicaoRetornoFiltro.id = viewModelItemEdicaoJson.id;
          registroEdicaoRetornoFiltro.produtoId = viewModelItemEdicaoJson.produtoId;
          registroEdicaoRetornoFiltro.pontos = viewModelItemEdicaoJson.pontos;
         
          limparCamposPremio();
        }
      }
    };
   const limparCamposFormaPagamento = () => {
      viewModelFormaPagamento.value.id = ref();
      viewModelFormaPagamento.value.valor = ref("");
      viewModelFormaPagamento.value.pontos = ref("");
      viewModelFormaPagamento.value.fidelidadeFormasPagamento = ref("");
    };
    const limparCamposPremio = () => {
      viewModelpremio.value.id = ref();
      viewModelpremio.value.produtoId = ref();
      viewModelpremio.value.pontos = ref("");
    };
    const onDelete = item => {
      try {
       var indexGrid = itemsFormaPagamento.value.indexOf(item);
       itemsFormaPagamento.value.splice(indexGrid, 1);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Erro ao processar requisição!",
        });
      }
    };
    const onEditFormaPagamento = e => {
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
        var formaPagamento = itemsFormaPagamento.value;
        let id = e.item.id;
        const filtro = index => {
          if (id == index.id) {
            let viewmodelItem = viewModelFormaPagamento.value;
            viewmodelItem.id = index.id;
            viewmodelItem.valor = index.valor;
            viewmodelItem.pontos = index.pontos;
            viewmodelItem.fidelidadeFormasPagamento = index.fidelidadeFormasPagamento;
          }
        };
        formaPagamento.forEach(filtro);
      }
    };
    const onEditPremio = e => {
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
        var premio = itemsPremio.value;
        let id = e.item.id;
        const filtro = index => {
          if (id == index.id) {
            let viewmodelItem = viewModelpremio.value;
            viewmodelItem.id = index.id;
            viewmodelItem.produtoId = index.produtoId;
            viewmodelItem.pontos = index.pontos;
          }
        };
        premio.forEach(filtro);
      }
    };
    try {
      console.log("id:", grupoUsuarioId);
      if (
        grupoUsuarioId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(grupoUsuarioId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      optionsFormaPagamento,
      viewModelFidelidadeFormasPagamento,
      hColumns,
      itemsFormaPagamento,
      limparCamposFormaPagamento,
      viewModelFormaPagamento,
      onEditFormaPagamento,
      validaCadastros,
      salvarCadastro,
      itemsPremio,
      viewModelpremio,
      hColumnsPremio,
      limparCamposPremio,
      onEditPremio
      
    };
  },
};
</script>

<style></style>
