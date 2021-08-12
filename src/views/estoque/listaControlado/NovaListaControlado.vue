<template>
  <div v-if="optionsTipos">
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("cadastro") }}
                {{ $i18n.translate("listaControlado") }}
              </strong>
            </header>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>
                      {{ $i18n.translate("camposObrigatorio") }}
                    </small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label
                      >*

                      {{ $i18n.translate("descricao") }}</label
                    >
                    <input
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="text"
                      placeholder="Digite a descrição"
                      maxlength="100"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("tipo") }}</label>
                    <Multiselect
                      v-model="viewModel.tipo"
                      placeholder="Selecione o Tipo"
                      :options="optionsTipos"
                    />
                  </div>
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <div class="form-group form-check" style="padding-top: 20px">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="receitaObrigatorio"
                      v-model="viewModel.numeroReceitaObrigatorio"
                    />
                    <label class="form-check-label" for="receitaObrigatorio">
                      {{ $i18n.translate("numeroReceitaObrigatorio") }}
                    </label>
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
              @click="$router.push('/listaControlado/1')"
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
import servico from "../../../services/estoque/listaControlado.js";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import enumSelect from "../../../services/enum/enum";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
export default {
  setup() {
    const {
      params: { listaControladoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("listaControladoId:", listaControladoId);
      return listaControladoId ? listaControladoId : store.state.emptyGuid;
    };
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
      tipo: ref(""),
      numeroReceitaObrigatorio: ref(false),
    });
    let optionsTipos = ref([]);
    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
    optionsTipos.value = enumSelect.ListaControladoTipo;
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
      let tipo = typeof viewModel.value.tipo;
      if (tipo == "number") {
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
              viewModel.value.tipo = ref("");
              viewModel.value.numeroReceitaObrigatorio = ref(false);
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
    const ObterListaControlado = async id => {
      var retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
      viewModel.value.tipo = retorno.tipo;
      viewModel.value.numeroReceitaObrigatorio =
        retorno.numeroReceitaObrigatorio;
    };
    try {
      console.log("id:", listaControladoId);
      if (
        listaControladoId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterListaControlado(listaControladoId);
      }
    } catch (err) {
      console.error("Erro ao obter lista controlado para edição", err);
    }
    return {
      viewModel,
      servico,
      store,
      getEditMode,
      optionsTipos,
      validarForm,
    };
  },
  components: { Multiselect },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
