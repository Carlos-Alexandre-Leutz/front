<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("cadastroGrupoProduto") }}
              </strong>
            </header>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>
                      {{ $i18n.translate("camposObrigatório") }}
                    </small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="name"
                      placeholder="Digite a Descrição"
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
              @click="$router.push('/grupoProduto/1')"
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
import servico from "../../../services/estoque/grupoProduto.js";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
import enumSelect from "../../../services/enum/enum.js";
import traducaoAlertas from "../../../plugins/i18n/alertas";

export default {
  setup() {
    const {
      params: { grupoProdutoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("grupoProdutoId:", grupoProdutoId);
      return grupoProdutoId ? grupoProdutoId : store.state.emptyGuid;
    };
    let optionsTipos = ref([]);
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
      tipo: ref(0),
    });
    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
    optionsTipos.value = enumSelect.GrupoProdutoTipo;
    const ObterGrupoProduto = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno", retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
      viewModel.value.tipo = retorno.tipo;
    };
    const lang = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoAlertas.br;
      if (langDefault != "br") {
        langTrad = traducaoAlertas.es;
      }
      return langTrad;
    };

    try {
      if (grupoProdutoId !== undefined) {
        ObterGrupoProduto(grupoProdutoId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de para edição", err);
    }

    return {
      viewModel,
      getEditMode,
      optionsTipos,
      store,
      servico,
      lang,
    };
  },
  methods: {
    async validarForm(e) {
      e.preventDefault();
      if (this.viewModel.tipo) {
        this.salvaForm(e);
      } else {
        let lengBrEs = this.lang();
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    },
    async salvaForm(e) {
      e.preventDefault();
      let lengBrEs = this.lang();
      if (
        this.viewModel.id !== this.store.state.emptyGuid &&
        this.viewModel.id !== undefined
      ) {
        this.servico.edit(this.viewModel).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${this.viewModel.descricao}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${this.viewModel.descricao}"  ${lengBrEs.naoFoiEditado}.`,
            });
          }
        });
      } else {
        this.servico.add(this.viewModel).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${this.viewModel.descricao}" ${lengBrEs.foiAdicionado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${this.viewModel.descricao}"  ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
          this.viewModel.descricao = ref("");
          this.viewModel.tipo = ref(0);
        });
      }
    },
  },
  components: { Multiselect },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
