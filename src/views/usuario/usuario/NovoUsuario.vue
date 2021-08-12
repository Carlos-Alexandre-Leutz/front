<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("CadastroUsuario") }}
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
                    <label>* {{ $i18n.translate("email") }}</label>
                    <input
                      v-model="viewModel.email"
                      class="form-control"
                      type="email"
                      :placeholder="$i18n.translate('digiteEmail')"
                      required
                      maxlength="50"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      v-model="viewModel.nome"
                      class="form-control"
                      type="nome"
                      :placeholder="$i18n.translate('digiteNome')"
                      required
                      maxlength="80"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("senha") }}</label>
                    <input
                      v-model="viewModel.senha"
                      class="form-control"
                      type="password"
                      :placeholder="$i18n.translate('digiteSenha')"
                      required
                      maxlength="35"
                      :readonly="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("grupoUsuario") }}</label>
                    <Multiselect
                      v-model="viewModel.grupoAcessosId"
                      mode="tags"
                      :placeholder="$i18n.translate('selecioneGrupoUsuario')"
                      :options="optionsGrupos"
                      :searchable="true"
                      :disabled="inputReadonly"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("conta") }}</label>
                    <Multiselect
                      v-model="viewModel.contasId"
                      mode="tags"
                      :placeholder="$i18n.translate('selecioneConta')"
                      :options="optionsContas"
                      :searchable="true"
                      :disabled="inputReadonly"
                    />
                  </div>
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <div class="form-group form-check" style="padding-top: 20px">
                    <input
                      type="checkbox"
                      id="ativo"
                      class="form-check-input"
                      v-model="viewModel.ativo"
                      :disabled="inputReadonly"
                    />
                    <label class="form-check-label" for="ativo">
                      {{ $i18n.translate("ativo") }}
                    </label>
                  </div>
                </div>
                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <div class="form-group form-check" style="padding-top: 20px">
                    <input
                      type="checkbox"
                      id="trocarSenha"
                      class="form-check-input"
                      v-model="viewModel.trocarSenhaProximoAcesso"
                      :disabled="inputReadonly"
                    />
                    <label class="form-check-label" for="trocarSenha">
                      {{ $i18n.translate("trocarSenhaProximoAcesso") }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex mt-3 ml-1 buttonsActions">
            <button
              v-if="mostrarBtnSalvar"
              class="btn btn-success mr-2"
              type="submit"
            >
              {{ $i18n.translate("salvar") }}
            </button>
            <input
              type="button"
              v-if="mostrarBtnSalvar"
              class="btn btn-warning mr-2"
              @click="limpaForm()"
              :value="$i18n.translate('limparFormulario')"
            />

            <button
              class="btn btn-secondary"
              type="reset"
              @click="$router.push('/usuario/1')"
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
import { useRoute, useRouter } from "vue-router";
import servico from "../../../../src/services/usuario/usuario";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";

export default {
  setup() {
    const {
      params: { usuarioId, visualizar },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      return usuarioId ? usuarioId : store.state.emptyGuid;
    };
    console.log("visualizar", visualizar);
    if (visualizar) {
      mostrarBtnSalvar = false;
      inputReadonly = true;
    } else {
      mostrarBtnSalvar = true;
      inputReadonly = false;
    }
    let mostrarBtnSalvar;
    let inputReadonly;
    let title;
    let editar;
    let excluir;

    let router = useRouter();
    let visualizarRegistro;
    let retornoSeletorGrupo = [];
    let optionsGrupos = ref([]);
    let retornoSeletorConta = [];
    let optionsContas = ref([]);
    let viewModel = ref({
      id: ref(getId()),
      email: ref(""),
      nome: ref(""),
      senha: ref(""),
      grupoAcessosId: ref([]),
      contasId: ref([]),
      ativo: ref(true),
      trocarSenhaProximoAcesso: ref(true),
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
      let grupoUsuario = Object.entries(viewModel.value.grupoAcessosId).length;
      let conta = Object.entries(viewModel.value.contasId).length;
      if (grupoUsuario && conta) {
        salvaForm();
      } else {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.atencao}`,
          text: `${lengBrEs.PreenchaOCampo}`,
        });
      }
    };
    const salvaForm = () => {
      let lengBrEs = lang();
      let itemSelected = viewModel.value.email;
      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico.edit(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${itemSelected}" ${lengBrEs.foiEditado}.`,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} "${itemSelected}"  ${lengBrEs.naoFoiEditado}.`,
            });
            console.log(response.status);
          }
        });
      } else {
        console.log("viewmodel:", viewModel.value);
        servico.add(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              showDenyButton: true,
              confirmButtonText: `${lengBrEs.continuarCadastrando}`,
              denyButtonText: `${lengBrEs.voltar}`,
              text: `${lengBrEs.oItem} "${itemSelected}" ${lengBrEs.foiAdicionado}.`,
            }).then(result => {
              if (result.isConfirmed) {
                console.log("continuar cadastrando");
              } else if (result.isDenied) {
                router.push("/usuario/1");
              }
            });
            limpaForm();
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${itemSelected} ${lengBrEs.naoFoiAdicionado}.`,
            });
            console.log(response);
          }
        });
      }
    };
    const limpaForm = () => {
      viewModel.value.email = ref("");
      viewModel.value.nome = ref("");
      viewModel.value.senha = ref("");
      viewModel.value.grupoAcessosId = ref();
      viewModel.value.contasId = ref();
      viewModel.value.ativo = ref(true);
      viewModel.value.trocarSenhaProximoAcesso = ref(true);
    };

    const reduzDescricao = str => {
      if (str.length >= 20) {
        return str.substring(0, 20) + "...";
      } else {
        return str;
      }
    };
    const onGetContas = async () => {
      let retornoBackConta = await servico.getSeletorConta();
      let returnMetodoConta = [];
      retornoBackConta.forEach(front => {
        returnMetodoConta.push({
          value: front.id,
          label: reduzDescricao(front.nomeFantasia),
        });
      });
      optionsContas.value = returnMetodoConta;
      return returnMetodoConta;
    };
    const onGetGrupos = async () => {
      let retornoBackGrupo = await servico.getSeletorGrupo();
      let returnMetodoGrupo = [];
      retornoBackGrupo.forEach(front => {
        returnMetodoGrupo.push({ value: front.id, label: reduzDescricao(front.descricao) });
      });
      optionsGrupos.value = returnMetodoGrupo;
      return returnMetodoGrupo;
    };
    retornoSeletorGrupo.value = onGetGrupos();
    retornoSeletorConta.value = onGetContas();
    const ObterUsuario = async id => {
      var retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.email = retorno.email;
      viewModel.value.nome = retorno.nome;
      viewModel.value.senha = retorno.senha;
      viewModel.value.grupoAcessosId = retorno.grupoAcessosId;
      viewModel.value.contasId = retorno.contasId;
      viewModel.value.ativo = retorno.ativo == null ? true : retorno.ativo;
      viewModel.value.trocarSenhaProximoAcesso =
        retorno.trocarSenhaProximoAcesso == null
          ? true
          : retorno.trocarSenhaProximoAcesso;
    };
    try {
      console.log("id:", usuarioId);
      if (
        usuarioId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterUsuario(usuarioId);
      }
    } catch (err) {
      console.error("Erro ao obter o usuário para edição", err);
    }

    return {
      getEditMode,
      optionsContas,
      optionsGrupos,
      viewModel,
      servico,
      store,
      lang,
      validarForm,
      mostrarBtnSalvar,
      inputReadonly,
      title,
      editar,
      excluir,
      visualizarRegistro,
      salvaForm,
      limpaForm,
      reduzDescricao
    };
  },
  components: { Multiselect },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.buttonsActions {
  position: fixed;
  bottom: 10px;
}
</style>