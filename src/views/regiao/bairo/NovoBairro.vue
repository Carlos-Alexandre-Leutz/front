<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("cadastro") }} {{ $i18n.translate("de") }}
                {{ $i18n.translate("bairro") }}
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
                    <label>* {{ $i18n.translate("bairro") }}</label>
                    <input
                      v-model="viewModel.nomeBairro"
                      class="form-control"
                      type="nome"
                      placeholder="Digite o Nome"
                      required
                      maxlength="50"
                    />
                  </div>
                </div>

                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("cidade") }}</label>
                    <Multiselect
                      v-model="viewModel.cidadeId"
                      placeholder="Selecione o Estado"
                      :options="optionsCidade"
                      :searchable="true"
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
              @click="$router.push('/bairro/1')"
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
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/regiao/bairro";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
import traducaoAlertas from "../../../plugins/i18n/alertas";
export default {
  setup() {
    const {
      params: { bairoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return bairoId ? bairoId : store.state.emptyGuid;
    };
    console.log(bairoId);
    let retornoSeletor = [];
    let optionsCidade = ref([]);
    let viewModel = ref({
      id: ref(getId()),
      nomeBairro: ref(""),
      cidadeId: ref(""),
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
      if (viewModel.value.cidadeId) {
        salvaForm(e);
      } else {
        let lengBrEs = lang();
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    };
    const salvaForm = e => {
      e.preventDefault();
      let lengBrEs = lang();
      let estado = parseFloat(viewModel.value.cidadeId);
      console.log(estado);
      //  if (!isNaN(estado)) {
      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico.edit(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nomeBairro}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nomeBairro}"  ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.oItem} "${viewModel.value.nomeBairro}" ${lengBrEs.foiAdicionado}.`,
            });
            viewModel.value.nomeBairro = ref("");
            viewModel.value.cidadeId = ref("");
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.nomeBairro} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    onMounted(async () => {
      const onGetSeletor = async () => {
        var retornoBackSeletor = await servico.getSeletorEstados();
        var returnMetodoEstados = [];
        retornoBackSeletor.forEach(front => {
          returnMetodoEstados.push({ value: front.id, label: front.descricao });
        });
        optionsCidade.value = returnMetodoEstados;
        return returnMetodoEstados;
      };
      retornoSeletor.value = await onGetSeletor();
      const ObterCidade = async id => {
        var retorno = await servico.getId(id);
        console.log("retorno: ", retorno);
        viewModel.value.nome = retorno.nome;
        viewModel.value.nomeBairro = retorno.nomeBairro;
        viewModel.value.cidadeId = retorno.cidadeId;
      };

      try {
        if (
          bairoId !== undefined &&
          viewModel.value.id !== store.state.emptyGuid
        ) {
          ObterCidade(bairoId);
        }
      } catch (err) {
        console.error("Erro ao obter cidade para edição", err);
      }
    });
    return {
      viewModel,
      getEditMode,
      optionsCidade,
      servico,
      store,
      validarForm,
      salvaForm,
    };
  },
  components: { Multiselect },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
