<template>
    <div class="container">
        <button @click.stop.prevent="toggle">
             <i class="fas fa-sort-down"></i> {{id + " - " + descricao}}
        </button>
        <div v-show="isOpen">
            <colapserFilho v-for="itens in array" :key="itens.id" v-bind:array="array"  ></colapserFilho>
        </div>  
    </div>    
</template>
<script scoped>
import colapserFilho from "../../components/colapserPlanoDeConta/colapserFilho"
export default {
    components: { colapserFilho,},
    name: 'App',
    props:{
        id:{ type: String, default: 'vazio' },
        descricao:{ type: String, default: 'vazio' },
        array:{type: String, default: 'vazio' }
    },
    data(){
        return{
            isOpen: false, 
            dataModel: [
                {id: "numberOrString", label: "Root Node", children: [
                {id: 1, label: "Child Node"},
                {id: "node2", label: "Second Child"}]
            }]           
        }
    },
    methods:{
        toggle(){
            this.isOpen = !this.isOpen
        }            
    },
     setup() { 
        function mainNavToggle(a) {
            var mainNav = document.getElementById(a);
            mainNav.classList.toggle('collapsed');
        }
        return{
             mainNavToggle
        }
     }    
}
</script>
