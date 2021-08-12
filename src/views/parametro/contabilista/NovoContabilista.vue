<template>
  <div>
    <form @submit="validarForm">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("cadastro") }}
                {{ $i18n.translate("de") }}
                {{ $i18n.translate("contabilista") }}
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
                    <label>* {{ $i18n.translate("nome") }} </label>
                    <input
                      v-model="viewModel.nmContabilista"
                      class="form-control"
                      type="nome"
                      placeholder="Digite a nome"
                      required
                      maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("Crc") }}</label>
                    <input
                      v-model="viewModel.crc"
                      class="form-control"
                      type="nome"
                      placeholder="Digite o Crc"
                      required
                      maxlength="15"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("cpf") }}</label>
                    <input
                      @change="replaceCpf()"
                      id="cpf"
                      v-model="viewModel.cpf"
                      class="form-control"
                      type="nome"
                      placeholder="Digite o CPF"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("cnpj") }}</label>
                    <input
                      id="cnpj"
                      @change="replaceCnpj()"
                      v-model="viewModel.cnpj"
                      class="form-control"
                      type="text"
                      placeholder="Digite o CNPJ"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("email") }}</label>
                    <input
                      v-model="viewModel.email"
                      class="form-control"
                      type="email"
                      placeholder="Digite a Descrição"
                      required
                      maxlength="100"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("cep") }}</label>
                    <input
                      v-model="viewModel.cep"
                      class="form-control"
                      type="cep"
                      placeholder="Digite o CEP"
                      required
                      @blur="validaCep()"
                    />
                    <!-- maxlength="8" -->
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("endereco") }}</label>
                    <input
                      v-model="viewModel.endereco"
                      class="form-control"
                      type="nome"
                      placeholder="Digite o Endereco"
                      required
                      maxlength="255"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("numero") }}</label>
                    <input
                      v-model="viewModel.numero"
                      class="form-control"
                      type="nome"
                      placeholder="Digite o Numero"
                      required
                      maxlength="10"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("complemento") }}</label>
                    <input
                      v-model="viewModel.complemento"
                      class="form-control"
                      type="nome"
                      placeholder="Digite o Complemento"
                      maxlength="100"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("cidade") }}</label>
                    <Multiselect
                      v-model="viewModel.codCidade"
                      placeholder="Selecione o Cidade"
                      :options="optionsCidade"
                      v-on:select="preencherSeletorBairro()"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="form-group">
                    <label>{{ $i18n.translate("bairro") }}</label>
                    <Multiselect
                      v-model="viewModel.codBairro"
                      placeholder="Selecione o Bairro"
                      :options="optionsBairro"
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
              @click="$router.push('/contabilista/1')"
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
import servico from "../../../services/parametro/contabilista";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
import Multiselect from "@vueform/multiselect";
import servicoSeletor from "../../../services/seletor.js";
export default {
  components: { Multiselect },
  setup() {
    const {
      params: { contabilistaId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("contabilistaId:", contabilistaId);
      return contabilistaId ? contabilistaId : store.state.emptyGuid;
    };
    let optionsCidade = ref([]);
    let optionsBairro = ref();
    let viewModel = ref({
      id: ref(getId()),
      nmContabilista: ref(""),
      crc: ref(""),
      cpf: ref(""),
      cnpj: ref(""),
      email: ref(""),
      cep: ref(""),
      endereco: ref(""),
      numero: ref(""),
      complemento: ref(""),
      codCidade: ref(),
      codBairro: ref(),
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
    const obterSeletor = async url => {
      var retornoBack = await servicoSeletor.obterSeletorGenerico(url);
      var returnMetodo = [];
      console.log(returnMetodo);
      retornoBack.forEach(e => {
        returnMetodo.push({ value: e.id, label: e.descricao });
      });
      return returnMetodo;
    };
    const PreencherSeletores = async () => {
      optionsCidade.value = await obterSeletor("cidade/obter-seletor-cidades");
      optionsBairro.value = await obterSeletor("bairro/obter-seletor-bairro");
    };
    const preencherSeletorBairro = async () => {
      var cidadeId = viewModel.value.codCidade;
      viewModel.value.cidadeId = ref("");
      var retornoBackSeletor = [];
      console.log("estadoId", cidadeId);
      if (cidadeId == "" || cidadeId == undefined) {
        retornoBackSeletor = await servicoSeletor.obterSeletorGenerico(
          "bairro/obter-seletor-bairro"
        );
      } else {
        retornoBackSeletor = await servicoSeletor.obterSeletorById(
          "bairro/obter-seletor-bairro?idCidade=",
          cidadeId
        );
        console.log("retornoBackSeletor", retornoBackSeletor);
      }
      console.log(retornoBackSeletor);
      var returnMetodoCidades = [];
      retornoBackSeletor.forEach(front => {
        returnMetodoCidades.push({ value: front.id, label: front.descricao });
      });
      optionsBairro.value = returnMetodoCidades;
    };
    PreencherSeletores();
    const validaCep = () => {
      let cepVm = viewModel.value.cep;
      let replaceTraco = cepVm.replaceAll("-", "");
      let replaceEspaco = replaceTraco.replaceAll(".", "");
      let replaceCep = replaceEspaco.replaceAll(" ", "");
      if (isNaN(replaceCep)) {
        console.log("é string");
      } else {
        if (replaceCep.length == 8) {
          buscaCep(replaceCep);
        } else {
          let lengBrEs = lang();
          Swal.fire({
            icon: "warning",
            title: `${lengBrEs.atencao}`,
            text: `o cep deve ter 8 caracteres`,
          });
        }
      }
    };
    const buscaCep = cep => {
      const options = {
        method: "GET",
        mode: "cors",
        caches: "default",
      };
      console.log("cep recebido", cep);
      fetch(`https://viacep.com.br/ws/${cep}/json/`, options).then(response => {
        response.json().then(data => {
          console.log("data", data);
          let lengBrEs = lang();
          if (data.erro) {
            console.log("CEP INFORMADO É INVALIDO");
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `CEP INFORMADO É INVALIDO.`,
            });
          } else {
            viewModel.value.endereco = data.logradouro;
          }
        });
      });
    };
    const replaceCpf = () => {
      let replaceCpfCnpj = viewModel.value.cpf.replaceAll(/(\.|\/|-)/g, "");
      let lengBrEs = lang();
      let nan = parseInt(replaceCpfCnpj);
      if (isNaN(nan)) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.oCampoCpfNletras}`,
        }).then(result => {
          if (result.isConfirmed) {
            document.getElementById("cpf").focus();
          } else {
            document.getElementById("cpf").focus();
          }
        });
      } else if (replaceCpfCnpj.length == 11) {
        replaceCpfCnpj = mascaraCpf(replaceCpfCnpj);
      } else {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.cpf}  ${lengBrEs.deveTer} 11 ${lengBrEs.caracteres}`,
        }).then(result => {
          if (result.isConfirmed) {
            document.getElementById("cpf").focus();
          } else {
            document.getElementById("cpf").focus();
          }
        });
      }
      function mascaraCpf(valor) {
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
      }
      viewModel.value.cpf = replaceCpfCnpj;
    };
    const replaceCnpj = () => {
      let replaceCpfCnpj = viewModel.value.cnpj.replaceAll(/(\.|\/|-)/g, "");
      let lengBrEs = lang();
      let nan = parseInt(replaceCpfCnpj);
      if (isNaN(nan)) {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.oCampoCnpjNletras}`,
        }).then(result => {
          if (result.isConfirmed) {
            document.getElementById("cnpj").focus();
          } else {
            document.getElementById("cnpj").focus();
          }
        });
      } else if (replaceCpfCnpj.length == 14) {
        replaceCpfCnpj = mascaraCnpj(replaceCpfCnpj);
      } else {
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.cnpf}  ${lengBrEs.deveTer} 14 ${lengBrEs.caracteres}`,
        }).then(result => {
          if (result.isConfirmed) {
            document.getElementById("cpf").focus();
          } else {
            document.getElementById("cpf").focus();
          }
        });
      }
      function mascaraCnpj(valor) {
        return valor.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
          "$1.$2.$3/$4-$5"
        );
      }
      viewModel.value.cnpj = replaceCpfCnpj;
    };
    const validarForm = e => {
      e.preventDefault();
      replaceCpf();
      replaceCnpj();
      // let lengBrEs = lang();
      salvaForm(e);
    };
    const salvaForm = e => {
      e.preventDefault();
      viewModel.value.cnpj = viewModel.value.cnpj.replaceAll(/(\.|\/|-)/g, "");
      viewModel.value.cpf = viewModel.value.cpf.replaceAll(/(\.|\/|-)/g, "");
      let lengBrEs = lang();
      if (
        viewModel.value.id !== store.state.emptyGuid &&
        viewModel.value.id !== undefined
      ) {
        servico
          .edit(viewModel.value)
          .then(response => {
            if (response.status == 200) {
              Swal.fire({
                icon: "success",
                title: `${lengBrEs.concluido}`,
                text: `${lengBrEs.oItem} "${viewModel.value.nmContabilista}" ${lengBrEs.foiEditado}.`,
              });
            } else {
              Swal.fire({
                icon: "warning",
                title: `${lengBrEs.erro}`,
                text: `${lengBrEs.oItem} "${viewModel.value.nmContabilista}"  ${lengBrEs.naoFoiEditado}.`,
              });
            }
          })
          .then(() => {
            replaceCpf();
            replaceCnpj();
          });
      } else {
        console.log("viewmodel:", viewModel.value);
        servico.add(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.nmContabilista}" ${lengBrEs.foiAdicionado}.`,
            });
            viewModel.value.nmContabilista = ref("");
            viewModel.value.crc = ref("");
            viewModel.value.cpf = ref("");
            viewModel.value.cnpj = ref("");
            viewModel.value.email = ref("");
            viewModel.value.cep = ref("");
            viewModel.value.endereco = ref("");
            viewModel.value.numero = ref("");
            viewModel.value.complemento = ref("");
            viewModel.value.codCidade = ref();
            viewModel.value.codBairro = ref();
          } else {
            Swal.fire({
              icon: "warning",
              title: `${lengBrEs.erro}`,
              text: `${lengBrEs.oItem} ${viewModel.value.nmContabilista} ${lengBrEs.naoFoiAdicionado}.`,
            });
          }
        });
      }
    };
    const ObterGrupoUsuario = async id => {
      var retorno = await servico.getId(id);
      console.log(retorno);
      viewModel.value.id = retorno.id;
      viewModel.value.nmContabilista = retorno.nmContabilista;
      viewModel.value.crc = retorno.crc;
      viewModel.value.cpf = retorno.cpf;
      replaceCpf();
      viewModel.value.cnpj = retorno.cnpj;
      replaceCnpj();
      viewModel.value.email = retorno.email;
      viewModel.value.cep = retorno.cep;
      viewModel.value.endereco = retorno.endereco;
      viewModel.value.numero = retorno.numero;
      viewModel.value.complemento = retorno.complemento;
      viewModel.value.codCidade = retorno.codCidade;
      if (viewModel.value.codCidade) {
        console.log("codCidade", viewModel.value.codCidade);
        preencherSeletorBairro(viewModel.value.codCidade);
        viewModel.value.codBairro = retorno.codBairro;
      }
      //viewModel.value.codBairro = retorno.codBairro;
    };
    try {
      console.log("id:", contabilistaId);
      if (
        contabilistaId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(contabilistaId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      optionsCidade,
      optionsBairro,
      preencherSeletorBairro,
      buscaCep,
      validaCep,
      salvaForm,
      replaceCpf,
      replaceCnpj,
    };
  },
};
</script>

<style></style>
