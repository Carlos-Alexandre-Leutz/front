<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("mensagemPadrao") }}
              </strong>
            </header>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>{{ $i18n.translate("camposObrigatorio") }}</small>
                  </div>
                </div>

                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <textarea
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a Descrição"
                      required
                    />
                  </div>
                </div>

                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("StatusDescricao") }}</label>
                    <input
                      v-model="viewModel.StatusDescricao"
                      class="form-control"
                      type="text"
                      placeholder="Digite a Descrição"
                      required
                      maxlength="30"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group form-check" style="padding-top: 20px">
                    <input
                      v-model="viewModel.DescricaoRotulo"
                      type="checkbox"
                      class="form-check-input"
                    />
                    <label class="form-check-label">
                      {{ $i18n.translate("DescricaoRotulo") }}</label
                    >
                  </div>
                </div>
                 <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group form-check" style="padding-top: 20px">
                    <input
                      v-model="viewModel.EnviarAutomatico"
                      type="checkbox"
                      class="form-check-input"
                    />
                    <label class="form-check-label">
                      {{ $i18n.translate("EnviarAutomatico") }}</label
                    >
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
              @click="$router.push('/MensagemPadrao/1')"
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
import servico from "../../../services/venda/mensagemPadrao/index";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
export default {
  setup() {
    const {
      params: { mensagemPadraoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("mensagemPadraoId:", mensagemPadraoId);
      return mensagemPadraoId ? mensagemPadraoId : store.state.emptyGuid;
    };

    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
      EnviarAutomatico: ref(false),
      DescricaoRotulo: ref(false),
      StatusDescricao: ref(""),
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
        servico.add(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.descricao}" ${lengBrEs.foiAdicionado}.`,
            });
            viewModel.value.descricao = ref("");
            viewModel.value.EnviarAutomatico = ref(false);
            viewModel.value.DescricaoRotulo = ref(false);
            viewModel.value.StatusDescricao = ref("");
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
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      console.log("response", retorno)
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
      viewModel.value.StatusDescricao = retorno.statusDescricao;
      viewModel.value.DescricaoRotulo = retorno.descricaoRotulo;
      viewModel.value.EnviarAutomatico = retorno.enviarAutomatico;
    };
    try {
      console.log("id:", mensagemPadraoId);
      if (
        mensagemPadraoId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(mensagemPadraoId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
    };
  },
};
</script>

<style></style>
