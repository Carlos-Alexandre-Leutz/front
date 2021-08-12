<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("tipoContato") }}
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
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderDescricao"
                      required
                      maxlength="50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex mt-3 buttonsActions">
            <button v-if="edicao" class="btn btn-success mr-2" type="submit">
              {{ $i18n.translate("salvar") }}
            </button>
            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/tipoContato/1')"
            >
              {{ $i18n.translate("voltar") }}
            </button>
          </div>
        </div>
      </div>
    </form>
    <br><br><br>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute , useRouter } from "vue-router";
import servico from "../../services/contato/tipoContato";
import traducaoAlertas from "../../../src/plugins/i18n/alertas";
import Swal from "sweetalert2";
import traducaoParametros from "../../../src/plugins/i18n/parametros";
export default {
  setup() {
    let edicao;
    const {
      params: { visualizar },
    } = useRoute();
    const {
      params: { contatoId },
    } = useRoute();
    const parametroVisualizar = () => {
      console.log("visualizar:", visualizar);
      if (visualizar) {
        edicao = false;
      } else {
        edicao = true;
      }
    };
    parametroVisualizar();
    let router = useRouter();
    const store = useStore();
    const getId = () => {
      console.log("contatoId:", contatoId);
      return contatoId ? contatoId : store.state.emptyGuid;
    };
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
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
    let languagePageNow = langParametos();
    placeholderDescricao = ` ${languagePageNow.digite} ${languagePageNow.descricao}`;
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
              showDenyButton: true,
              confirmButtonText: `${lengBrEs.continuarCadastrando}`,
              denyButtonText: `${lengBrEs.voltar}`,
              text: `${lengBrEs.oItem} "${viewModel.value.descricao}" ${lengBrEs.foiAdicionado}.`,
            }).then(result => {
              if (result.isConfirmed) {
                console.log('continuar cadastrando')
              } else if (result.isDenied) {
                 router.push("/tipoContato/1")
              }
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
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      console.log("retono", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
    };
    try {
      console.log("id:", contatoId);
      if (
        contatoId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(contatoId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      placeholderDescricao,
      edicao,
    };
  },
};
</script>

<style>
.buttonsActions {
  position: fixed;
  bottom: 10px;
}
</style>
