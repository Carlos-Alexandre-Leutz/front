<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center"
                >{{ $i18n.translate("cadastroPrinckipioAtivo") }}</strong
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
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descricao") }} </label>
                    <input
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="nome"
                      placeholder="Digite uma descrição"
                      required
                    />
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
                  @click="$router.push('/principioAtivo/1')"
                >
                 {{ $i18n.translate("voltar") }}
                </button>
              </div>
            </div>
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
import servico from "../../../services/estoque/principioAtivo.js";
import Swal from "sweetalert2";
import traducaoAlertas from "../../../plugins/i18n/alertas"


export default {
  setup() {
    const {
      params: { principioAtivoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return principioAtivoId ? principioAtivoId : store.state.emptyGuid;
    };
    let siglaTeste = ref("");
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
    });
    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
    watch(
      () => siglaTeste.value,
      (sigla, siglaOld) => {
        console.log("Changed! New: ", sigla, "Old: ", siglaOld);
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
    const ObterPrincipioAtivo = async id => {
      var retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
    };

    try {
      console.log("id", principioAtivoId);
      if (principioAtivoId !== undefined) {
        ObterPrincipioAtivo(principioAtivoId);
      }
    } catch (err) {
      console.error("Erro ao obter princípio ativo para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterPrincipioAtivo,
    };
  },
};
</script>

<style></style>