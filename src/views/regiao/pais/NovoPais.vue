<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{
                $i18n.translate("cadastroPais")
              }}</strong>
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
                    <label>* {{ $i18n.translate("codigoIbge") }}</label>
                    <input
                      v-model="viewModel.codigoIbge"
                      class="form-control"
                      type="number"
                      placeholder="Digite o Código de IBGE"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("codigoTelefone") }} </label>
                    <input
                      v-model="viewModel.codigoTelefone"
                      class="form-control"
                      type="number"
                      placeholder="Digite código internacional do telefone"
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
              @click="$router.push('/pais/1')"
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
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import servico from "../../../services/regiao/pais.js";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
export default {
  setup() {
    const {
      params: { paisId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return paisId ? paisId : store.state.emptyGuid;
    };
    let siglaTeste = ref("");
    let viewModel = ref({
      id: ref(getId()),
      nome: ref(""),
      codigoIbge: ref(""),
      codigoTelefone: ref(""),
    });
    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
    watch(
      () => siglaTeste.value,
      (sigla, siglaOld) => {
        console.log("Changed! New: ", sigla, " Old: ", siglaOld);
      }
    );
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
            viewModel.value.codigoTelefone = ref("");
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
    const ObterPais = async id => {
      var retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.nome = retorno.nome;
      viewModel.value.codigoIbge = retorno.codigoIbge;
      viewModel.value.codigoTelefone = retorno.codigoTelefone;
    };
    try {
      if (
        paisId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterPais(paisId);
      }
    } catch (err) {
      console.error("Erro ao obter pais para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterPais,
    };
  },
};
</script>

<style></style>
