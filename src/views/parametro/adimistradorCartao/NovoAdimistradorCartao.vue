<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("adimistradorCartao") }}
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
                    <label>* {{ $i18n.translate("nome") }} </label>
                    <input
                      v-model="viewModel.nomeAdministradora"
                      class="form-control"
                      type="text"
                      placeholder="Digite o Nome"
                      required
                      maxlength="100"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("tipo") }} </label>
                    <Multiselect
                      v-model="viewModel.tipoAdministradora"
                      placeholder="Selecione o tipo  da Administradora"
                      :options="optionsTipoAdministradora"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>
                      * {{ $i18n.translate("prazoRecebimentoAdministradora") }}
                    </label>
                    <input
                      v-model="viewModel.prazoRecebimentoAdministradora"
                      class="form-control"
                      type="number"
                      placeholder="Digite a Prazo"
                       maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("gerenciadora") }}</label>
                    <Multiselect
                      v-model="viewModel.gerenciadoraAdministradora"
                      placeholder="Selecione a Gerenciadora"
                      :options="optionsGerenciadoraAdministradora"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descontos") }} (%)</label>
                    <input
                      v-model="viewModel.descontoAdministradora"
                      class="form-control"
                      type="nunber"
                      placeholder="Digite o Desconto"
                      maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("fornecedor") }}</label>
                    <Multiselect
                      v-model="viewModel.codigoFornecedor"
                      placeholder="Selecione o Fornecedor"
                      :options="optionsCodigoFornecedor"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label
                      >* {{ $i18n.translate("descricao") }}
                      {{ $i18n.translate("fornecedor") }}</label
                    >
                    <input
                      v-model="viewModel.fornecedor"
                      class="form-control"
                      type="text"
                      placeholder="Digite a Descrição do Fornecedor"
                        maxlength="255"
                    />
                  </div>
                </div>

                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("planoContas") }}</label>
                    <Multiselect
                      v-model="viewModel.planoContaId"
                      placeholder="Selecione o Plano de Contas"
                      :options="optionsPlanoContaId"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label
                      >* {{ $i18n.translate("descricao") }}
                      {{ $i18n.translate("planoContas") }}</label
                    >
                    <input
                      v-model="viewModel.planoConta"
                      class="form-control"
                      type="text"
                      placeholder="Digite a Descrição do Plano de Contas"
                        maxlength="255"
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
              @click="$router.push('/adimistradorCartao/1')"
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
import servico from "../../../services/parametro/admCartao";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
import servicoSeletor from "../../../services/seletor.js";
import Multiselect from "@vueform/multiselect";
import enuMselect from "../../../services/enum/enum";
export default {
  components: { Multiselect },
  setup() {
    const {
      params: { adimistradorCartaoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("adimistradorCartaoId:", adimistradorCartaoId);
      return adimistradorCartaoId
        ? adimistradorCartaoId
        : store.state.emptyGuid;
    };
    let optionsCodigoFornecedor = ref([]);
    let optionsPlanoContaId = ref([]);
    let optionsGerenciadoraAdministradora = ref([]);
    let optionsTipoAdministradora = ref([]);
    let viewModel = ref({
      id: ref(getId()),
      nomeAdministradora: ref(""),
      tipoAdministradora: ref(),
      prazoRecebimentoAdministradora: ref(),
      gerenciadoraAdministradora: ref(),
      descontoAdministradora: ref(),
      codigoFornecedor: ref(),
      fornecedor: ref(""),
      planoContaId: ref(),
      planoConta: ref(""),
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
      let descricao = viewModel.value.nomeAdministradora;
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
            viewModel.value.nomeAdministradora = ref("");
            viewModel.value.tipoAdministradora = ref();
            viewModel.value.prazoRecebimentoAdministradora = ref();
            viewModel.value.gerenciadoraAdministradora = ref();
            viewModel.value.descontoAdministradora = ref();
            viewModel.value.codigoFornecedor = ref();
            viewModel.value.fornecedor = ref("");
            viewModel.value.planoContaId = ref();
            viewModel.value.planoConta = ref("");
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
    const obterSeletor = async url => {
      var retornoBack = await servicoSeletor.obterSeletorGenerico(url);
      var returnMetodo = [];
      console.log(returnMetodo);
      retornoBack.forEach(e => {
        returnMetodo.push({ value: e.id, label: e.descricao });
      });
      return returnMetodo;
    };

    const PreencherSeletores = async () => {
      optionsCodigoFornecedor.value = await obterSeletor(
        "fornecedor/obter-seletor-fornecedor"
      );
      optionsPlanoContaId.value = await obterSeletor(
        "planoConta/obter-select-plano-conta"
      );
      optionsGerenciadoraAdministradora.value =
        enuMselect.gerencCartaoAdmCArtao;
      optionsTipoAdministradora.value = enuMselect.TransacaoAdiminstradora;
    };
    PreencherSeletores();
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.nomeAdministradora = retorno.nomeAdministradora;
      viewModel.value.prazoRecebimentoAdministradora =
        retorno.prazoRecebimentoAdministradora;
      viewModel.value.descontoAdministradora = retorno.descontoAdministradora;
      viewModel.value.planoContaId = retorno.planoContaId;
      viewModel.value.planoConta = retorno.planoConta;
      viewModel.value.fornecedor = retorno.fornecedor;

      let tipoAdministradora = parseInt(retorno.tipoAdministradora);
      let gerenciadoraAdministradora = parseInt(
        retorno.gerenciadoraAdministradora
      );
      viewModel.value.tipoAdministradora = tipoAdministradora;
      viewModel.value.gerenciadoraAdministradora = gerenciadoraAdministradora;
      viewModel.value.codigoFornecedor = retorno.codigoFornecedor;

      console.log(retorno.tipoAdministradora, typeof teste);
    };
    try {
      console.log("id:", adimistradorCartaoId);
      if (
        adimistradorCartaoId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(adimistradorCartaoId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      PreencherSeletores,
      optionsCodigoFornecedor,
      optionsPlanoContaId,
      optionsGerenciadoraAdministradora,
      optionsTipoAdministradora,
    };
  },
};
</script>

<style></style>
