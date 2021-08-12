<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
      integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
      crossorigin="anonymous"
    />
    <section class="navBar">
      <div @click="sidebarOpen()" class="cont-icom-menu">
        <i class="fas fa-bars"></i>
        <input class="form-control" type="text" placeholder="Buscar" />
        <!--  <span class="hamburguer position1"></span>
                <span class="hamburguer largura position2"></span> -->
      </div>
      <div class="cont-logo">
        <img src="../../assets/img/farma-facil.png" alt="" />
      </div>
      <div class="cont-config">
        <selectGlobalizacao></selectGlobalizacao>
        <div class="cont-name">{{ nome }}</div>
        <colapserMenu></colapserMenu>        
      </div>
  
    </section>
    <Sidebar v-on:click="handleClick"></Sidebar>

  </div>
</template>

<script>
import colapserMenu from "../../components/colapserMenu/colapserMenu";
import selectGlobalizacao from "../../components/globalizacao/selectGlobalização";
import Sidebar from "./Sidebar";

//import SidebarMenu from "../../components/base/SidebarMenu";
const token = JSON.parse(localStorage.getItem("user-token"));
var nome = "";
if (token) {
  nome = token.nome;
}
export default {
  components: { colapserMenu, selectGlobalizacao, Sidebar /*SidebarMenu*/ },
  setup() {
    const sidebarOpen = () => {
      let sideBar = document.getElementById("sideBar");
      let sideBarSubNivel = document.getElementById("sideBarSubNivel");

      if (
        document
          .querySelector(".sideBarSubNivel")
          .classList.contains("sideBarSubNivel-active")
      ) {
        sideBarSubNivel.classList.remove("sideBarSubNivel-active");

        localStorage.setItem("EstadoMenu", "Fechando");
      } else if (
        document.querySelector(".sideBar").classList.contains("sideBar-active")
      ) {
        sideBar.classList.remove("sideBar-active");
        localStorage.setItem("EstadoMenu", "menuzinhoFexado");
        console.log("menuinho fexado");
      } else if (
        !document.querySelector(".sideBar").classList.contains("sideBar-active")
      ) {
        sideBar.classList.add("sideBar-active");
        localStorage.setItem("EstadoMenu", "menuzinhoAberto");
      }
    };

    const colapsar = (a, b) => {
      limpaClassActiveColapser();

      let usuario = document.getElementById(a);
      let selectActive = document.getElementById(b);
      if (usuario.classList.contains("colapsado")) {
        usuario.classList.remove("colapsado");
        selectActive.classList.add("active");
      } else {
        usuario.classList.add("colapsado");
        selectActive.classList.remove("active");
      }
    };
    const dashboarActive = () => {
      limpaClassActiveColapser();
      let usuario = document.getElementById("usuario");
      let estoque = document.getElementById("estoque");
      let regiao = document.getElementById("regiao");
      let Tributo = document.getElementById("Tributo");
      let dashboar = document.getElementById("dashboar");
      dashboar.classList.add("active");
      usuario.classList.add("colapsado");
      estoque.classList.add("colapsado");
      regiao.classList.add("colapsado");
      Tributo.classList.add("colapsado");
    };
    function limpaClassActiveColapser() {
      let liUsario = document.getElementById("liUsser");
      let liEstoque = document.getElementById("liEstoque");
      let liRegiao = document.getElementById("liRegiao");
      let liParametros = document.getElementById("liParametros");
      let dashboar = document.getElementById("dashboar");
      liUsario.classList.remove("active");
      liEstoque.classList.remove("active");
      liRegiao.classList.remove("active");
      liParametros.classList.remove("active");
      dashboar.classList.remove("active");
    }
    function fecharColapser(a, b) {
      let usuario = document.getElementById("usuario");
      let estoque = document.getElementById("estoque");
      let regiao = document.getElementById("regiao");
      let Tributo = document.getElementById("Tributo");
      if (a == "usuario") {
        estoque.classList.add("colapsado");
        regiao.classList.add("colapsado");
        Tributo.classList.add("colapsado");
      } else if (a == "estoque") {
        usuario.classList.add("colapsado");
        regiao.classList.add("colapsado");
        Tributo.classList.add("colapsado");
      } else if (a == "regiao") {
        usuario.classList.add("colapsado");
        estoque.classList.add("colapsado");
        Tributo.classList.add("colapsado");
      } else if (a == "Tributo") {
        usuario.classList.add("colapsado");
        estoque.classList.add("colapsado");
        regiao.classList.add("colapsado");
      }
      colapsar(a, b);
    }

    const handleClick = (a) =>{
      console.log( "nhaco", a)
    }
    return {
      colapsar,
      dashboarActive,
      limpaClassActiveColapser,
      fecharColapser,      
      sidebarOpen,     
      nome: nome,
      handleClick
    };
  },
};
</script>

<style>
.display-none {
  display: none;
}
a {
  text-decoration: none;
}
.active {
  border-left: solid #8c0e03 5px;
  background-color: rgb(223, 223, 223);
}
.cont-config {
  display: flex;
}
.cont-name {
  color: black;
  margin-top: 23px;
  padding: 0px 10px 0px 10px;
}
</style>
