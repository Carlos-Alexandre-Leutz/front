<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center"
                >{{ $i18n.translate("cadastro") }} {{ $i18n.translate("de") }}
                {{ $i18n.translate("cotacao") }} {{ $i18n.translate("de") }}
                {{ $i18n.translate("moeda") }}</strong
              >
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
                <div class="col-sm-6 col-md-6 col-lg-4 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("moeda") }}</label>
                    <Multiselect
                      v-model="viewModel.moedaCotacaoId"
                      placeholder="Selecione o Tipo"
                      :options="optionsTipos"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-4 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("moeda") }}</label>
                    <Multiselect
                      v-model="viewModel.moedaId"
                      placeholder="Selecione o Tipo"
                      :options="optionsTipos"
                    />
                  </div>
                </div>

                <div class="col-sm-6 col-md-6 col-lg-4 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("valor") }}</label>
                    <input
                      v-model="viewModel.valorCotacao"
                      class="form-control"
                      type="number"
                      step="any"
                      maxlength="50"
                      placeholder="Digite a descrição"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-4 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("dataCotacao") }}</label>
                    <input
                      v-model="viewModel.dataCotacao"
                      class="form-control"
                      type="date"
                      maxlength="50"
                      placeholder="Digite a descrição"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label> {{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModel.descricaoMoeda"
                      class="form-control"
                      type="text"
                      maxlength="50"
                      placeholder="Digite a descrição"
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
              @click="$router.push('/cotacao/1')"
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
import servico from "../../../services/parametro/cotacao";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
//import enumSelect from "../../../services/enum.js";
import Multiselect from "@vueform/multiselect";

export default {
  setup() {
    const {
      params: { cotacaoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return cotacaoId ? cotacaoId : store.state.emptyGuid;
    };
    let retornoRegistroEdicao;

    var optionsTipos = ref([]);
    var retornoSeletor = ref([]);
    var viewModel = ref({
      id: ref(getId()),
      moedaCotacaoId: ref(),
      moedaId: ref(),
      descricaoMoeda: ref(""),
      dataCotacao: ref(),
      valorCotacao: ref(),
    });
    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
    const onGetSeletor = async () => {
      var retornoBackSeletor = await servico.getSeletorTipos();
      var returnMetodoNcm = [];
      retornoBackSeletor.forEach(front => {
        returnMetodoNcm.push({ value: front.id, label: front.descricao });
      });
      optionsTipos.value = returnMetodoNcm;
      return returnMetodoNcm;
    };
    retornoSeletor.value = onGetSeletor();
    const lang = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoAlertas.br;
      if (langDefault != "br") {
        langTrad = traducaoAlertas.es;
      }
      return langTrad;
    };

    const moedalabel = id => {
      const filtrar = value => {
        if (value.value == id) return value;
      };
      const retorno = retornoSeletor.value.then(x => {
        var filtrado = x.filter(filtrar);
        return filtrado[0].label;
      });
      return retorno;
    };
    const validarForm = e => {
      e.preventDefault();
      let lengBrEs = lang();
      if (viewModel.value.moedaCotacaoId === viewModel.value.moedaId) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.moedasIguais}!`,
        });
      } else if (retornoRegistroEdicao) {
        if (
          retornoRegistroEdicao.moedaCotacaoId !=
            viewModel.value.moedaCotacaoId ||
          retornoRegistroEdicao.moedaId != viewModel.value.moedaId ||
          retornoRegistroEdicao.dataCotacao != viewModel.value.dataCotacao
        ) {
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.erro}`,
            text: `${lengBrEs.naoPossivelEditarMoedasDataCotação}`,
          });
        } else {
          saveForm(e);
        }
      } else {
        saveForm(e);
      }
    };
    const saveForm = e => {
      e.preventDefault();
      let lengBrEs = lang();
      let labelMoedaCotada;
      let labelMoedaParaCotacao;
      moedalabel(viewModel.value.moedaCotacaoId).then(x => {
        labelMoedaCotada = x;
      });
      moedalabel(viewModel.value.moedaId).then(x => {
        labelMoedaParaCotacao = x;
      });

      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico.edit(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.aCotacao} "${labelMoedaCotada} ${lengBrEs.para} ${labelMoedaParaCotacao}"  ${lengBrEs.foiEditado}.`,
            });
          }else if(response.status == 500){
             response.json().then(data => {
               let listErros = data.erros;
               console.log("listErros", listErros)
             })
            

          }
           else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.aCotacao} "${labelMoedaCotada} ${lengBrEs.para} ${labelMoedaParaCotacao}"  ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.aCotacao} "${labelMoedaCotada} ${lengBrEs.para} ${labelMoedaParaCotacao}" ${lengBrEs.foiAdicionado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.aCotacao} "${labelMoedaCotada} ${lengBrEs.para} ${labelMoedaParaCotacao}" ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const ObterTipoContato = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.valorCotacao = retorno.valorCotacao;
      viewModel.value.dataCotacao = retorno.dataCotacao;
      viewModel.value.moedaCotacaoId = retorno.moedaCotacaoId;
      viewModel.value.moedaId = retorno.moedaId;
      viewModel.value.descricaoMoeda = retorno.descricaoMoeda;
      retornoRegistroEdicao = retorno;
    };

    try {
      console.log("id:", cotacaoId);
      if (cotacaoId !== undefined) {
        ObterTipoContato(cotacaoId);
      }
    } catch (err) {
      console.error("Erro ao obter tipo de contato para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      servico,
      store,
      validarForm,
      optionsTipos,
      saveForm,
    };
  },
  components: { Multiselect },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
