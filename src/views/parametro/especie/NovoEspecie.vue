<template>
  <div>
    <form @submit="validarForm">
      <!--@change="atualizaViewModelEmMemoria()"-->
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="card shadow">
            <header class="card-header">
              <strong class="align-self-center">
                {{ $i18n.translate("especie") }}
              </strong>
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
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div class="form-group">
                    <label>* {{ $i18n.translate("nome") }}</label>
                    <input
                      v-model="viewModel.nome"
                      class="form-control"
                      type="nome"
                      :placeholder="teste"
                      maxlength="255"
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
              @click="$router.push('/grupoUsuario/1')"
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
import servico from "../../../services/parametro/especie.js";
import traducaoAlertas from "../../../plugins/i18n/alertas";
import Swal from "sweetalert2";
export default {
  setup() {
    const {
      params: { grupoUsuarioId },
    } = useRoute();
    const store = useStore();
    const getId = () => {
      console.log("grupoUsuarioId:", grupoUsuarioId);
      return grupoUsuarioId ? grupoUsuarioId : store.state.emptyGuid;
    };
    let viewModel = ref({
      id: ref(getId()),
      idItemEmAba: ref(""),
      nome: ref(""),
    });
    let teste = "So falta criar o metodo para mudar o idioma do placeholder";

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
        console.log("viewmodel:", viewModel.value);
        servico.add(viewModel.value).then(response => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: `${lengBrEs.concluido}`,
              text: `${lengBrEs.oItem} "${viewModel.value.descricao}" ${lengBrEs.foiAdicionado}.`,
            });
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
      var retorno = await servico.getId(id);
      viewModel.value.id = retorno.id;
      viewModel.value.descricao = retorno.descricao;
    };

    //script referente a abas
    let paginasAbertas = JSON.parse(sessionStorage.getItem("paginasAbertas"));
    let itens = sessionStorage.getItem("abasAbertas");
    let abasAbertas = JSON.parse(itens);
    let pararmPaginaAtual;
    if (process.env.NODE_ENV === "development") {
      let getUrl = window.location.href;
      let url = getUrl.split("/#")[1];
      pararmPaginaAtual = url;
    } else {
      let url = window.location.pathname;
      pararmPaginaAtual = url;
    }
    let itemEmAba = false;
    let idItemEmAba;
    let idItemPagina;
    const filtraPaginaEstaAbertaEmUmaAba = index => {
      if (index.link == pararmPaginaAtual) {
        idItemEmAba = index.id;
        itemEmAba = true;
      }
    };
    const filtraPaginasAbertas = index => {
      if (idItemEmAba == index.idItemEmAba) {
        idItemPagina = true;
      }
    };
    const preencheTelaAba = () => {
      itens = sessionStorage.getItem("abasAbertas");
      abasAbertas = JSON.parse(itens);
      abasAbertas.forEach(filtraPaginaEstaAbertaEmUmaAba);
      if (itemEmAba) {
        itemEmAba = false;
        itens = sessionStorage.getItem("abasAbertas");
        abasAbertas = JSON.parse(itens);
        abasAbertas.forEach(filtraPaginaEstaAbertaEmUmaAba);
        const filtarDadosTela = index => {
          if (index.idItemEmAba == idItemEmAba) {
            viewModel.value.id = index.id;
            viewModel.value.descricao = index.descricao;
            viewModel.value.idItemEmAba = index.idItemEmAba;
          }
        };
        itens = sessionStorage.getItem("paginasAbertas");
        abasAbertas = JSON.parse(itens);
        abasAbertas.forEach(filtarDadosTela);
      } else {
        console.log("pagina não está aberta em uma aba");
      }
    };
    preencheTelaAba();
    const excluiAbaPaginas = id => {
      paginasAbertas = JSON.parse(sessionStorage.getItem("paginasAbertas"));
      const filtraPaginasExcluzao = index => {
        if (index.idItemEmAba == id) {
          let indexGrid = paginasAbertas.indexOf(index);
          paginasAbertas.splice(indexGrid, 1);
          adicionaPaginasAbertas(paginasAbertas);
        }
      };
      paginasAbertas.forEach(filtraPaginasExcluzao);
    };
    const adicionaPaginasAbertas = retornoExcluzao => {
      let viewModelMemoria = {
        idItemEmAba: idItemEmAba,
        id: viewModel.value.id,
        descricao: viewModel.value.descricao,
      };
      paginasAbertas = retornoExcluzao;
      if (paginasAbertas) {
        paginasAbertas.push(viewModelMemoria);
        let itensPreenchidos = JSON.stringify(paginasAbertas);
        sessionStorage.setItem("paginasAbertas", itensPreenchidos);
      } else {
        paginasAbertas = [];
        paginasAbertas.push(viewModelMemoria);
        let itensPreenchidos = JSON.stringify(paginasAbertas);
        sessionStorage.setItem("paginasAbertas", itensPreenchidos);
      }
    };
    const atualizaViewModelEmMemoria = () => {
      //verifico se a pagina esta aberta na aba
      itens = sessionStorage.getItem("abasAbertas");
      abasAbertas = JSON.parse(itens);
      abasAbertas.forEach(filtraPaginaEstaAbertaEmUmaAba);
      if (itemEmAba) {
        itemEmAba = false;
        console.log("ta na aba");
        //se ta na aba pode ser add no paginas abertas
        verificaSeJaEzisteNoPaginasAbertas();
      } else {
        console.log("não ta na aba"); //não faz nada
      }
    };
    const verificaSeJaEzisteNoPaginasAbertas = () => {
      paginasAbertas = JSON.parse(sessionStorage.getItem("paginasAbertas"));
      paginasAbertas.forEach(filtraPaginasAbertas);
      if (idItemPagina) {
        idItemPagina = false;
        //ja ta no sessionStroge
        console.log("ja ta no sessionStroge tem que excluir e tal");
        atualizaPaginasAbertasNoSessionStroge();
      } else {
        adicionaPaginasAbertas();
      }
    };
    const atualizaPaginasAbertasNoSessionStroge = () => {
      /*
      tem que capiturar
      ver o index que é o que eu to mechendo 
      editar ou excluir e adicionar di novo
      */
      console.log("editar o ss");
      console.log("idItemEmAba", idItemEmAba);
      paginasAbertas = JSON.parse(sessionStorage.getItem("paginasAbertas"));
      excluiAbaPaginas(idItemEmAba);
      //tem que add o novo array
    };
    document.addEventListener("click", () => {
      let links = document.getElementsByTagName("a");
      links.forEach(index => {
        index.onclick = function () {
          atualizaViewModelEmMemoria();
        };
      });
      //achar um jeito mais bonito de fazer isso(quando a aba é inicializada)
    });
    //final script referente a abas
    try {
      console.log("id:", grupoUsuarioId);
      if (
        grupoUsuarioId !== undefined &&
        viewModel.value.id !== store.state.emptyGuid
      ) {
        ObterGrupoUsuario(grupoUsuarioId);
      }
    } catch (err) {
      console.error("Erro ao obter grupo de usuário para edição", err);
    }
    return {
      viewModel,
      getEditMode,
      validarForm,
      ObterGrupoUsuario,
      filtraPaginaEstaAbertaEmUmaAba,
      atualizaViewModelEmMemoria,
      preencheTelaAba,
      excluiAbaPaginas,
      adicionaPaginasAbertas,
      filtraPaginasAbertas,
      atualizaPaginasAbertasNoSessionStroge,
      teste
    };
  },
};
</script>

<style></style>
