<template>
    <div>
        <span class="p-1">{{ name }}</span>
        <span class="p-1">{{ descricao }}</span>
    </div>
</template>

<script>
export default {
     props:{
        name:{ type: String, default: 'vazio' },
        descricao:{ type: String, default: 'vazio' },
      
    },
    
    setup() { 
       
        return{
           

        }
    }

    
}
</script>
<style scoped>
.mystyle { 
 border: solid ;
 border-radius: 5px;

}

</style>