<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{
                $i18n.translate("metodo")
              }}</strong>
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
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModel.DescricaoMetodo"
                      class="form-control"
                      type="text"
                      maxlength="10"
                      placeholder="Digite a descrição"
                      required
                    />
                  </div>
                </div>

                <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label> {{ $i18n.translate("gotasMetodos") }}</label>
                    <input
                      v-model="viewModel.GotasMetodos"
                      class="form-control"
                      type="number"
                      placeholder="Digite a quantidade de Gotas"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <div class="form-group">
                    <label>{{ $i18n.translate("ouPercentual") }} (%)</label>
                    <input
                      v-model="viewModel.Percentual"
                      class="form-control"
                      type="number"
                      maxlength="50"
                      step="any"
                      placeholder="Digite o percentual (%)"
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
              @click="$router.push('/metodo/1')"
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
import servico from "../../../services/venda/metodo/index";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";

export default {
  setup() {
    const {
      params: { metodoId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return metodoId ? metodoId : store.state.emptyGuid;
    };
    var viewModel = ref({
      id: ref(getId()),
      DescricaoMetodo: ref(""),
      GotasMetodos: ref(),
      Percentual: ref(),
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
      let itenDescricao = viewModel.value.DescricaoMetodo;
      if (viewModel.value.GotasMetodos && viewModel.value.Percentual) {
        console.log(viewModel.value.GotasMetodos, viewModel.value.Percentual);
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.InformeQuantidadeDeGotasPorcentagem}`,
        });
      } else if (
        viewModel.value.GotasMetodos != "" &&
        viewModel.value.GotasMetodos <= 0
      ) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.quantidadeGotasInformadoInvalido}`,
        });
      } else if (
        viewModel.value.Percentual <= 0 &&
        viewModel.value.Percentual != ""
      ) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.percentualInformadoInválido}`,
        });
      } else if (viewModel.value.Percentual > 100) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.percentualInformadoInválido}`,
        });
      } else {

        if (viewModel.value.Percentual == undefined) {
          viewModel.value.Percentual = ref();
          console.log("percentual",viewModel.value.Percentual)
        }
        if (viewModel.value.GotasMetodos == undefined) {
          viewModel.value.GotasMetodos = ref();
          console.log("gotas",viewModel.value.GotasMetodos)
        }

        if (
          viewModel.value.id !== store.state.emptyGuid &&
          viewModel.value.id !== undefined
        ) {

          servico.edit(viewModel.value).then(response => {
            if (response.status == 200) {
              Swal.fire({
                icon: "success",
                title: `${lengBrEs.concluido}`,
                text: `${lengBrEs.oItem} "${itenDescricao}" ${lengBrEs.foiEditado}.`,
              });
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} "${itenDescricao}"  ${lengBrEs.naoFoiEditado}.`,
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
                text: `${lengBrEs.oItem} "${itenDescricao}" ${lengBrEs.foiAdicionado}.`,
              });
              viewModel.value.DescricaoMetodo = ref("");
              viewModel.value.GotasMetodos = ref();
              viewModel.value.Percentual = ref();
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} ${itenDescricao} ${lengBrEs.naoFoiAdicionado}.`,
              });
            }
          });
        }
      }
    };

    const ObterTipoContato = async id => {
      var retorno = await servico.getId(id);
      console.log(retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.DescricaoMetodo = retorno.descricaoMetodo;
      viewModel.value.GotasMetodos = retorno.gotasMetodos;
      viewModel.value.Percentual = retorno.percentual;
    };
    try {
      console.log("id:", metodoId);
      if (metodoId !== undefined) {
        ObterTipoContato(metodoId);
      }
    } catch (err) {
      console.error("Erro ao obter tipo de contato para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      servico,
      store,
      validarForm,
    };
  },
};
</script>

<style></style>