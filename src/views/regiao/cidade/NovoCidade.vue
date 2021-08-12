<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("cadastroCidade") }}
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
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      v-model="viewModel.nome"
                      class="form-control"
                      type="nome"
                      placeholder="Digite o Nome"
                      required
                      maxlength="100"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("codigoIbge") }} </label>
                    <input
                      v-model="viewModel.codigoIbge"
                      class="form-control"
                      type="number"
                      placeholder="Digite o Código de IBGE"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-8 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("estado") }}</label>
                    <Multiselect
                      v-model="viewModel.idEstado"
                      placeholder="Selecione o Estado"
                      :options="optionsEstados"
                      :searchable="true"
                      required
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
              @click="$router.push('/cidade/1')"
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
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/regiao/cidade.js";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
import traducaoAlertas from "../../../plugins/i18n/alertas";
export default {
  setup() {
    const {
      params: { cidadeId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return cidadeId ? cidadeId : store.state.emptyGuid;
    };
    console.log(cidadeId);
    let retornoSeletorEstados = [];
    let optionsEstados = ref([]);
    let viewModel = ref({
      id: ref(getId()),
      nome: ref(""),
      codigoIbge: ref(""),
      idEstado: ref(""),
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
      if (viewModel.value.idEstado) {
        salvaForm(e);
      } else {
        let lengBrEs = lang();
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    };
    const salvaForm = e => {
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
              text: `${lengBrEs.oItem} "${viewModel.value.nome}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nome}"  ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.oItem} "${viewModel.value.nome}" ${lengBrEs.foiAdicionado}.`,
            });
            viewModel.value.nome = ref("");
            viewModel.value.codigoIbge = ref("");
            viewModel.value.idEstado = ref("");
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.nome} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    onMounted(async () => {
      const onGetSeletorEstados = async () => {
        var retornoBackSeletor = await servico.getSeletorEstados();
        var returnMetodoEstados = [];
        retornoBackSeletor.forEach(front => {
          returnMetodoEstados.push({ value: front.id, label: front.descricao });
        });
        optionsEstados.value = returnMetodoEstados;
        return returnMetodoEstados;
      };
      retornoSeletorEstados.value = await onGetSeletorEstados();
      const ObterCidade = async id => {
        var retorno = await servico.getId(id);
        console.log("viewmodel: ", viewModel);
        viewModel.value.nome = retorno.nome;
        viewModel.value.codigoIbge = retorno.codigoIbge;
        viewModel.value.idEstado = retorno.idEstado;
      };

      try {
        if (
          cidadeId !== undefined &&
          viewModel.value.id !== store.state.emptyGuid
        ) {
          ObterCidade(cidadeId);
        }
      } catch (err) {
        console.error("Erro ao obter cidade para edição", err);
      }
    });
    return {
      viewModel,
      getEditMode,
      optionsEstados,
      servico,
      store,
      validarForm,
      salvaForm,
    };
  },
  components: { Multiselect },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
