<template><form @submit="validarForm">
  <div v-if="items != undefined">   
    <div class="card shadow">
          <div class="card-header">            
            <strong class="align-self-center">
              Cadastro Grupo de Usuário
            </strong>       
          </div>
         <div class="card-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <small>Campos com * são de preenchimento obrigatório</small>
                  </div>
                </div>
              </div>
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                          <label>Campo para edição</label>
                        <select  id="itenId" class="form-select" required>
                          <option value="">Selecione</option>
                          <option v-for="itens in items" :key="itens.id"  v-bind:value="itens.itenId">{{itens.hierarquia}} {{itens.descricao}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div class="form-group">
                        <label>* Descrição</label>
                        <input id="descricao" class="form-control" type="nome" placeholder="Digite a Descrição" required/>
                      </div>
                    </div>
                  </div>
            </div>     
          </div>
          <div class="d-flex mt-3 ml-1">
            <button class="btn btn-success mr-2" type="submit">Salvar</button>
            <button class="btn btn-secondary" type="reset" @click="$router.push('/planocontas')">
              Voltar
            </button>
          </div>
   </div>
</form>
</template>
<script>
import servicoPlanodeContas  from "../../../services/parametro/planoDeconta";
import { ref, onMounted } from "vue";
import Swal from 'sweetalert2';
var items = ref(null); 
export default {
    setup() {   
        const validarForm = e => {
            let  itenId = document.getElementById('itenId').value;
            let descricao = document.getElementById('descricao').value;
            console.log(itenId) 
            var json = {
                conta : "",
                descricao: descricao,
                id : itenId,
            };
        e.preventDefault();
            servicoPlanodeContas.edit(json).then(response => {
                if(response.status == 200){
                    Swal.fire({
                            icon: 'success',
                            title: 'Concluído',
                            text: `O item "${descricao}" foi editado`,
                    })
                }else{
                    Swal.fire({
                            icon: 'warning',
                            title: 'Erro',
                            text: `O item "${descricao}" não pode ser editado`,
                    })
                }
            });  
        };
        onMounted(async () =>{
            const buscarPlanoDeContas = async() => {
                try {
                    var resp = await servicoPlanodeContas.getGrid();                 
                    console.log(resp)                                    
                    return resp;
                } catch (err) {
                console.error("Erro ao buscar plano de conta!", err);
                }
            };
            items.value = await buscarPlanoDeContas();  
        });
        return {
            items,
            validarForm           
        }
    }      
}
</script>