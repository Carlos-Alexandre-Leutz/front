<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("farmacopeia") }}
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
                      v-model="viewModel.descricaoFarmacopeia"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderNome"
                      required
                      max="50"
                    />
                  </div>
                </div>

                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("observacao") }}</label>
                    <input
                      v-model="viewModel.observacaoFarmacopeia"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDescicao"
                      maxlength="1000"
                    />
                  </div>
                </div>
                <!-- modal -->
                <div id="overlay"></div>
                <div
                  v-if="modal"
                  id="endereco"
                  class="modal-loc fade show"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  style="display: block; padding-right: 0px"
                >
                  <div
                    class="col-8 m-auto modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">
                          {{ $i18n.translate("desejaCopiarEnsaios") }} ?
                        </h5>
                        <button
                          type="button"
                          class="close"
                          @click="togglerModal('modalEndereco')"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div class="form-group">
                            <label
                              >*{{ $i18n.translate("copiarEnsaio") }}</label
                            >
                            <Multiselect
                              v-model="viewModel.idFarmacopeiaEnsaio"
                              :placeholder="placeholderFarmacopeia"
                              :options="optionsFarmacopeiaEnsaio"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                          @click="togglerModal('modalEndereco')"
                        >
                          {{ $i18n.translate("voltar") }}
                        </button>
                        <button
                          type="button"
                          class="btn btn btn-success"
                          data-dismiss="modal"
                          @click="salvarFarmacopeia()"
                        >
                          {{ $i18n.translate("salvar") }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex mt-3 ml-1">
            <button type="submit" class="btn btn-success mr-2">
              {{ $i18n.translate("salvar") }}
            </button>
            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/farmacopeia/1')"
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
import servico from "../../../services/Producao/farmacopeia";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
import servicoSeletor from "../../../services/seletor.js";
import Bula from "../../producao/cadastroBula/Bula.vue";
import traducaoParametros from "../../../plugins/i18n/parametros"
export default {
  setup() {
    const {
      params: { farmacopeiaId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("farmacopeiaId:", farmacopeiaId);
      return farmacopeiaId ? farmacopeiaId : store.state.emptyGuid;
    };
    let optionsFarmacopeiaEnsaio = ref([]);
    let viewModel = ref({
      id: ref(getId()),
      descricaoFarmacopeia: ref(""),
      observacaoFarmacopeia: ref(""),
      idFarmacopeiaEnsaio: ref(),
    });
    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
    const obterSeletor = async url => {
      var retornoBack = await servicoSeletor.obterSeletorGenerico(url);
      var returnMetodo = [];
      retornoBack.forEach(e => {
        returnMetodo.push({ value: e.id, label: e.descricao });
      });
      return returnMetodo;
    };
    const PreencherSeletores = async () => {
      optionsFarmacopeiaEnsaio.value = await obterSeletor(
        "Farmacopeia/obter-seletor-Farmacopeia"
      );
      console.log("optionsFarmacopeiaEnsaio", optionsFarmacopeiaEnsaio);
    };
    PreencherSeletores();
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
    let placeholderNome;
    let placeholderDescicao;
    let placeholderFarmacopeia;
    let languagePageNow = langParametos();
    placeholderNome = ` ${languagePageNow.digite} ${languagePageNow.nome}`;
    placeholderDescicao = ` ${languagePageNow.digite} ${languagePageNow.observacao}`;
    placeholderFarmacopeia = ` ${languagePageNow.selecione} ${languagePageNow.a} ${languagePageNow.farmacopeia}`;
    const validarForm = e => {
      e.preventDefault();
      let lengBrEs = lang();
      let itenEdt = viewModel.value.descricaoFarmacopeia;
      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico.edit(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${itenEdt}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${itenEdt}"  ${lengBrEs.naoFoiEditado}.`,
            });
          }
        });
      } else {
        togglerModal();
      }
    };
    const salvarFarmacopeia = () => {
      togglerModal();
      let lengBrEs = lang();
      let itenEdt = viewModel.value.descricaoFarmacopeia;
      console.log("viewmodel:", viewModel.value);
      servico.add(viewModel.value).then(response => {
        if (response.status == 200) {
          Swal.fire({
            icon: "success",
            title: `${lengBrEs.concluido}`,
            text: `${lengBrEs.oItem} "${itenEdt}" ${lengBrEs.foiAdicionado}.`,
          });
          viewModel.value.descricaoFarmacopeia = ref("");
          viewModel.value.observacaoFarmacopeia = ref("");
          viewModel.value.IdFarmacopeiaEnsaio = ref("");
        } else {
          servico.add(viewModel.value).then(response => {
            if (response.status == 200) {
              Swal.fire({
                icon: "success",
                title: `${lengBrEs.concluido}`,
                text: `${lengBrEs.oItem}  "${itenEdt}" ${lengBrEs.foiAdicionado}.`,
              });
            } else if (response.status == 500) {
              response.json().then(data => {
                let listErros = data.erros;
                let farmacopeia5 = "Só é permitido 5 farmacopéias por conta ";
                let farmacopeiaDuplicada = "Descrição ja cadastrada ";
                if (
                  listErros.indexOf(farmacopeia5) > -1 &&
                  listErros.indexOf(farmacopeiaDuplicada) > -1
                ) {
                  Swal.fire({
                    icon: "warning",
                    title: `${lengBrEs.erro}`,
                    text: `${lengBrEs.oItem} ${itenEdt} ${lengBrEs.naoFoiAdicionado}, ${lengBrEs.permitido5farmacopeiasDescricaoCadastrada}`,
                  });
                } else if (listErros.indexOf(farmacopeia5) > -1) {
                  Swal.fire({
                    icon: "warning",
                    title: `${lengBrEs.erro}`,
                    text: `${lengBrEs.oItem} ${itenEdt} ${lengBrEs.naoFoiAdicionado}, ${lengBrEs.permitido5farmacopeiasConta}!`,
                  });
                } else if (listErros.indexOf(farmacopeiaDuplicada) > -1) {
                  Swal.fire({
                    icon: "warning",
                    title: `${lengBrEs.erro}`,
                    text: `${lengBrEs.oItem} ${itenEdt} ${lengBrEs.naoFoiAdicionado}, ${lengBrEs.descricaoCadastrada}`,
                  });
                }
              });
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} ${itenEdt} ${lengBrEs.naoFoiAdicionado}. error 404`,
              });
            }
          });
        }
      });
    };

    let modal = ref(false);
    const togglerModal = () => {
      modal.value = !modal.value;
      let overlay = document.getElementById("overlay");
      let hasClass = overlay.classList.contains("overlay");

      if (hasClass) {
        overlay.classList.remove("overlay");
      } else {
        overlay.classList.add("overlay");
      }
    };

    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.descricaoFarmacopeia = retorno.descricaoFarmacopeia;
      viewModel.value.observacaoFarmacopeia = retorno.observacaoFarmacopeia;
      if (
        retorno.IdFarmacopeiaEnsaio != "00000000-0000-0000-0000-000000000000"
      ) {
        viewModel.value.ensaio = retorno.IdFarmacopeiaEnsaio;
      }
    };
    try {
      console.log("id:", farmacopeiaId);
      if (
        farmacopeiaId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(farmacopeiaId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      optionsFarmacopeiaEnsaio,
      togglerModal,
      modal,
      salvarFarmacopeia,
      placeholderNome,
      placeholderDescicao,
      placeholderFarmacopeia
    };
  },
  components: { Multiselect },
};
Bula;
</script>
<style scoped>
.overlay {
  pointer-events: auto;
  opacity: 1;
  transition: opacity 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

/** JS */

.modal-loc {
  position: fixed;
  top: 0;
  left: 0;
  display: none;
}
.show {
  z-index: 1060;
  width: 100%;
  height: 100%;
}
</style>
