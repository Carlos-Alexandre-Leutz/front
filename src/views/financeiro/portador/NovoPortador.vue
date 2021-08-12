<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("portador") }}
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
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      v-model="viewModel.nomePortador"
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
                    <label>{{ $i18n.translate("inativoPortador") }}</label>
                    <br />
                    <input
                      v-model="viewModel.InativoPortador"
                      type="checkbox"
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
              @click="$router.push('/portador/1')"
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
import servico from "../../../services/financeiro/portador";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
export default {
  setup() {
    const {
      params: { portadorId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("portadorId:", portadorId);
      return portadorId ? portadorId : store.state.emptyGuid;
    };
    let viewModel = ref({
      id: ref(getId()),
      nomePortador: ref(""),
      InativoPortador: ref(false),
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
              text: `${lengBrEs.oItem} "${viewModel.value.nomePortador}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nomePortador}"  ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.oItem} "${viewModel.value.nomePortador}" ${lengBrEs.foiAdicionado}.`,
            });
            viewModel.value.nomePortador = ref("");
            viewModel.value.InativoPortador = ref(false);
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.nomePortador} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno", retorno)
      viewModel.value.id = retorno.id;
      viewModel.value.nomePortador = retorno.nomePortador;
      viewModel.value.InativoPortador = retorno.inativoPortador;
    };
    try {
      console.log("id:", portadorId);
      if (
        portadorId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(portadorId);
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
