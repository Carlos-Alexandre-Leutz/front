<template>
  <div id="menuSidebar" class="sidebar " :class="sideBarCollapseClass(collapse)">
    <div>
      <ul
        class="sidebar-menu list-unstyled"
        :class="sideBarMenuCollapsedClass(collapse)"
      >
      <!--   <div :class="sideBarSeparatorClass(collapse)">Menu</div> -->
         
        <SidebarMenu routerMenuPath="/dashboar">
          <template v-slot:menu-name>
            <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
             <i class="fas fa-tachometer-alt"></i>
            <span v-if="!collapse" class="label-menu-sidebar">
                Dashboard
            </span>
          </template>
          
        </SidebarMenu>
    
       <!--  <div :class="sideBarSeparatorClass(collapse)">Módulos</div> -->

        <!-- Inicio do bloco Configuração de Usuário, onde contem todos os cadastros -->
        <!-- id é responsável por abrir menu de lado quando estiver colapsado, sendo assim sempre colocar o mesmo
             id para todos que utilizarem submenus -->
      <SidebarMenu @click="onClick(collapse)" id="sidebar-menu">
          <template v-slot:menu-name>
            <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
            <i class="fas fa-users-cog"></i>
            <span v-if="!collapse" class="label-menu-sidebar">
              Usuário 
            <i class="fas fa-chevron-down"></i>
            </span>
          </template>
          <template v-slot:list-items>
            <SidebarMenu routerMenuPath="/grupoUsuario">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-users"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Grupo
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/usuario">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-user-alt"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Usuário
                </span>
              </template>
            </SidebarMenu>
          </template>
      </SidebarMenu>
        <!-- fim do bloco Configuração de Usuário, onde contem todos os cadastros -->

        <!-- <SidebarMenu routerMenuPath="/configuracao-email">
          <template v-slot:menu-name>
            
            <i class="fas fa-envelope"></i>
            <span v-if="!collapse" class="label-menu-sidebar">
              Email
            </span>
          </template>
        </SidebarMenu> -->

        <!-- Inicio do bloco Configuração de Estoque, onde contem todos os cadastros -->
        <!-- id é responsável por abrir menu de lado quando estiver colapsado, sendo assim sempre colocar o mesmo
             id para todos que utilizarem submenus -->
        <SidebarMenu @click="onClick(collapse)" id="sidebar-menu">
          <template v-slot:menu-name>
            <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
            <i class="fas fa-luggage-cart"></i>
            <span v-if="!collapse" class="label-menu-sidebar">
              Estoque
            <i class="fas fa-chevron-down"></i>
            </span>
          </template>
          <template v-slot:list-items>
            <SidebarMenu routerMenuPath="/grupoProduto">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Grupo de Produto
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/classe">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Classe
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/listaControlado">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Lista Controlado
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/dcb">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de DCB
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/dci">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de DCI
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/nbm">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de NBM
                </span>
              </template>
            </SidebarMenu>
            
            <SidebarMenu routerMenuPath="/laboratorio">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Laboratório
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/principioAtivo">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Princípio Ativo
                </span>
              </template>
            </SidebarMenu>
          </template>
        </SidebarMenu>
        <!-- fim do bloco Configuração de Estoque, onde contem todos os cadastros -->
		

        <!-- Inicio do bloco Configuração de Região, onde contem todos os cadastros -->
        <!-- id é responsável por abrir menu de lado quando estiver colapsado, sendo assim sempre colocar o mesmo
             id para todos que utilizarem submenus -->
        <SidebarMenu @click="onClick(collapse)" id="sidebar-menu">  
          <template v-slot:menu-name>
          
            <i class="fas fa-globe-americas"></i>
            <span v-if="!collapse" class="label-menu-sidebar">
              Região
            <i class="fas fa-chevron-down"></i>
            </span>
          </template>
          <template v-slot:list-items>
            <SidebarMenu routerMenuPath="/pais">
              <template v-slot:menu-name>
               
                <i class="fas fa-passport"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de País
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/estado">
              <template v-slot:menu-name>
               
                <i class="fas fa-flag"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Estado
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/cidade">
              <template v-slot:menu-name>
               
                <i class="fas fa-university"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Cidade
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/regiao">
              <template v-slot:menu-name>
               
                <i class="fas fa-university"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Região
                </span>
              </template>
            </SidebarMenu>
          </template>
        </SidebarMenu>
        
        <!-- fim do bloco Configuração de Região, onde contem todos os cadastros -->

        <SidebarMenu routerMenuPath="/pessoa">
          <template v-slot:menu-name>
            
            <i class="fas fa-user-edit"></i>
            <span v-if="!collapse" class="label-menu-sidebar">
              Pessoa
            </span>
          </template>
          
        </SidebarMenu>
        <SidebarMenu routerMenuPath="/tipoContato">
          <template v-slot:menu-name>
            
            <i class="fas fa-user-edit"></i>
            <span v-if="!collapse" class="label-menu-sidebar">
              Tipo Contato
            </span>
          </template>
          
        </SidebarMenu>

        <!-- Inicio do bloco Configuração de Parametros, onde contem todos os cadastros -->
        <!-- id é responsável por abrir menu de lado quando estiver colapsado, sendo assim sempre colocar o mesmo
             id para todos que utilizarem submenus -->
        <SidebarMenu @click="onClick(collapse)" id="sidebar-menu">
          <template v-slot:menu-name>
            <i class="fas fa-ellipsis-v"></i>
            <span v-if="!collapse" class="label-menu-sidebar">
              Parametros
            <i class="fas fa-chevron-down"></i>
            </span>
          </template> 
          <template v-slot:list-items>
            <SidebarMenu routerMenuPath="/tributo">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
               <i class="fas fa-calculator"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Tributo
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/ncm">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
               <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de NCM
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/dashboar">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
               <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  login
                </span>
              </template>
            </SidebarMenu>
            <SidebarMenu routerMenuPath="/unidadeMedida">
              <template v-slot:menu-name>
                <!-- Acessar ao site do font Awesome -> escolher o icone -> copiar o "<i>" e adicionar abaixo !-->
                <i class="fas fa-layer-group"></i>
                <span class="label-submenu-sidebar">
                  Cadastro de Unidade de Medida
                </span>
              </template>
            </SidebarMenu>
            
          </template> 
        </SidebarMenu> 
        
        
      </ul>
        <!-- fim do bloco Configuração de Parametros, onde contem todos os cadastros -->
    </div>
  </div>
