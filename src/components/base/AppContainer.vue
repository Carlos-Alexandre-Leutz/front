<template>
  <Suspense>
    <template #default>
      <div class="wrapper">
        <div class="main">
          <Header></Header>
          <!--    <NewSidebar></NewSidebar> -->
          <br /><br /><br />
          <br />
          <main id="mainTeste" class="content mainFexado">
            <NovaAba></NovaAba>
            <MainContent></MainContent>
          </main>
        </div>
        <!--   <Footer></Footer> -->
      </div>
    </template>
    <template #fallback> Aguarde.... </template>
  </Suspense>
</template>

<script>
//import Footer from "./Footer";
/*     import NewSidebar from "./NewSidebar"; */
import Header from "./header";
import MainContent from "./MainContent";
import router from "@/router";
import NovaAba from "../novaAba/NovaAba";

window.addEventListener("click", function() {
  if (this.localStorage.EstadoMenu == "Abrindo") {
    this.document.getElementById("mainTeste").classList.remove("mainFexado");
    this.document
      .getElementById("mainTeste")
      .classList.remove("menuzinhoFexado");
    this.document.getElementById("mainTeste").classList.add("mainAberto");
  } else if (this.localStorage.EstadoMenu == "Fechando") {
    this.document.getElementById("mainTeste").classList.remove("mainAberto");
    this.document
      .getElementById("mainTeste")
      .classList.remove("menuzinhoFexado");
    this.document.getElementById("mainTeste").classList.add("mainFexado");
  } else if (this.localStorage.EstadoMenu == "menuzinhoFexado") {
    this.document.getElementById("mainTeste").classList.remove("mainAberto");
    this.document.getElementById("mainTeste").classList.remove("mainFexado");
    this.document.getElementById("mainTeste").classList.add("menuzinhoFexado");
  } else if (this.localStorage.EstadoMenu == "menuzinhoAberto") {
    this.document.getElementById("mainTeste").classList.remove("mainAberto");
    this.document
      .getElementById("mainTeste")
      .classList.remove("menuzinhoFexado");
    this.document.getElementById("mainTeste").classList.add("mainFexado");
  } else {
    this.document.getElementById("mainTeste").classList.remove("mainAberto");
    this.document.getElementById("mainTeste").classList.remove("mainFexado");
    this.document.getElementById("mainTeste").classList.add("menuzinhoFexado");
  }
});

const tokenDeAcesso = JSON.parse(localStorage.getItem("user-token"));

export default {
  beforeRouteEnter() {
    if (!tokenDeAcesso) {
      router.push({ name: "Login" });
    }
  },
  components: { /* NewSidebar, */ Header, MainContent, NovaAba },
  setup() {}
};
</script>
<style scoped>
main {
  transition: all 0.5s linear;
}
.mainFexado {
  margin-left: 120px;
}
.mainAberto {
  margin-left: 370px;
}
.menuzinhoFexado {
  margin-left: 100px;
}
</style>
