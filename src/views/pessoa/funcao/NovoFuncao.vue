<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("funcao") }}
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
                      maxlength="100"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label
                      >* {{ $i18n.translate("descricao") }}
                      {{ $i18n.translate("reduzida") }}</label
                    >
                    <input
                      v-model="viewModel.descricaoReduzida"
                      class="form-control"
                      type="text"
                      :placeholder="placeholderDescricaoReduzida"
                      maxlength="50"
                      required
                    />
                  </div>
                </div>

                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ativo") }}</label
                    ><br />
                    <input v-model="viewModel.snAtivo" type="checkbox" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex mt-3 ml-1 buttonsActions">
            <button
              v-if="mostrarBtnSalvar"
              class="btn btn-success"
              type="submit"
            >
              {{ $i18n.translate("salvar") }}
            </button>
            <div
              v-if="mostrarBtnSalvar"
              class="btn btn-warning ml-2 mr-2"
              @click="limpaForm()"
            >
              {{ $i18n.translate("limparFormulario") }}
            </div>
            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/funcao/1')"
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
import { useRoute,useRouter } from "vue-router";
import servico from "../../../services/pessoa/funcao";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
import traducaoParametros from "../../../plugins/i18n/parametros";
export default {
  setup() {
    const {
      params: { funcaoId, visualizar },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("funcaoId:", funcaoId);
      return funcaoId ? funcaoId : store.state.emptyGuid;
    };
    if (visualizar) {
      mostrarBtnSalvar = false;
    } else {
      mostrarBtnSalvar = true;
    }
     let router = useRouter();
    let mostrarBtnSalvar;
    let placeholderDescricao;
    let placeholderDescricaoReduzida;
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
      descricaoReduzida: ref(""),
      snAtivo: ref(true),
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
    const atualizartraducaoParametros = () => {
      let languagePageNow = langParametos();
      placeholderDescricao = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.descricao}`;
      placeholderDescricaoReduzida = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.descricao} ${languagePageNow.reduzida}`;
    };
    atualizartraducaoParametros();
    const validarForm = e => {
      e.preventDefault();
      salvaForma();
    };
    const salvaForma = () => {
      let lengBrEs = lang();
      let itemEdt = viewModel.value.descricao;
      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico.edit(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${itemEdt}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${itemEdt}"  ${lengBrEs.naoFoiEditado}.`,
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
                console.log("continuar cadastrando");
              } else if (result.isDenied) {
                router.push("/funcao/1");
              }
            });
            viewModel.value.descricao = ref("");
            viewModel.value.snAtivo = ref(false);
            viewModel.value.descricaoReduzida = ref("");
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${itemEdt} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
      viewModel.value.descricaoReduzida = retorno.descricaoReduzida;
      viewModel.value.snAtivo = retorno.snAtivo;
    };
    try {
      console.log("id:", funcaoId);
      if (
        funcaoId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(funcaoId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      mostrarBtnSalvar,
      salvaForma,
      placeholderDescricao,
      placeholderDescricaoReduzida,
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