<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("bula") }}
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
                    <label
                      >* {{ $i18n.translate("descricao") }}
                      {{ $i18n.translate("bula") }}</label
                    >
                    <quill-editor
                      ref="myQuillEditor"
                      v-model="content"
                      :options="options"
                      @blur="adicionadoDescricaoNaVw($event)"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("textoBula") }}</label>
                    <Multiselect
                      v-model="viewModel.tipoBula"
                      placeholder="Selecione o Tipo"
                      :options="optionsTipos"
                    />
                  </div>
                </div>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="CheckboxSslSaida"
                    v-model="viewModel.limitacaoVisual"
                  />
                  {{ $i18n.translate("limitacaoVisual") }}
                </label>
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
              @click="$router.push('/bula/1')"
            >
              {{ $i18n.translate("voltar") }}
            </button>
            <div @click="nhaco()">nhaco</div>
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
import servico from "../../../services/Producao/bula/index";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
import enumSelect from "../../../services/enum/enum.js";
//import teste from "../../../components/testesDeComponetes/testeDeComponente"
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: { Multiselect, QuillEditor },

  setup() {
    const {
      params: { bulaId },
    } = useRoute();
    const store = useStore();
    var optionsTipos = ref([]);
    const getId = () => {
      console.log("bulaId:", bulaId);
      return bulaId ? bulaId : store.state.emptyGuid;
    };
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(),
      tipoBula: ref(),
      limitacaoVisual: ref(false),
    });
    let teste2;
    const adicionadoDescricaoNaVw = quill => {
      //  console.log("text", text.value );
      console.log("quill", quill.value);
      //  console.log("html", html.value );
      let teste = quill.value.stringify();
      console.log("teste", teste);
      viewModel.value.descricao = teste;
      console.log("viewmodel:", viewModel.value);
    };
    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
    optionsTipos.value = enumSelect.BulaTipo;
    const lang = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoAlertas.br;
      if (langDefault != "br") {
        langTrad = traducaoAlertas.es;
      }
      return langTrad;
    };
    const nhaco = () => {
      let nhaquinho = viewModel.value.descricao;
      console.log(nhaquinho);
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
              text: `${lengBrEs.oItem} ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.oItem} ${lengBrEs.foiAdicionado}.`,
            });
            viewModel.value.descricao = ref("");
            viewModel.value.tipoBula = ref();
            viewModel.value.limitacaoVisual = ref(false);
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      console.log(retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
      viewModel.value.tipoBula = retorno.tipoBula;
      viewModel.value.limitacaoVisual = retorno.limitacaoVisual;
    };
    try {
      console.log("id:", bulaId);
      if (
        bulaId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(bulaId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      optionsTipos,
      nhaco,
      adicionadoDescricaoNaVw,
      teste2,
      options: {
        placeholder: "Digite a bula",
        readOnly: false,
        theme: "snow",
      },
      content: "",
    };
  },
  // methods: {
  //   onEditorBlur(quill) {
  //     this.viewModel.descricao = quill.value;
  //     console.log("teste",  this.viewModel);
  //   },
  // },
};
</script>

<style></style>
