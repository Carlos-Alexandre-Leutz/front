<template>
  <Suspense>
    <template #default>
      <div class="app-container">
        <header>
          <Navbar
            :collapse="sidebarCollapse"
            @on-sidebar-click="onSideBarClick"
          ></Navbar>
        </header>
        <div class="base-content">
          <div class="sidebar-container">
            <SideBar :collapse="sidebarCollapse"></SideBar>
          </div>
          <div class="main-content-wrapper">
            <MainContent></MainContent>
            <Footer></Footer>
          </div>
        </div>
      </div>
    </template>
    <template #fallback>
       Aguarde....
    </template>
  </Suspense>
  
</template>

<script>
import MainContent from "./MainContent";
import SideBar from "./Sidebar";
import Footer from "./Footer";
import { ref } from "vue";
import Navbar from "./Navbar";
import router from "@/router";
console.log('home');
 const tokenDeAcesso = JSON.parse(localStorage.getItem("user-token"));



export default {
  beforeRouteEnter(){
    console.log('navegação pela url');
    if (!tokenDeAcesso) {
      console.log('não autorizado2');
      router.push({ name: "Login" })
    } else {
      console.log('autorizado');
    }
  },
  components: { Footer, MainContent, SideBar, Navbar },
   setup() {
    
    var sidebarCollapse = ref(false);

    const onSideBarClick = () => {
      sidebarCollapse.value = !sidebarCollapse.value;
    };
    return { sidebarCollapse, onSideBarClick };
  }
};
</script>
