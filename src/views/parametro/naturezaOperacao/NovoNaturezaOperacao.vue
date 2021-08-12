<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("cadastro") }} {{ $i18n.translate("de") }} {{ $i18n.translate("naturezaOperacao") }}
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
                      v-model="viewModel.descricaoNatureza"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDescricao"
                      required
                      maxlength="250"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipo") }}</label>
                    <Multiselect
                      v-model="viewModel.tipoNatureza"
                      :placeholder="placeholderTipo"
                      :searchable="true"
                      :options="optionsTipoNatureza"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("observacao") }}</label>
                    <input
                      v-model="viewModel.observacaoNatureza"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderObsercacao"
                      maxlength="50"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("planoContas") }}</label>
                    <br />
                    <Multiselect
                      v-model="viewModel.IdPlanoConta"
                      :placeholder="placeholderPlanoContas"
                      :searchable="true"
                      :options="optionsPlanoConta"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("idTributoCsosn") }}</label>
                    <br />
                    <Multiselect
                      v-model="viewModel.IdTributoCsosn"
                      :placeholder="placeholderCsosn"
                      :searchable="true"
                      :options="optionsTributoCsosn"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("IdtributoCst") }}</label>
                    <br />
                    <Multiselect
                      v-model="viewModel.IdtributoCst"
                      :placeholder="placeholderCst"
                      :searchable="true"
                      :options="optionstributoCst"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{
                      $i18n.translate("exportarconsideraCfopCreditoIcmsintegra")
                    }}</label>
                    <br />
                    <input
                      v-model="viewModel.consideraCfopCreditoIcms"
                      type="checkbox"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>
                      {{ $i18n.translate("exigeDocumentoReferenciado") }}
                    </label>
                    <br />
                    <input
                      v-model="viewModel.exigeDocumentoReferenciado"
                      type="checkbox"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>
                      {{ $i18n.translate("naoInsideCofins") }}
                    </label>
                    <br />
                    <input
                      v-model="viewModel.naoInsideCofins"
                      type="checkbox"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("exportarSintegra") }}</label>
                    <br />
                    <input
                      v-model="viewModel.exportarSintegra"
                      type="checkbox"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("naoIncideIcms") }}</label>
                    <br />
                    <input v-model="viewModel.naoIncideIcms" type="checkbox" />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("cfopDevolucao") }}</label>
                    <br />
                    <input v-model="viewModel.cfopDevolucao" type="checkbox" />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("naoInsidePis") }}</label>
                    <br />
                    <input v-model="viewModel.naoInsidePis" type="checkbox" />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{
                      $i18n.translate("cfopsubstituicaotributaria")
                    }}</label>
                    <br />
                    <input
                      v-model="viewModel.cfopsubstituicaotributaria"
                      type="checkbox"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex mt-3 ml-1 buttonsActions">
            <button v-if="edicao" class="btn btn-success mr-2" type="submit">
              {{ $i18n.translate("salvar") }}
            </button>
            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/naturezaOperacao/1')"
            >
              {{ $i18n.translate("voltar") }}
            </button>
          </div>
        </div>
      </div>
    </form>
    <br><br><br>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import servico from "../../../services/parametro/naturezaOperacao";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
import enumSelect from "../../../services/enum/enum.js";
import servicoSeletor from "../../../services/seletor.js";
import traducaoParametros from "../../../plugins/i18n/parametros"

