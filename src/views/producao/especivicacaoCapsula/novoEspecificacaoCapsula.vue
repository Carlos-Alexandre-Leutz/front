<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{
                $i18n.translate("especificacaoCapsula")
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
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDescricao"
                      required
                      maxlength="50"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("prioridade") }}</label>
                    <input
                      v-model="viewModel.prioridade"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderPrioridade"
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
              @click="$router.push('/capsula/1')"
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
import servico from "../../../services/Producao/especificacaoCapsula";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import traducaoParametros from "../../../plugins/i18n/parametros";
import Swal from "sweetalert2";
export default {
  setup() {
    const {
      params: { capsulaId },
    } = useRoute();
    console.log("capsulaId", capsulaId);
    const store = useStore();
    const getId = () => {
      return capsulaId ? capsulaId : store.state.emptyGuid;
    };
    let siglaTeste = ref("");
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
      prioridade: ref(""),
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
    let placeholderPrioridade;
    let languagePageNow = langParametos();
    placeholderDescricao = ` ${languagePageNow.add} ${languagePageNow.descricao}`;
    placeholderPrioridade = ` ${languagePageNow.add} ${languagePageNow.prioridade}`;

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
            viewModel.value.prioridade = ref("");
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
    watch(
      () => siglaTeste.value,
      (sigla, siglaOld) => {
        console.log("Changed! New: ", sigla, " Old: ", siglaOld);
      }
    );
    onMounted(async () => {
      const ObterviewModel = async id => {
        var retorno = await servico.getId(id);
        console.log(retorno);
        viewModel.value.descricao = retorno.descricao;
        viewModel.value.prioridade = retorno.prioridade;
      };
      try {
        if (
          capsulaId !== undefined &&
          viewModel.value.id !== store.state.emptyGuid
        ) {
          ObterviewModel(capsulaId);
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
      validarForm,
      placeholderDescricao,
      placeholderPrioridade,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
