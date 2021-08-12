<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("transacao") }}
              </strong>
            </header>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>{{ $i18n.translate("camposObrigatorio") }}</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <textarea
                      v-model="viewModel.DsTransacao"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDescricao"
                      required
                      maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipo") }}</label>
                    <Multiselect
                      v-model="viewModel.IeTransacao"
                      :placeholder="placeholderTipo"
                      :change="
                        ((exibeCampos = this.viewModel.IeTransacao == 0),
                        (exibeCampos2 = this.viewModel.IeTransacao == 1))
                      "
                      :options="optionsTipos"
                    />
                  </div>
                </div>
                <div
                  v-if="exibeCampos"
                  class="col-sm-12 col-md-6 col-lg-6 col-xl-6"
                >
                  <div class="form-group">
                    <label>{{ $i18n.translate("cliente") }}</label>
                    <Multiselect
                      v-model="viewModel.pessoaId"
                      :placeholder="placeholderCliente"
                      :options="optionsCliente"
                    />
                  </div>
                </div>
                <div
                  v-if="exibeCampos2"
                  class="col-sm-12 col-md-6 col-lg-6 col-xl-6"
                >
                  <div class="form-group">
                    <label>{{ $i18n.translate("fornecedor") }}</label>
                    <Multiselect
                      v-model="viewModel.fornecedorId"
                      :placeholder="placeholderFornecedor"
                      :options="optionsFornecedor"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("planoContas") }}</label>
                    <Multiselect
                      v-model="viewModel.planoContaId"
                      :placeholder="placeholderPlanoConta"
                      :options="optionsTiposPlanoContas"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label>
                    <br />
                    <input
                      v-model="viewModel.IeConciliar"
                      type="checkbox"
                      :placeholder="placeholderAtivo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex mt-3 ml-1">
            <button class="btn btn-success mr-2" type="submit">
              {{ $i18n.translate("salvar") }}
            </button>
            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/transacao/1')"
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
import servico from "../../../services/financeiro/transacao";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
import enumSelect from "../../../services/enum/enum.js";
import traducaoParametros from "../../../plugins/i18n/parametros";

export default {
  components: { Multiselect },
  setup() {
    const {
      params: { TransacaoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("TransacaoId:", TransacaoId);
      return TransacaoId ? TransacaoId : store.state.emptyGuid;
    };
    var exibeCampos = ref(true);
    var exibeCampos2 = ref(true);
    var optionsTipos = ref([]);
    var optionsFornecedor = ref([]);
    var optionsCliente = ref([]);
    var optionsTiposPlanoContas = ref([]);
    var retornoSeletor = ref([]);
    let viewModel = ref({
      id: ref(getId()),
      DsTransacao: ref(""),
      IeTransacao: ref(),
      IeConciliar: ref(false),
      pessoaId: ref(),
      fornecedorId: ref(),
      planoContaId: ref(),
      //CodigoFornecedor e cliente ou fornecedor
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

    const langParametos = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoParametros.br;
      if (langDefault != "br") {
        langTrad = traducaoParametros.es;
      }
      return langTrad;
    };
    let placeholderDescricao;
    let placeholderTipo;
    let placeholderPlanoConta;
    let placeholderFornecedor;
    let placeholderCliente;
    let placeholderAtivo;
    let languagePageNow = langParametos();
    console.log(languagePageNow);
    placeholderDescricao = ` ${languagePageNow.digite} ${languagePageNow.descricao}`;
    placeholderTipo = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.tipo}`;
    placeholderPlanoConta = ` ${languagePageNow.digite} ${languagePageNow.planoConta}`;
    placeholderFornecedor = ` ${languagePageNow.digite} ${languagePageNow.fornecedor}`;
    placeholderCliente = ` ${languagePageNow.digite} ${languagePageNow.cliente}`;
    placeholderAtivo = ` ${languagePageNow.digite} ${languagePageNow.ativo}`;

    const onGetseletor = async () => {
      var retornoBackSeletor = await servico.getSeletor();
      console.log("retornoBackSeletor", retornoBackSeletor);
      var returnMetodoNcm = [];
      retornoBackSeletor.forEach(front => {
        returnMetodoNcm.push({ value: front.id, label: front.descricao });
      });
      optionsTiposPlanoContas.value = returnMetodoNcm;
      return returnMetodoNcm;
    };
    retornoSeletor.value = onGetseletor();
    optionsTipos.value = enumSelect.TransacaoTipo;
    const onGetseletorFornecedor = async () => {
      var retornoBackSeletor = await servico.getSeletorFornecedor();
      console.log("retornoBackSeletor", retornoBackSeletor);
      var returnMetodoNcm = [];
      retornoBackSeletor.forEach(front => {
        returnMetodoNcm.push({ value: front.id, label: front.descricao });
      });
      optionsFornecedor.value = returnMetodoNcm;
      return returnMetodoNcm;
    };
    retornoSeletor.value = onGetseletorFornecedor();
    const onGetseletorCliente = async () => {
      var retornoBackSeletor = await servico.getSeletorPessoa();
      console.log("retornoBackSeletor", retornoBackSeletor);
      var returnMetodoNcm = [];
      retornoBackSeletor.forEach(front => {
        returnMetodoNcm.push({ value: front.id, label: front.descricao });
      });
      optionsCliente.value = returnMetodoNcm;
      return returnMetodoNcm;
    };
    retornoSeletor.value = onGetseletorCliente();
    const validarForm = e => {
      e.preventDefault();
      let lengBrEs = lang();
      if (!viewModel.value.IeTransacao) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo} `,
        });
      } else {
        salvaForm();
      }
    };
    const salvaForm = () => {
      let lengBrEs = lang();
      let descricao = viewModel.value.DsTransacao;
      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico.edit(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${descricao}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${descricao}"  ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.oItem} "${descricao}" ${lengBrEs.foiAdicionado}.`,
            });
            viewModel.value.DsTransacao = ref("");
            viewModel.value.IeTransacao = ref(0);
            viewModel.value.IeConciliar = ref(false);
            viewModel.value.pessoaId = ref();
            viewModel.value.fornecedorId = ref();
            viewModel.value.planoContaId = ref();
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${descricao} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.DsTransacao = retorno.dsTransacao;
      viewModel.value.IeTransacao = retorno.ieTransacao;
      viewModel.value.IeConciliar = retorno.ieConciliar;
      if (retorno.fornecedorId !== "00000000-0000-0000-0000-000000000000") {
        viewModel.value.fornecedorId = retorno.fornecedorId;
      }
      if (retorno.pessoaId !== "00000000-0000-0000-0000-000000000000") {
        viewModel.value.pessoaId = retorno.pessoaId;
      }
      if (retorno.planoContaId !== "00000000-0000-0000-0000-000000000000") {
        viewModel.value.planoContaId = retorno.planoContaId;
      }
    };
    try {
      console.log("id:", TransacaoId);
      if (
        TransacaoId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(TransacaoId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      optionsTipos,
      optionsTiposPlanoContas,
      exibeCampos,
      exibeCampos2,
      optionsFornecedor,
      optionsCliente,
      salvaForm,
      placeholderDescricao,
      placeholderTipo,
      placeholderPlanoConta,
      placeholderFornecedor,
      placeholderCliente,
      placeholderAtivo
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
