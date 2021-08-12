<template>
  <div>
    <section id="sideBar" class="sideBar sideBar-active">
      <!-- <button @click="$emit('click', parametro)">teste</button> -->
      <a @click="sideBarSubNivelOpen('', 'activeDashboard')" href="#/dashboar">
        <div id="activeDashboard" class="active">
          <i class="fas fa-sliders-h"></i> {{ $i18n.translate("dashboard") }}
        </div>
      </a>
      <div
        id="activeUsuario"
        @click="sideBarSubNivelOpen('usuario', 'activeUsuario')"
      >
        <!-- @click="$emit('click', usuario)" -->
        <i class="fas fa-user"></i> {{ $i18n.translate("usuario") }}
      </div>
      <div
        id="activeEstoque"
        @click="sideBarSubNivelOpen('estoque', 'activeEstoque')"
      >
        <i class="fas fa-dolly-flatbed"></i>
        {{ $i18n.translate("Estoque") }}
      </div>
      <div
        id="activeRegiao"
        @click="sideBarSubNivelOpen('regiao', 'activeRegiao')"
      >
        <i class="fas fa-city"></i> {{ $i18n.translate("regiao") }}
      </div>
      <div
        id="activeParametros"
        @click="sideBarSubNivelOpen('parametros', 'activeParametros')"
      >
        <i class="fas fa-cubes"></i>
        {{ $i18n.translate("parametros") }}
      </div>
      <div
        id="activePessoa"
        @click="sideBarSubNivelOpen('pessoa', 'activePessoa')"
      >
        <i class="fas fa-user-alt"></i>
        {{ $i18n.translate("pessoa") }}
      </div>
      <!-- <a @click="sideBarSubNivelOpen('', 'activePessoa')" href="#/pessoa/1">
        <div id="activePessoa">
          <i class="fas fa-user-alt"></i>
          {{ $i18n.translate("pessoa") }}
        </div>
      </a> -->
      <a
        @click="sideBarSubNivelOpen('', 'activeTipoContato')"
        href="#/tipoContato/1"
      >
        <div id="activeTipoContato">
          <i class="fas fa-headset"></i> {{ $i18n.translate("contato") }}
        </div>
      </a>

      <div
        @click="sideBarSubNivelOpen('Financeiro', 'activeFinanceiro')"
        id="activeFinanceiro"
      >
        <i class="far fa-money-bill-alt"></i>
        {{ $i18n.translate("financeiro") }}
      </div>
      <div
        @click="sideBarSubNivelOpen('Producao', 'activeProducao')"
        id="activeProducao"
      >
        <i class="fab fa-product-hunt"></i>
        {{ $i18n.translate("Producao") }}
      </div>
      <div
        @click="sideBarSubNivelOpen('Venda', 'activeVenda')"
        id="activeVenda"
      >
        <i class="fas fa-shopping-cart"></i>
        {{ $i18n.translate("venda") }}
      </div>
    </section>

    <section id="sideBarSubNivel" class="sideBarSubNivel">
      <section>
        <div id="usuario" class="display-none">
          <div>
            <a class="sidebar-link" href="#/grupoUsuario/1">
              <i class="fas fa-arrow-right"></i>
              {{ $i18n.translate("cadastroGrupo") }}
            </a>
          </div>
          <div>
            <a class="sidebar-link" href="#/usuario/1">
              <i class="fas fa-arrow-right"></i>
              {{ $i18n.translate("cadastroUsuário") }}
            </a>
          </div>

          <div>
            <a class="sidebar-link" href="#/configuracaoEmail/1">
              <i class="fas fa-arrow-right"></i>
              {{ $i18n.translate("configuracaoEmail") }}
            </a>
          </div>
          <!-- <SidebarMenu @click="onClick(collapse)" id="sidebar-menu">
            <template v-slot:menu-name>
            
              <i class="fas fa-users-cog"></i>
              <span v-if="!collapse" class="label-menu-sidebar">
                Usuário {{ $i18n.translate("dashboard") }}
                <i class="fas fa-chevron-down"></i>
              </span>
            </template>
            <template v-slot:list-items>
              <SidebarMenu routerMenuPath="/grupoUsuario">
                <template v-slot:menu-name>
                  
                  <i class="fas fa-users"></i>
                  <span class="label-submenu-sidebar"> Cadastro de Grupo </span>
                </template>
              </SidebarMenu>
              <SidebarMenu routerMenuPath="/usuario">
                <template v-slot:menu-name>
                
                  <i class="fas fa-user-alt"></i>
                  <span class="label-submenu-sidebar">
                    Cadastro de Usuário
                  </span>
                </template>
              </SidebarMenu>
            </template>
          </SidebarMenu>
          <SidebarMenu @click="onClick(collapse)" id="sidebar-menu">
            <template v-slot:menu-name>
          
              <i class="fas fa-users-cog"></i>
              <span v-if="!collapse" class="label-menu-sidebar">
                Usuário
                <i class="fas fa-chevron-down"></i>
              </span>
            </template>
            <template v-slot:list-items>
              <SidebarMenu routerMenuPath="/grupoUsuario">
                <template v-slot:menu-name>
                 
                  <i class="fas fa-users"></i>
                  <span class="label-submenu-sidebar"> Cadastro de Grupo </span>
                </template>
              </SidebarMenu>
              <SidebarMenu routerMenuPath="/usuario">
                <template v-slot:menu-name>
                
                  <i class="fas fa-user-alt"></i>
                  <span class="label-submenu-sidebar">
                    Cadastro de Usuário
                  </span>
                </template>
              </SidebarMenu>
            </template>
          </SidebarMenu> -->
        </div>
        <div id="estoque" class="display-none">
          <div>{{ $i18n.translate("estoque") }}</div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/grupoProduto/1">
              {{ $i18n.translate("cadastroGrupoProduto") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/classe/1">
              {{ $i18n.translate("cadastroClasse") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/listaControlado/1">
              {{ $i18n.translate("cadastroListaControlado") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/dcb/1">
              {{ $i18n.translate("cadastroDCB") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/dci/1">
              {{ $i18n.translate("cadastroDCI") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/nbm/1">
              {{ $i18n.translate("cadastroNBM") }}
            </a>
          </div>

          <div class="sidebar-item">
            <a class="sidebar-link" href="#/laboratorio/1">
              {{ $i18n.translate("cadastroLaboratorio") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/principioAtivo/1">
              {{ $i18n.translate("cadastroPrinckipioAtivo") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/siproquim/1">
              {{ $i18n.translate("siproquim") }}
            </a>
          </div>
        </div>
        <div id="regiao" class="display-none">
          <div>{{ $i18n.translate("regiao") }}</div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/pais/1">
              {{ $i18n.translate("cadastroPais") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/estado/1">
              {{ $i18n.translate("cadastroEstado") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/cidade/1">
              {{ $i18n.translate("cadastroCidade") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/bairro/1">
              {{ $i18n.translate("bairro") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/regiao/1">
              {{ $i18n.translate("cadastroRegiao") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/testeTabela/1">
              {{ $i18n.translate("Teste de tabela") }}
            </a>
          </div>
        </div>
        <div id="pessoa" class="display-none">
          <div>{{ $i18n.translate("pessoa") }}</div>
          <!--
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/pessoa/1">
              {{ $i18n.translate("pessoa") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/endereco/1">
              {{ $i18n.translate("endereco") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/pessoa/1">
              {{ $i18n.translate("contato") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/pessoa/1">
              {{ $i18n.translate("dadosBancarios") }}
            </a>
          </div>
          criar componente de cadastro de endereço 
          contato dados bancarios
          -->
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/pessoa/1">
              {{ $i18n.translate("fornecedor") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/funcionario/1">
              {{ $i18n.translate("funcionario") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/visitador/1">
              {{ $i18n.translate("visitador") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/convenio/1">
              {{ $i18n.translate("convenio") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/prescritor/1">
              {{ $i18n.translate("prescritor") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/funcao/1">
              {{ $i18n.translate("funcao") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/cargo/1">
              {{ $i18n.translate("cargo") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/departamento/1">
              {{ $i18n.translate("departamento") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/cliente/1">
              {{ $i18n.translate("cliente") }}
            </a>
          </div>
          <br><br><br>
         
          <!--
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/pessoa/1">
              {{ $i18n.translate("convenioGrupo") }}
            </a>
          </div>
          -->
        </div>
        <div id="parametros" class="display-none">
          <div>{{ $i18n.translate("parametros") }}</div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/tributo/1">
              {{ $i18n.translate("cadastroTributo") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/ncm/1">
              {{ $i18n.translate("cadastroNCM") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/planocontas">
              {{ $i18n.translate("planoContas") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/unidadeMedida/1">
              {{ $i18n.translate("unidadeMedida") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/pbm/1">
              {{ $i18n.translate("pbm") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/Moeda/1">
              {{ $i18n.translate("moeda") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/cotacao/1">
              {{ $i18n.translate("cotacao") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/ensaio/1">
              {{ $i18n.translate("ensaio") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/naturezaOperacao/1">
              {{ $i18n.translate("naturesaOperacao") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/portador/1">
              {{ $i18n.translate("portador") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/contabilista/1">
              {{ $i18n.translate("contabilista") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/posAdiquirinte/1">
              {{ $i18n.translate("posAdiquirinte") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/farmacopeia/1">
              {{ $i18n.translate("farmacopeia") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/adimistradorCartao/1">
              {{ $i18n.translate("adimistradorCartao") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/especie/1">
              {{ $i18n.translate("especie") }}
            </a>
          </div>
          <br><br><br><br><br>
        </div>
        <div id="Financeiro" class="display-none">
          <div>{{ $i18n.translate("financeiro") }}</div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/banco/1">
              {{ $i18n.translate("banco") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/formaPagamento/1">
              {{ $i18n.translate("cadastroFormaPagamento") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/transacao/1">
              {{ $i18n.translate("transacao") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/portador/1">
              {{ $i18n.translate("portador") }}
            </a>
          </div>
        </div>
        <div id="Producao" class="display-none">
          <div>{{ $i18n.translate("producao") }}</div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/capsula/1">
              {{ $i18n.translate("especificacaoCapsula") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/bula/1">
              {{ $i18n.translate("bula") }}
            </a>
          </div>
        </div>
        <div id="Venda" class="display-none">
          <div>{{ $i18n.translate("venda") }}</div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/especialidade/1">
              {{ $i18n.translate("especialidade") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/MensagemPadrao/1">
              {{ $i18n.translate("mensagemPadrao") }}
            </a>
          </div>
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/fidelidade/1">
              {{ $i18n.translate("fidelidade") }}
            </a>
          </div>
        
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/metodo/1">
              {{ $i18n.translate("metodo") }}
            </a>
          </div>
         
          <div class="sidebar-item">
            <a class="sidebar-link" href="#/floral/1">
              {{ $i18n.translate("floral") }}
            </a>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  setup() {
    // captuar a pagina para ativar o menu

    localStorage.setItem("EstadoMenu", "Fechando");
    const sideBarSubNivelOpen = (a, b) => {
      hideAllSideBarItens();
      clearAllActive();

      let divActive = document.getElementById(b);
      divActive.classList.add("active");

      let sideBarSubNivel = document.getElementById("sideBarSubNivel");
      let sideBar = document.getElementById("sideBar");
      console.log(a);

      if (a) {
        let itemId = document.getElementById(a);
        itemId.classList.remove("display-none");
        localStorage.setItem("EstadoMenu", "Abrindo");

        if (
          !document
            .querySelector(".sideBarSubNivel")
            .classList.contains("sideBarSubNivel-active") &&
          !document
            .querySelector(".sideBar")
            .classList.contains("sideBar-active")
        ) {
          sideBar.classList.add("sideBar-active");
          sideBarSubNivel.classList.add("sideBarSubNivel-active");
          localStorage.setItem("EstadoMenu", "Abrindo");
        } else if (
          !document
            .querySelector(".sideBarSubNivel")
            .classList.contains("sideBarSubNivel-active")
        ) {
          sideBarSubNivel.classList.add("sideBarSubNivel-active");
          localStorage.setItem("EstadoMenu", "Abrindo");
        }
      } else {
        sideBar.classList.add("sideBar-active");
        sideBarSubNivel.classList.remove("sideBarSubNivel-active");
        localStorage.setItem("EstadoMenu", "Fechando");
      }
    };
    function hideAllSideBarItens() {
      let usuario = document.getElementById("usuario");
      let estoque = document.getElementById("estoque");
      let regiao = document.getElementById("regiao");
      let parametros = document.getElementById("parametros");
      let financeiro = document.getElementById("Financeiro");
      let producao = document.getElementById("Producao");
      let venda = document.getElementById("Venda");
      let pessoa = document.getElementById("pessoa");
      usuario.classList.add("display-none");
      estoque.classList.add("display-none");
      regiao.classList.add("display-none");
      parametros.classList.add("display-none");
      financeiro.classList.add("display-none");
      producao.classList.add("display-none");
      venda.classList.add("display-none");
      pessoa.classList.add("display-none");
    }
    function clearAllActive() {
      let activeDashboard = document.getElementById("activeDashboard");
      let activeUsuario = document.getElementById("activeUsuario");
      let activeEstoque = document.getElementById("activeEstoque");
      let activeRegiao = document.getElementById("activeRegiao");
      let activeParametros = document.getElementById("activeParametros");
      let activePessoa = document.getElementById("activePessoa");
      let activeTipoContato = document.getElementById("activeTipoContato");
      let activeFinanceiro = document.getElementById("activeFinanceiro");
      let activeProducao = document.getElementById("activeProducao");
      let activeVenda = document.getElementById("activeVenda");

      activeDashboard.classList.remove("active");
      activeUsuario.classList.remove("active");
      activeEstoque.classList.remove("active");
      activeRegiao.classList.remove("active");
      activeParametros.classList.remove("active");
      activePessoa.classList.remove("active");
      activeTipoContato.classList.remove("active");
      activeFinanceiro.classList.remove("active");
      activeProducao.classList.remove("active");
      activeVenda.classList.remove("active");
    }
    return {
      sideBarSubNivelOpen,
      hideAllSideBarItens,
      clearAllActive,
    };
  },
  data() {
    return {
      usuario: ["usuario", "activeUsuario"],
    };
  },
};
</script>

