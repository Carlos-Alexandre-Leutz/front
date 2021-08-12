<template>
    <div>
        Remover
        <form @submit="validarForm">
            <div v-if="items != undefined">   
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label>Item pai</label>
                        <select  id="idPai" class="form-select">
                            <option value="">Selecione o campo pai</option>
                            <option v-for="itens in items" :key="itens.id"  v-bind:value="itens.contaId">{{itens.hierarquia}} {{itens.descricao}}</option>
                        </select>
                        </div>
                    </div>
                </div>
                <!--  <Multiselect v-model="viewModel.idPais" placeholder="Selecione o item" :options="optionsPais" required/> -->
            </div>
            <div class="d-flex mt-3 ml-1">
                <button class="btn btn-success mr-2" type="submit">Excluir</button>
                <button class="btn btn-secondary" type="reset" @click="$router.push('/planocontas')">
                  Voltar
                </button>
          </div>
        </form>
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import servicoPlanodeContas  from "../../../services/parametro/planoDeconta";
//import Multiselect from "@vueform/multiselect";
export default {
//components: { Multiselect },
  
  setup() {
  var items = ref(null); 
    const validarForm = e => {
        let idPai = document.getElementById('idPai').value;
        e.preventDefault();
        servicoPlanodeContas.remove(idPai);  
    };
    onMounted(async () =>{
      const obterSelectPlanoConta = async() => {
          try {
              var resp = await servicoPlanodeContas.obterSelectPlanoConta();
              console.log(resp)                                   
              return resp;
          } catch (err) {
          console.error("Erro ao buscar id item pai!", err);
          }
      };
      items.value = await obterSelectPlanoConta();    
    });
    return {
        items, 
        validarForm
    }
  }
};
</script>