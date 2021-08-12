<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("cadastroNBM") }}
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
                <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="text"
                      placeholder="Digite a descrição"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("codigoNbm") }}</label>
                    <input
                      v-model="viewModel.numeroNbm"
                      class="form-control"
                      type="text"
                      placeholder="Digite o código Nbm"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("aliqAgregadoEstadual") }} (%)</label>
                    <input
                      v-model="viewModel.aliquotaAgregadoEstadual"
                      class="form-control"
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Digite a Alíquota Agregado Estadual"
                    />
                  </div>
                </div>
                <div class="col-sm-4 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{
                      $i18n.translate("aliqAgregadoInterestadual")
                    }} (%)</label>
                    <input
                      v-model="viewModel.aliquotaAgregadoInterestadual"
                      class="form-control"
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Digite a Alíquota Agregado Interestadual"
                    />
                  </div>
                </div>
                <div class="col-sm-4 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{
                      $i18n.translate("aliqComplementarEstadual")
                    }} (%)</label>
                    <input
                      v-model="viewModel.aliquotaComplementarEstadual"
                      class="form-control"
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Digite a Alíquota Complementar Estadual"
                    />
                  </div>
                </div>
                <div class="col-sm-4 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{
                      $i18n.translate("aliqComplementarInterestadual")
                    }} (%)</label>
                    <input
                      v-model="viewModel.aliquotaComplementarInterestadual"
                      class="form-control"
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Digite a Alíquota Complementar Interestadual"
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
              @click="$router.push('/nbm/1')"
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
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/estoque/nbm.js";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";

export default {
  setup() {
    const {
      params: { nbmId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return nbmId ? nbmId : store.state.emptyGuid;
    };
    let siglaTeste = ref("");
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
      numeroNbm: ref(""),
      aliquotaAgregadoEstadual: ref(""),
      aliquotaAgregadoInterestadual: ref(""),
      aliquotaComplementarEstadual: ref(""),
      aliquotaComplementarInterestadual: ref(""),
    });
    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
    watch(
      () => siglaTeste.value,
      (sigla, siglaOld) => {
        console.log("Changed! New: ", sigla, " Old: ", siglaOld);
      }
    );
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
            viewModel.value.descricao = ref("");
            viewModel.value.numeroNbm = ref("");
            viewModel.value.aliquotaAgregadoEstadual = ref("");
            viewModel.value.aliquotaAgregadoInterestadual = ref("");
            viewModel.value.aliquotaComplementarEstadual = ref("");
            viewModel.value.aliquotaComplementarInterestadual = ref("");
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
    const ObterNbm = async id => {
      var retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
      viewModel.value.numeroNbm = retorno.numeroNbm;
      viewModel.value.aliquotaAgregadoEstadual =
        retorno.aliquotaAgregadoEstadual;
      viewModel.value.aliquotaAgregadoInterestadual =
        retorno.aliquotaAgregadoInterestadual;
      viewModel.value.aliquotaComplementarEstadual =
        retorno.aliquotaComplementarEstadual;
      viewModel.value.aliquotaComplementarInterestadual =
        retorno.aliquotaComplementarInterestadual;
    };
    try {
      console.log("id:", nbmId);
      if (nbmId !== null) {
        ObterNbm(nbmId);
      }
    } catch (err) {
      console.error("Erro ao obter nbm para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterNbm,
    };
  },
};
</script>