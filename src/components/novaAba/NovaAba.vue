<template>
  <div class="addNewTable">
    <ul id="novoItemAbaixo" class="nav nav-tabs">
      <li class="nav-item">
        <span @click="addNovaAba()" class="nav-link" aria-current="page">
          <i class="mt-1 fas fa-plus-circle fa-lg"></i>
        </span>
      </li>
      <tableAba
        v-for="itens in item"
        :key="itens.id"
        v-bind:link="itens.link"
        v-bind:label="itens.label"
        v-bind:id="itens.id"
        @click="verificaExcluzao()"
      >
        {{ (label = "Ditem.label") }}
        {{ (link = "item.link") }}
        {{ (id = "item.id") }}
      </tableAba>
    </ul>
  </div>
</template>

<script>
//dar uma opção para salvar a aba atual apos clicar no botão
// ou ser o comportamento padrao
// quando add nova aba no botão tem que salavar os campo na tela msm sem mecher no formulario

//quando atualiza apagina tem que zerar tudo as parada no sessionStroge
import Swal from "sweetalert2";
import tableAba from "./tableAba.vue";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import traducaoAlertas from "../../../src/plugins/i18n/alertas";
export default {
  components: {
    tableAba,
  },
  data() {
    // criar um id pra dar um maximo de abas e poder excluir, salvar o conteudo em cache e poder recolocar na tela , lembar de zerar todos o localstrod quando recaregar a pg
    let item = ref([]);
    let paginasAbertas = [];
    function addNovaAba() {
      //antes de criar verifico se ja não eziste
      let itens = sessionStorage.getItem("abasAbertas");
      let abasAbertas = JSON.parse(itens);
      console.log("abasAbertas", abasAbertas.length);
      if (abasAbertas.length <= 3) {
        let pararmPaginaAtual;
        let itemEmAba = false;
        if (process.env.NODE_ENV === "development") {
          let getUrl = window.location.href;
          let url = getUrl.split("/#")[1];
          pararmPaginaAtual = url;
        } else {
          let url = window.location.pathname;
          pararmPaginaAtual = url;
        }
        const filtraData = index => {
          if (index.link == pararmPaginaAtual) {
            itemEmAba = true;
          }
        };
        abasAbertas.forEach(filtraData);
        if (!itemEmAba) {
          //arumar essa label
          let link = window.location;
          let label = link.href.split("/#/")[1];
          if (process.env.NODE_ENV === "development") {
            criaElemento(link.href, label);
          } else {
            criaElemento(link.pathname, label);
          }
        }
        //usar isso para o comportamento:
        //clique no botão depois escolhe uma pagina para add a aba e navega para pagina
        // let links = document.querySelectorAll("a");
        // verificaUltimoClique(links);
      } else {
        //Não add limitacao do navegador
        console.log("não é possival add mais de 3 ");
        const lang = () => {
          let langDefault = localStorage.getItem("idioma") || "br";
          let langTrad = traducaoAlertas.br;
          if (langDefault != "br") {
            langTrad = traducaoAlertas.es;
          }
          return langTrad;
        };
        let lengBrEs = lang();
        Swal.fire({
          icon: "warning",
          title: `${lengBrEs.erro}`,
          text: `${lengBrEs.maisDe4Abas}.`,
        });
      }
    }
    // const verificaUltimoClique = links => {
    //   let temItem = false;
    //   links.forEach(link => {
    //     link.onclick = function () {
    //       if (!temItem) {
    //         temItem = true;
    //         if (process.env.NODE_ENV === "development") {
    //           criaElemento(link.href, link.text);
    //         } else {
    //           criaElemento(link.pathname, link.text);
    //         }
    //       }
    //     };
    //   });
    // };

    let itensNovaAba = ref({});
    const criaElemento = (href, label) => {
      if (process.env.NODE_ENV === "development") {
        href = href.split("/#")[1];
      }
      let gid = uuidv4();
      label = label.replaceAll("/", "");
      itensNovaAba = ref({
        link: href,
        label: label,
        id: gid,
      });
      item.value.push(itensNovaAba.value);
      atualizaAbasAbertas();
      addClassActiveNovoItem();
      //da pra chamar aqui o cara que add a class no novo carra
    };
    const verificaExcluzao = () => {
      let getIdExcluzao = sessionStorage.getItem("idItemKill");
      if (getIdExcluzao) {
        excluiAba(getIdExcluzao);
        excluiAbaPaginas(getIdExcluzao);
        sessionStorage.removeItem("idItemKill");
      }
      getIdExcluzao = 0;
    };
    //exclui do array
    const excluiAba = idExcluzao => {
      const filtraAbaExcluzao = index => {
        if (index.id == idExcluzao) {
          let indexGrid = item.value.indexOf(index);
          item.value.splice(indexGrid, 1);
          atualizaAbasAbertas();
        }
      };
      item.value.forEach(filtraAbaExcluzao);
    };
    const excluiAbaPaginas = id => {
      paginasAbertas = JSON.parse(sessionStorage.getItem("paginasAbertas"));
      const filtraPaginasExcluzao = index => {
        if (index.idItemEmAba == id) {
          let indexGrid = paginasAbertas.indexOf(index);
          paginasAbertas.splice(indexGrid, 1);
          atualizaPaginasAbertas(paginasAbertas);
        }
      };
      paginasAbertas.forEach(filtraPaginasExcluzao);
    };
    const atualizaAbasAbertas = () => {
      sessionStorage.removeItem("abasAbertas");
      let stringfy = JSON.stringify(item.value);
      sessionStorage.setItem("abasAbertas", stringfy);
    };
    const atualizaPaginasAbertas = arrayPaginasAbertas => {
      sessionStorage.removeItem("paginasAbertas");
      let stringfyarrayPaginasAbertas = JSON.stringify(arrayPaginasAbertas);
      sessionStorage.setItem("paginasAbertas", stringfyarrayPaginasAbertas);
    };
    atualizaAbasAbertas();

    const addClassActiveNovoItem = () => {
      let id = itensNovaAba.value.id;
      setTimeout(function () {
        let abas = document.getElementsByClassName("nav-link");
        var array = Array.prototype.slice.call(abas);
        function logArrayElements(element) {
          let div = element;
          div.classList.remove("active");
        }
        array.forEach(logArrayElements);
        let teste = document.getElementById(id);
        teste.classList.add("active");
      }, 90);
    };
    return {
      addNovaAba,
      criaElemento,
      // verificaUltimoClique,
      item,
      verificaExcluzao,
      excluiAba,
      excluiAbaPaginas,
      atualizaPaginasAbertas,
      addClassActiveNovoItem,
    };
  },
};
</script>
