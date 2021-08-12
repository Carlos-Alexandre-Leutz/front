<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{
                $i18n.translate("cadastroFormaPagamento")
              }}</strong>
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
                    <input
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderNome"
                      required
                      maxlength="50"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tiposMoeda") }}</label>
                    <Multiselect
                      v-model="viewModel.tipo"
                      :placeholder="placeholderTipoMoeda"
                      :options="tipoMoeda"
                      :searchable="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipoDesconto") }}</label>
                    <Multiselect
                      v-model="viewModel.Descontos"
                      :placeholder="placeholderTipoDesconto"
                      :options="tipoDesconto"
                      :searchable="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>
                      {{ $i18n.translate("planoContas") }}
                    </label>
                    <Multiselect
                      v-model="viewModel.planocontaid"
                      :placeholder="placeholderPlanoContas"
                      :options="planocontaid"
                      :searchable="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>{{ $i18n.translate("conciliacao") }}</label
                    ><br />
                    <input
                      v-model="viewModel.conciliacao"
                      type="checkbox"
                      class="form-check-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex mt-3 ml-1 buttonsActions">
            <button
              v-if="mostrarBtnSalvar"
              class="btn btn-success mr-2"
              type="submit"
            >
              {{ $i18n.translate("salvar") }}
            </button>
            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/formaPagamento/1')"
            >
              {{ $i18n.translate("voltar") }}
            </button>
          </div>
        </div>
      </div>
    </form>
    <br /><br /><br />
  </div>
</template>
<script>
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import servico from "../../../services/financeiro/formaPagamento.js";
import servicoSeletor from "../../../services/seletor.js";
import enumSelect from "../../../services/enum/enum";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import traducaoParametros from "../../../plugins/i18n/parametros";

export default {
  components: { Multiselect },
  setup() {
    const {
      params: { formaPagamentoId, visualizar },
    } = useRoute();
    if (visualizar) {
      mostrarBtnSalvar = false;
    } else {
      mostrarBtnSalvar = true;
    }
    let router = useRouter();
    const store = useStore();
    let mostrarBtnSalvar;
    let siglaTeste = ref("");
    let tipoMoeda = ref([]);
    let planocontaid = ref([]);
    let tipoDesconto = ref([]);
    const getId = () => {
      return formaPagamentoId ? formaPagamentoId : store.state.emptyGuid;
    };
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
      tipo: ref(),
      Descontos: ref(),
      conciliacao: ref(false),
      planocontaid: ref(),
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
    let placeholderNome;
    let placeholderTipoMoeda;
    let placeholderTipoDesconto;
    let placeholderPlanoContas;
    let languagePageNow = langParametos();
    placeholderNome = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.nome}`;
    placeholderTipoMoeda = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.tipoMoeda}`;
    placeholderTipoDesconto = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.tipoDesconto}`;
    placeholderPlanoContas = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.planoConta}`;

    const validarForm = e => {
      e.preventDefault();
      let lengBrEs = lang();
      console.log(viewModel.value.tipo, viewModel.value.Descontos);

      let tipo = parseFloat(viewModel.value.tipo);
      let desconto = parseFloat(viewModel.value.Descontos);

      if (!isNaN(tipo) && !isNaN(desconto)) {
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
                showDenyButton: true,
                confirmButtonText: `${lengBrEs.continuarCadastrando}`,
                denyButtonText: `${lengBrEs.voltar}`,
                text: `${lengBrEs.oItem} "${viewModel.value.descricao}" ${lengBrEs.foiAdicionado}.`,
              }).then(result => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  console.log("continuar cadastrando");
                } else if (result.isDenied) {
                  router.push("/formapagamento/1");
                }
              });
              viewModel.value.descricao = ref("");
              viewModel.value.tipo = ref();
              viewModel.value.Descontos = ref();
              viewModel.value.conciliacao = ref(false);
              viewModel.value.planocontaid = ref();
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} ${viewModel.value.descricao} ${lengBrEs.naoFoiAdicionado}.`,
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
    watch(
      () => siglaTeste.value,
      (sigla, siglaOld) => {
        console.log("Changed! New: ", sigla, " Old: ", siglaOld);
      }
    );
    onMounted(async () => {
      const obterSeletor = async url => {
        var retornoBack = await servicoSeletor.obterSeletorGenerico(url);
        var returnMetodo = [];
        retornoBack.forEach(e => {
          returnMetodo.push({ value: e.id, label: e.descricao });
        });
        return returnMetodo;
      };

      tipoDesconto.value = enumSelect.FormaPagamentoDescontos;
      tipoMoeda.value = enumSelect.FormaPagamentoTipo;
      planocontaid.value = await obterSeletor(
        "planoConta/obter-select-plano-conta"
      );
      console.log(tipoDesconto);

      const ObterItensParaEdicao = async id => {
        var retorno = await servico.getId(id);
        console.log("retorno", retorno);
        viewModel.value.id = retorno.id;
        viewModel.value.descricao = retorno.descricao;
        viewModel.value.conciliacao = retorno.conciliacao;
        viewModel.value.tipo = 2;
        viewModel.value.Descontos = retorno.descontos;
        viewModel.value.planocontaid = retorno.planocontaid;
      };

      try {
        if (
          formaPagamentoId !== undefined &&
          viewModel.value.id !== store.state.emptyGuid
        ) {
          ObterItensParaEdicao(formaPagamentoId);
          console.log("obter dados banco");
        }
      } catch (err) {
        console.error("Erro ao obter estado para edição", err);
      }
    });

    return {
      viewModel,
      getEditMode,
      store,
      servico,
      planocontaid,
      tipoMoeda,
      validarForm,
      tipoDesconto,
      mostrarBtnSalvar,
      placeholderNome,
      placeholderTipoMoeda,
      placeholderTipoDesconto,
      placeholderPlanoContas,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.buttonsActions {
  position: fixed;
  bottom: 10px;
}
</style>