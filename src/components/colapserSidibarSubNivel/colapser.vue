<template>
        <button @click.stop.prevent="toggle">
             <i class="fas fa-sort-down"></i> {{ selectPai }}
        </button>
        <div v-show="isOpen"  >
             {{array}}      
        </div>     
</template>

<script>
export default {
    props:{       
       
        selectPai:{ type: String, default: 'vazio' },
        array:{type: String, default: 'vazio' }
    },    
    data(){
        return{
            isOpen: false,            
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
