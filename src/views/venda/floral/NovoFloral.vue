<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("floral") }}
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
                    <label>* {{ $i18n.translate("volume") }}</label>
                    <input
                      v-model="viewModel.volume"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderVolume"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("qtdInicialTabela") }}</label>
                    <input
                      v-model="viewModel.qtdInicialTabela"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderInicialGotas"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("qtdFinalTabela") }}</label>
                    <input
                      v-model="viewModel.qtdFinalTabela"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderFinalGotas"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("valorVendaTabela") }}</label>
                    <input
                      v-model="viewModel.valorVendaTabela"
                      class="form-control"
                      type="number"
                      :placeholder="placeholderValorVenda"
                      step="any"
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
              @click="$router.push('/floral/1')"
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
import servico from "../../../services/venda/floral";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import traducaoParametros from "../../../plugins/i18n/parametros"
import Swal from "sweetalert2";
export default {
  setup() {
    const {
      params: { floralId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("floralId:", floralId);
      return floralId ? floralId : store.state.emptyGuid;
    };
    let viewModel = ref({
      id: ref(getId()),
      volume: ref(),
      qtdInicialTabela: ref(),
      qtdFinalTabela: ref(),
      valorVendaTabela: ref(),
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
    let placeholderVolume;
    let placeholderInicialGotas;
    let placeholderFinalGotas;
    let placeholderValorVenda;
    let languagePageNow = langParametos();
    placeholderVolume = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.volume}`;
    placeholderInicialGotas = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.inicialGotas}`;
    placeholderFinalGotas = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.finalGotas}`;
    placeholderValorVenda = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.valorVenda}`;

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
              text: `${lengBrEs.oItem} "${viewModel.value.volume}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.volume}"  ${lengBrEs.naoFoiEditado}.`,
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
              text: `${lengBrEs.oItem} "${viewModel.value.volume}" ${lengBrEs.foiAdicionado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.volume} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.volume = retorno.volume;
      viewModel.value.qtdInicialTabela = retorno.qtdInicialTabela;
      viewModel.value.qtdFinalTabela = retorno.qtdFinalTabela;
      viewModel.value.valorVendaTabela = retorno.valorVendaTabela;
    };
    try {
      console.log("id:", floralId);
      if (
        floralId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(floralId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      placeholderVolume,
      placeholderInicialGotas,
      placeholderFinalGotas,
      placeholderValorVenda,
    };
  },
};
</script>

<style></style>
