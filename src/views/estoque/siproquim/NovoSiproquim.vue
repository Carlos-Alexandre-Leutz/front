<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("siproquim") }}
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
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("siproquim") }}</label>
                    <input
                      v-model="viewModel.codigo_Siproquim"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderSiproquim"
                      required
                      maxlength="11"
                    />
                  </div>
                </div>
                   <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("Ncm") }}</label>
                    <input
                      v-model="viewModel.ncmId"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderNcm"
                      required
                      maxlength="8"
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>*{{ $i18n.translate("descricao") }}</label>
                    <textarea
                      v-model="viewModel.descricao"
                      class="form-control"
                      type="nome"
                      :placeholder="placeholderDescricao"
                      required
                      maxlength="70"
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
              @click="$router.push('/siproquim/1')"
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
import servico from "../../../services/estoque/siproquim";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import traducaoParametros from "../../../plugins/i18n/parametros";
import Swal from "sweetalert2";
export default {
  setup() {
    const {
      params: { siproquimId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("siproquimId:", siproquimId);
      return siproquimId ? siproquimId : store.state.emptyGuid;
    };
    let viewModel = ref({
      id: ref(getId()),
      codigo_Siproquim: ref(""),
      ncmId: ref(""),
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
    let placeholderSiproquim;
    let placeholderNcm;
    let placeholderDescricao;
    let languagePageNow = langParametos();
    placeholderSiproquim = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.siproquim}`;
    placeholderNcm = ` ${languagePageNow.digite} ${languagePageNow.o} ${languagePageNow.ncm}`;
    placeholderDescricao = ` ${languagePageNow.digite} ${languagePageNow.a} ${languagePageNow.descricao}`;

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
            viewModel.value.codigo_Siproquim = ref("");
            viewModel.value.ncmId = ref("");
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
      console.log("siproquimId", id);
      var retorno = await servico.getId(id);
      console.log(retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.codigo_Siproquim = retorno.codigo_Siproquim;
      viewModel.value.ncmId = retorno.ncmId;
      viewModel.value.descricao = retorno.descricao;
    };
    try {
      console.log("id:", siproquimId);
      if (
        siproquimId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(siproquimId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      placeholderSiproquim,
      placeholderNcm,
      placeholderDescricao,
    };
  },
};
</script>

<style></style>
