<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">{{ $i18n.translate("cadastroClasse") }}</strong>
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
                <div class="col-sm-6 col-md-4 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("descricao") }}</label>
                    <input
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="text"
                      placeholder="Digite a descrição"
                      maxlength="100"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("validadeFarmaciaPopularDias") }}</label>
                    <input
                      v-model="viewModel.validadeDiasFarmaciaPopular"
                      class="form-control"
                      type="number"
                      placeholder="Digite a Validade Farmácia Popular"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex mt-3 ml-1">
            <button class="btn btn-success mr-2" type="submit">{{ $i18n.translate("salvar") }}</button>
            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/classe/1')"
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
import servico from "../../../services/estoque/classe.js";
import Swal from "sweetalert2";
import traducaoAlertas from "../../../plugins/i18n/alertas";
export default {
  setup() {
    const {
      params: { classeId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return classeId ? classeId : store.state.emptyGuid;
    };
    let viewModel = ref({
      id: ref(getId()),
      descricao: ref(""),
      validadeDiasFarmaciaPopular: ref(""),
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
          servico.add(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.descricao}" ${lengBrEs.foiAdicionado}.`,
            });
          viewModel.value.descricao = ref("");
          viewModel.value.validadeDiasFarmaciaPopular = ref("");
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
    const ObterClasse = async id => {
      let retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
      viewModel.value.validadeDiasFarmaciaPopular =
        retorno.validadeDiasFarmaciaPopular;
    };
    try {
      if (classeId !== undefined) {
        ObterClasse(classeId);
      }
    } catch (err) {
      console.error("Erro ao obter classe para edição", err);
    }

    return {
      viewModel,
      servico,
      store,
      getEditMode,
      validarForm
    };
  },
};
</script>

<style></style>