</template>


<script>

import SidebarMenu from "./SidebarMenu";
export default {
  props: ["collapse"],
  components: {
    SidebarMenu
  },

  
  //sidebar--collapsed
  setup() {// setup(props) {
    var openSubMenu = false;
    //console.log("[Sidebar] Props:", props.collapse);
   
  function sizeOfThings(){
    var windowWidth = window.innerWidth;
      let menuSidebar =  document.getElementById('menuSidebar');
      let labelMenuSidebar = document.getElementsByClassName('label-menu-sidebar')
    if (windowWidth <= 740 ){
     menuSidebar.classList.add('sidebar--collapsed')
     labelMenuSidebar.classList.remove('display-sidebar-menu')
    }else{
       menuSidebar.classList.remove('sidebar--collapsed');
       //display-sidebar-menu
    }
  }
  window.addEventListener('resize', function() {
            sizeOfThings();
  });

    const sideBarCollapseClass = collapse => {
      if (collapse) return "sidebar--collapsed";
      return "";
    };

    const sideBarMenuCollapsedClass = collapse => {
      if (collapse) return "sidebar-menu--collapsed";
      return "";
    };

    const sideBarSeparatorClass = collapse => {
      if (collapse) return "sidebar-separator-collapsed";
      return "sidebar-separator";
    };

    const sidebarCollapsedMenu = collapse => {
      if (collapse) return "vertical-menu";
      return "";
    };

    const onClick = collapse => {
      openSubMenu = !openSubMenu;
      if (collapse) {
        if (!openSubMenu){

          document.getElementById("sidebar-menu").classList.remove("vertical-menu");
      
        }
        else{
          
          document
            .getElementById("sidebar-menu")
            .classList.add("vertical-menu");
        }
      }
    };

    return {
     sideBarCollapseClass,
      sideBarMenuCollapsedClass,
      sideBarSeparatorClass,
      sidebarCollapsedMenu,
      onClick,
      sizeOfThings
    };
  }
};
</script>

<style>
.label-menu-sidebar {
  font-size: 0.8rem;
  padding: 0.8rem;
}

.label-submenu-sidebar {
  font-size: 0.8rem;
  padding: 0.2rem;
}

.sidebar-separator-collapsed {
  padding: 0px 5px;
  letter-spacing: 0.05em;
  pointer-events: none;
  cursor: default;
  font-size: 10px;
  text-transform: uppercase;
  color: #7f8387;
  font-weight: 600;
}

.sidebar-menu--collapsed i {
  font-size: 1rem;
  margin-left: 0px;
}

.vertical-menu {
  width: 15rem;
  height: 9rem;
}

.vertical-menu a {
  background-color: #2a3042;
  color: #495057;
  display: block;
  padding: 12px;
}

.vertical-menu a:hover {
  background-color: #495057;
}

.vertical-menu a.active {
  background-color: #495057;
  color: #495057;
}

.sidebar-menu--collapsed a > span,
.sidebar-menu--collapsed li > span {
  opacity: 10;
  transition: opacity 0.1s;
}
.display-sidebar-menu{
  display: none;
}
</style>
