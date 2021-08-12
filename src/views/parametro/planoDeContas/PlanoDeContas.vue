<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-content-end">
      <a
        v-if="true"
        class="m-1 btn btn-sm btn-primary"
        href="/#/planocontas/cadastro"
      >
        {{ $i18n.translate("adicionar") }} {{ $i18n.translate("planoContas") }}
      </a>
    </div>
    <div class="card shadow">
      <div class="card-header">
        {{ $i18n.translate("planoContas") }}
      </div>
      <div class="card-body">
        <!-- <Suspense>
                <template #default> -->
        <div v-if="items != undefined">
          <!--<colapser v-for="itens in items" :key="itens.id" v-bind:id="itens.hierarquia" v-bind:descricao="itens.descricao" v-bind:array="json"  ></colapser> -->
          <div class="cont-plano-contas">
            <vue3-router-tree :items="items">
              <template #item="{ item }" >
                <div
                  v-bind:id="item.itenId"
                  class="removedorDeClass"
                  @click="selectItem(item)"
                >
                  <span class="p-1">{{ item.name }}</span>
                  <span class="p-1">{{ item.descricao }}</span>

                  <!--  <itemSelecionado v-bind:name="item.name" v-bind:descricao="item.descricao"></itemSelecionado> -->
                </div>
              </template>
            </vue3-router-tree>
          </div>
          <div class="d-flex justify-content-start">
            <a v-if="true" @click="excluir" class="m-1 btn btn-sm btn-danger">
              {{ $i18n.translate("deletar") }}
            </a>
            <a
              v-if="true"
              class="m-1 btn btn-sm btn-warning"
              href="/#/planocontas/editar"
            >
              {{ $i18n.translate("editar") }}
            </a>
          </div>
        </div>
        <!-- <button @click="showAlert">Hello world</button>
                      <button @click="teste">teste</button> -->
        <!-- </template>
                <template #fallback>
                     caregando...
                </template>
            </Suspense> -->
      </div>
    </div>
  </div>
</template>

<script>
import servicoPlanodeContas from "../../../services/parametro/planoDeconta";
import { ref, onMounted } from "vue";
import Vue3RouterTree from "vue3-router-tree";
/* import itemSelecionado from "../../components/planoContas/itemSelecionado"; */
import Swal from "sweetalert2";
import traducaoAlertas from "../../../plugins/i18n/alertas";
//import router from "@/router";

export default {
  components: { Vue3RouterTree /* itemSelecionado */ },
  setup() {
    let obj = null;
    let children = null;
    let contaId = null;
    let descricao = null;
    //  var testes = null;
    let items = ref(null);
    const selectItem = a => {
      obj = a;
      contaId = obj.itenId;
      children = obj.children;
      descricao = obj.descricao;
      //remove as class red de todos os itens não estão selecionados

      let allDivs = document.getElementsByClassName("removedorDeClass");
      let arr = Array.prototype.slice.call(allDivs);
      limparClass(arr);

      let div = document.getElementById(contaId);
      div.classList.add("red");
    };
    function logArrayElements(element) {
      let div = element;
      div.classList.remove("red");
    }
    function limparClass(a) {
      let arr = a;
      arr.forEach(logArrayElements);
    }
    const lang = () => {
      let langDefault = localStorage.getItem("idioma") || "br";
      let langTrad = traducaoAlertas.br;
      if (langDefault != "br") {
        langTrad = traducaoAlertas.es;
      }
      return langTrad;
    };
    const excluir = () => {
      let lengBrEs = lang();
      if (obj == null) {
        Swal.fire({
          title: `${lengBrEs.selecioneItemExclusao}`,
          text: `${lengBrEs.selecioneCampoExclusao}`,
          icon: "info",
        });
      } else if (children) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${lengBrEs.posuiSubCOntas}`,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: `${lengBrEs.desejaExcluir}`,
          text: `"${descricao}" ?`,
          showCancelButton: true,
          // confirmButtonText: `Save`,
        }).then(result => {
          if (result.isConfirmed) {
            servicoPlanodeContas.remove(contaId).then(response => {
              if (response.status == 200) {
                let divIdExcluir = document.getElementById(contaId);
                divIdExcluir.innerHTML = "";
                Swal.fire({
                  title: `${lengBrEs.oItem} "${descricao}" ${lengBrEs.foiExcluido}!`,
                  icon: "success",
                  //confirmButtonText: `canselar`,
                });
                //PRECISSA ATIALIZAR O OBJ DE CONSULTA DO PLANO DE CONTAS
                /*  
                             items = servicoPlanodeContas.getGrid(); 
                              console.log(items) 
                              assim atualiza mas n é o msm que o vue3-router-tree consulta para montar o tree view
                              */
              } else {
                Swal.fire({
                  title: `${lengBrEs.oItem} "${descricao}" ${lengBrEs.naoFoiExcluido}`,
                  icon: "warning",
                  //confirmButtonText: `Fechar`,
                });
              }
            });
          }
        });
      }
    };
    /*
        function atualizaItensPlanoContas (){
             console.log(items)
            testes = servicoPlanodeContas.getGrid()
            testes.then(function(v) {
                console.log(v);
            });
            items.value = testes
          
            console.log(items)
};  
 */
    onMounted(async () => {
      const buscarPlanoDeContas = async () => {
        try {
          var resp = await servicoPlanodeContas.getGrid();
          console.log(resp);

          return resp;
        } catch (err) {
          console.error("Erro ao buscar plano de conta!", err);
        }
      };

      items.value = await buscarPlanoDeContas();
    });
    return {
      items,
      selectItem,
      excluir,
      logArrayElements,
      limparClass,
    };
  },
};
</script>

<style lang="scss">
.vrt-tree {
  list-style: none;
  padding: 12px;
  max-width: 100%;
}
.red {
  color: red;
}
a {
  color: black;
  list-style: none;
}
</style>