export default {
  components: { Multiselect },
  setup() {
    const {
      params: { naturezaOperacaoId },
    } = useRoute();
    const {
      params: { visualizar },
    } = useRoute();
    if(visualizar){
      edicao = false;
    }else{
      edicao = true;
    }
    const store = useStore();
    const getId = () => {
      console.log("naturezaOperacaoId:", naturezaOperacaoId);
      return naturezaOperacaoId ? naturezaOperacaoId : store.state.emptyGuid;
    };
    let edicao;
    let optionsPlanoConta = ref([]);
    let optionsTributoCsosn = ref([]);
    let optionstributoCst = ref([]);
    let optionsTipoNatureza = ref();
    var movimentaEstoque = ref(true);
    let viewModel = ref({
      id: ref(getId()),
      descricaoNatureza: ref(""),
      tipoNatureza: ref(),
      observacaoNatureza: ref(""),
      consideraCfopCreditoIcms: ref(),
      movimentaEstoque: ref(),
      exigeDocumentoReferenciado: ref(),
      naoInsideCofins: ref(),
      exportarSintegra: ref(),
      naoIncideIcms: ref(),
      cfopDevolucao: ref(),
      naoInsidePis: ref(),
      IdPlanoConta: ref(),
      IdTributoCsosn: ref(),
      IdtributoCst: ref(),
      cfopsubstituicaotributaria: ref(),
    });
    optionsTipoNatureza = enumSelect.naturezaoperacao;
    let router = useRouter();

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
    let placeholderObsercacao;
    let placeholderPlanoContas;
    let placeholderCsosn;
    let placeholderCst;
     let languagePageNow = langParametos();
    placeholderDescricao = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.descricao}`;
    placeholderTipo = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.tipo}`;
    placeholderObsercacao = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.observacao}`;
    placeholderPlanoContas = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.planoConta}`;
    placeholderCsosn = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.csosn}`;
    placeholderCst = ` ${languagePageNow.selecione} ${languagePageNow.o} ${languagePageNow.cst}`;
 
    const validarForm = e => {
      e.preventDefault();
      let lengBrEs = lang();

      if (viewModel.value.tipoNatureza == 0) {
        viewModel.value.movimentaEstoque = true;
      } else {
        viewModel.value.movimentaEstoque = false;
      }
      console.log(viewModel.value.movimentaEstoque);

      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico.edit(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.descricaoNatureza}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.descricaoNatureza}"  ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.oItem} "${viewModel.value.descricaoNatureza}" ${lengBrEs.foiAdicionado}.`,
            }).then(result => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                console.log('continuar cadastrando')
              } else if (result.isDenied) {
                 router.push("/naturezaOperacao/1")
              }
            });

            viewModel.value.descricaoNatureza = ref("");
            viewModel.value.tipoNatureza = ref();
            viewModel.value.observacaoNatureza = ref("");
            viewModel.value.consideraCfopCreditoIcms = ref();
            viewModel.value.movimentaEstoque = ref();
            viewModel.value.exigeDocumentoReferenciado = ref();
            viewModel.value.naoInsideCofins = ref();
            viewModel.value.exportarSintegra = ref();
            viewModel.value.naoIncideIcms = ref();
            viewModel.value.cfopDevolucao = ref();
            viewModel.value.naoInsidePis = ref();
            viewModel.value.IdPlanoConta = ref();
            viewModel.value.IdTributoCsosn = ref();
            viewModel.value.IdtributoCst = ref();
            viewModel.value.cfopsubstituicaotributaria = ref();
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.descricaoNatureza} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const obterSeletor = async url => {
      var retornoBack = await servicoSeletor.obterSeletorGenerico(url);
      var returnMetodo = [];
      retornoBack.forEach(e => {
        returnMetodo.push({ value: e.id, label: e.descricao });
      });
      return returnMetodo;
    };
    const PreencherSeletores = async () => {
      optionsPlanoConta.value = await obterSeletor(
        "planoConta/obter-select-plano-conta"
      );
      optionsTributoCsosn.value = await obterSeletor(
        "tributo/obter-seletor-tributos-tipo/1"
      );
      optionstributoCst.value = await obterSeletor(
        "tributo/obter-seletor-tributos-tipo/0"
      );
    };
    PreencherSeletores();
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      console.log("response", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.descricaoNatureza = retorno.descricaoNatureza;
      viewModel.value.tipoNatureza = parseInt(retorno.tipoNatureza);
      viewModel.value.observacaoNatureza = retorno.observacaoNatureza;
      viewModel.value.consideraCfopCreditoIcms =
        retorno.consideraCfopCreditoIcms;
      viewModel.value.movimentaEstoque = retorno.movimentaEstoque;
      viewModel.value.exigeDocumentoReferenciado =
        retorno.exigeDocumentoReferenciado;
      viewModel.value.naoInsideCofins = retorno.naoInsideCofins;
      viewModel.value.exportarSintegra = retorno.exportarSintegra;
      viewModel.value.naoIncideIcms = retorno.naoIncideIcms;
      viewModel.value.cfopDevolucao = retorno.cfopDevolucao;
      viewModel.value.naoInsidePis = retorno.naoInsidePis;
      viewModel.value.IdPlanoConta = retorno.idPlanoConta;
      viewModel.value.IdTributoCsosn = retorno.idTributoCsosn;
      viewModel.value.IdtributoCst = retorno.idtributoCst;
      viewModel.value.cfopsubstituicaotributaria =
        retorno.cfopsubstituicaotributaria;
    };
    try {
      console.log("id:", naturezaOperacaoId);
      if (
        naturezaOperacaoId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(naturezaOperacaoId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      optionsTipoNatureza,
      movimentaEstoque,
      optionsPlanoConta,
      optionsTributoCsosn,
      optionstributoCst,
      edicao,
      placeholderDescricao,
      placeholderTipo,
      placeholderObsercacao,
      placeholderPlanoContas,
      placeholderCsosn,
      placeholderCst,
    };
  },
};
</script>

<style>
.buttonsActions {
  position: fixed;
  bottom: 10px;
}
</style>