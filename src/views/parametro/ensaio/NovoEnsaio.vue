<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("cadastro") }} {{ $i18n.translate("de") }}
                {{ $i18n.translate("ensaio") }}
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
               
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("farmacopeia") }}</label>
                    <Multiselect
                      v-model="viewModel.farmacopeiaId"
                      placeholder="Selecione a Farmacopedia"
                      :searchable="true"
                      :options="optionsFarmacopedia"
                    />
                  </div>
                </div>
                 <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("descricao") }}</label>
                    <textarea
                      v-model="viewModel.descricaoEnsaio"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a Descrição"
                      required
                      maxlength="50"
                    ></textarea>
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
              @click="$router.push('/ensaio/1')"
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
import servico from "../../../services/parametro/ensaio";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
export default {
  components: { Multiselect },
  setup() {
    const {
      params: { ensaioId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("ensaioId:", ensaioId);
      return ensaioId ? ensaioId : store.state.emptyGuid;
    };
    var optionsFarmacopedia = ref([]);
    var retornoSeletorNcm = [];
    let viewModel = ref({
      id: ref(getId()),
      descricaoEnsaio: ref(""),
      farmacopeiaId: ref(),
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

    const onGetNcms = async () => {
      var retornoBackSeletor = await servico.getSeletor();
      console.log("retornoBackSeletor", retornoBackSeletor);
      var returnMetodoNcm = [];
      retornoBackSeletor.forEach(front => {
        returnMetodoNcm.push({ value: front.id, label: front.descricao });
      });
      optionsFarmacopedia.value = returnMetodoNcm;
      return returnMetodoNcm;
    };
    retornoSeletorNcm.value = onGetNcms();
    const validarForm = e => {
      e.preventDefault();
      let lengBrEs = lang();
      if (viewModel.value.farmacopeiaId) {
        if (
          viewModel.value.id !== store.state.emptyGuid &&
          viewModel.value.id !== undefined
        ) {
          servico.edit(viewModel.value).then(response => {
            if (response.status == 200) {
              Swal.fire({
                icon: "success",
                title: `${lengBrEs.concluido}`,
                text: `${lengBrEs.oItem} "${viewModel.value.descricaoEnsaio}" ${lengBrEs.foiEditado}.`,
              });
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} "${viewModel.value.descricaoEnsaio}"  ${lengBrEs.naoFoiEditado}.`,
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
                text: `${lengBrEs.oItem} "${viewModel.value.descricaoEnsaio}" ${lengBrEs.foiAdicionado}.`,
              });
              viewModel.value.descricaoEnsaio = ref("");
              viewModel.value.farmacopeiaId = ref();
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} ${viewModel.value.descricaoEnsaio} ${lengBrEs.naoFoiAdicionado}.`,
              });
            }
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    };
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.descricaoEnsaio = retorno.descricaoEnsaio;
      console.log("farmacopeia id", retorno.farmacopeiaId);
      if (retorno.farmacopeiaId) {
        viewModel.value.farmacopeiaId = retorno.farmacopeiaId;
      }
    };
    try {
      console.log("id:", ensaioId);
      if (
        ensaioId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(ensaioId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      optionsFarmacopedia,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
