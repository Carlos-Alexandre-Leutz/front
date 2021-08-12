<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("configuracaoEmail") }}
              </strong>
            </header>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>
                      {{ $i18n.translate("camposObrigatorio") }}
                    </small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label> * {{ $i18n.translate("email") }} </label>
                    <input
                      v-model="viewModel.email"
                      class="form-control"
                      type="email"
                      placeholder="Digite o e-mail"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-2 col-lg-2 col-xl-2">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("usuario") }}</label>
                    <input
                      v-model="viewModel.usuario"
                      class="form-control"
                      type="text"
                      placeholder="Digite o usuário"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-2 col-lg-2 col-xl-2">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("senha") }}</label>
                    <input
                      v-model="viewModel.senha"
                      class="form-control"
                      type="password"
                      placeholder="Digite a senha"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("servidorSaida") }}</label>
                    <input
                      v-model="viewModel.hostSaida"
                      class="form-control"
                      type="text"
                      placeholder="Digite o host saída"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("portaSaida") }}</label>
                    <input
                      v-model="viewModel.portaSaida"
                      class="form-control"
                      type="number"
                      placeholder="Digite a porta sáida"
                      required
                    />
                  </div>
                </div>
                <div
                  class="d-flex align-items-center col-sm-12 col-md-4 col-lg-4 col-xl-4"
                >
                  <div class="form-check">
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="CheckboxSslSaida"
                        v-model="viewModel.sslSaida"
                      />
                      {{ $i18n.translate("sslSaida") }}
                    </label>
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
              @click="$router.push('/configuracaoEmail/1')"
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
import servico from "../../../services/usuario/configuracaoEmail";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
export default {
  setup() {
    const {
      params: { configId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return configId ? configId : store.state.emptyGuid;
    };
    let siglaTeste = ref("");
    let viewModel = ref({
      id: ref(getId()),
      contaId: ref(store.state.emptyGuid),
      email: ref(""),
      usuario: ref(""),
      senha: ref(""),
      hostSaida: ref(""),
      portaSaida: ref(),
      sslSaida: ref(false),
    });
    const getEditMode = () => {
      return viewModel.value.id ? true : false;
    };
    watch(
      () => siglaTeste.value,
      (sigla, siglaOld) => {
        console.log("Changed! New: ", sigla, "Old: ", siglaOld);
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
              text: `${lengBrEs.oItem} "${viewModel.value.email}" ${lengBrEs.foiEditado}.`,
            });
            viewModel.value.email = ref("");
            viewModel.value.usuario = ref("");
            viewModel.value.senha = ref("");
            viewModel.value.hostSaida = ref("");
            viewModel.value.portaSaida = ref(0);
            viewModel.value.sslSaida = ref(false);
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${viewModel.value.email}"  ${lengBrEs.naoFoiEditado}.`,
            });
          }
        });
      } else {
        servico.add(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.email}" ${lengBrEs.foiAdicionado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.email} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const ObterviewModel = async id => {
      var retorno = await servico.getId(id);
      console.log("retorno" , retorno)
      viewModel.value.id = retorno.id;
      viewModel.value.email = retorno.email;
      viewModel.value.usuario = retorno.usuario;
      viewModel.value.senha = retorno.senha;
      viewModel.value.hostSaida = retorno.hostSaida;
      viewModel.value.portaSaida = retorno.portaSaida;
      viewModel.value.sslSaida = retorno.sslSaida;
    };
    try {
      console.log("id", configId);
      if (configId !== undefined) {
        ObterviewModel(configId);
      }
    } catch (err) {
      console.error("Erro ao obter princípio ativo para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterviewModel,
    };
  },
};
</script>


    

     