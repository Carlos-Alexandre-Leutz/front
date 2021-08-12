<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{
                $i18n.translate("manutencaoEstado")
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
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      v-model="viewModel.nome"
                      class="form-control"
                      type="nome"
                      placeholder="Digite o Nome"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-3 col-md-2 col-lg-2 col-xl-2">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("sigla") }}</label>
                    <input
                      v-model="viewModel.sigla"
                      class="form-control"
                      maxlength="2"
                      type="text"
                      placeholder="Digite a Sigla"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-2 col-lg-2 col-xl-2">
                  <div class="form-group">
                    <label>
                     * {{ $i18n.translate("codigoIbge") }}
                    </label>
                    <input
                      v-model="viewModel.codigoIbge"
                      class="form-control"
                      type="number"
                      placeholder="Digite o Código IBGE"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-2 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("pais") }}</label>
                    <Multiselect
                      v-model="viewModel.idPais"
                      placeholder="Selecione o País"
                      :options="optionsPais"
                      required
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
              @click="$router.push('/estado/1')"
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
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/regiao/estado.js";
import Multiselect from "@vueform/multiselect";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
export default {
  setup() {
    const {
      params: { estadoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return estadoId ? estadoId : store.state.emptyGuid;
    };

    let siglaTeste = ref("");
    let retornoSeletorPais = [];
    let optionsPais = ref([]);
    let viewModel = ref({
      id: ref(getId()),
      nome: ref(""),
      sigla: ref(""),
      codigoIbge: ref(""),
      idPais: ref(""),
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
      let pais = parseFloat(viewModel.value.idPais);
      if (!isNaN(pais)) {
        if (
          viewModel.value.id !== store.state.emptyGuid &&
          viewModel.value.id !== undefined
        ) {
          servico.edit(viewModel.value).then(response => {
            if (response.status == 200) {
              Swal.fire({
                icon: "success",
                title: `${lengBrEs.concluido}`,
                text: `${lengBrEs.oItem} "${viewModel.value.nome}" ${lengBrEs.foiEditado}.`,
              });
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} "${viewModel.value.nome}"  ${lengBrEs.naoFoiEditado}.`,
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
                text: `${lengBrEs.oItem} "${viewModel.value.nome}" ${lengBrEs.foiAdicionado}.`,
              });
              viewModel.value.nome = ref("");
              viewModel.value.sigla = ref("");
              viewModel.value.codigoIbge = ref("");
              viewModel.value.idPais = ref("");
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} ${viewModel.value.nome} ${lengBrEs.naoFoiAdicionado}.`,
              });
              viewModel.value.nome = ref("");
              viewModel.value.sigla = ref("");
              viewModel.value.codigoIbge = ref("");
              viewModel.value.idPais = ref("");
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
      const onGetPaises = async () => {
        let retornoBackSeletor = await servico.obterSeletorPais();
        let returnMetodoPais = [];
        retornoBackSeletor.forEach(front => {
          returnMetodoPais.push({ value: front.id, label: front.descricao });
        });
        optionsPais.value = returnMetodoPais;
        return returnMetodoPais;
      };
      retornoSeletorPais.value = await onGetPaises();

      const ObterEstado = async id => {
        let retorno = await servico.getId(id);
        viewModel.value.nome = retorno.nome;
        viewModel.value.sigla = retorno.sigla;
        viewModel.value.codigoIbge = retorno.codigoIbge;
        viewModel.value.idPais = retorno.idPais;
      };
      try {
        if (
          estadoId !== undefined &&
          viewModel.value.id !== store.state.emptyGuid
        ) {
          ObterEstado(estadoId);
        }
      } catch (err) {
        console.error("Erro ao obter estado para edição", err);
      }
    });
    return {
      viewModel,
      getEditMode,
      optionsPais,
      store,
      servico,
      validarForm,
    };
  },
  components: { Multiselect },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
