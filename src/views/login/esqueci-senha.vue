<template>
    <div class="conteiner-login">
        <div class=" validate-form">
            <div style=" display: flex; justify-content: center;">
                <img style="width: 100%; max-width: 250px; object-fit: cover;" src="/Preto_amarelo.png" alt="">
            </div>
            <div class="wrap-input100 validate-input mt-5 mb-5">
                <input @click="inputAnomation('spanNovaSenha')" id="novaSenha" class="input100" type="password">
                <span id="spanNovaSenha" class="focus-input2 focus-input2-boreder" data-placeholder="Nova senha"></span>
            </div>
            <div class="wrap-input100 validate-input mb-5">
                <input @click="inputAnomation('spanConfirmaNovaSenha')" id="ConfirmeNovaSenha" type="password" class="input100" name="Senha">
                <span id="spanConfirmaNovaSenha" class="focus-input2 focus-input2-boreder" data-placeholder="Confirme a Senha"></span>
            </div>
            <div class="d-flex bd-highlight mb-3">
                <div class="ml-auto p-2 bd-highlight">
                          <button @click="mostarSenha" class="m-b-50 RememberMe" type="button" id="senha">Mostrar senha</button>
                    </div>
                </div>
                    <div class="container-login100-form-btn">
                    <input @click="EnviarNovaSenha" class="login100-form-btn" type="button" value="Alterar">

                </div>
                <ul class="login-more mt-2">
                    <li class="m-b-8">
                        <span class="txt1">
                            <a href="/" class="txt2">
                            Voltar  agora
                        </a>
                    </span>                            
                    </li>
                </ul>
        </div>
    </div>
</template>
<script>
import router from "@/router";
import { useRoute } from "vue-router";
export default {
    
    setup() {
     var urlBase = "https://hapi-farmafacil.prismafive.com.br/";
     if (process.env.NODE_ENV === "development") {
          urlBase = "https://localhost:5001/";
      }
    //add focus-input2-boreder-hover focus-input-animate
    //remove focus-input2 focus-input2-boreder
    //focus-input-animate tem que remover o focus-input100 
const mostarSenha = () =>{
   let inputTypePass = document.getElementById('novaSenha');
   let inputConfirmTypePass = document.getElementById('ConfirmeNovaSenha');
   let btnSenha = document.getElementById('senha');
   if(inputTypePass.type === "password" ){

       inputTypePass.type = "text";
       inputConfirmTypePass.type = "text";
       btnSenha.innerHTML = "Esconder Senha";
    }
   else{
       inputTypePass.type = "password";
       inputConfirmTypePass.type  = "password";
       btnSenha.innerHTML = "Mostrar Senha";

        
    } 


};
const inputAnomation = (b) =>{
  let span = '';
  span = document.getElementById(b);
  console.log(span)
  document.addEventListener("click", function(){
        if (span){
                span.classList.remove('focus-input2-boreder');
                span.classList.add('focus-input2-boreder-hover');
                span.classList.remove('focus-input2');
                span.classList.add('focus-input-animate');
                span = '';
            }else{
                let email = document.getElementById('novaSenha').value;
                let inputSenha = document.getElementById('ConfirmeNovaSenha').value;

                let spanemail = document.getElementById('spanNovaSenha');
                let spansenha = document.getElementById('spanConfirmaNovaSenha');
            if(email && inputSenha){
                    spanemail.classList.remove('focus-input2-boreder');
                    spanemail.classList.add('focus-input2-boreder-hover');
                    spanemail.classList.remove('focus-input2');
                    spanemail.classList.add('focus-input-animate');

                    spansenha.classList.remove('focus-input2-boreder');
                    spansenha.classList.add('focus-input2-boreder-hover');
                    spansenha.classList.remove('focus-input2');
                    spansenha.classList.add('focus-input-animate'); 
            }else if (email){
                    spanemail.classList.remove('focus-input2-boreder');
                    spanemail.classList.add('focus-input2-boreder-hover');
                    spanemail.classList.remove('focus-input2');
                    spanemail.classList.add('focus-input-animate');
                    //remover senha
                    spansenha.classList.add('focus-input2-boreder');
                    spansenha.classList.remove('focus-input2-boreder-hover');
                    spansenha.classList.add('focus-input2');
                    spansenha.classList.remove('focus-input-animate');
            }else if (inputSenha){
                    spansenha.classList.remove('focus-input2-boreder');
                    spansenha.classList.add('focus-input2-boreder-hover');
                    spansenha.classList.remove('focus-input2');
                    spansenha.classList.add('focus-input-animate');
                    //remover email
                    spanemail.classList.add('focus-input2-boreder');
                    spanemail.classList.remove('focus-input2-boreder-hover');
                    spanemail.classList.add('focus-input2');
                    spanemail.classList.remove('focus-input-animate');
            }else if (!email && !inputSenha){
                    spanemail.classList.add('focus-input2-boreder');
                    spanemail.classList.remove('focus-input2-boreder-hover');
                    spanemail.classList.add('focus-input2');
                    spanemail.classList.remove('focus-input-animate');
                    spansenha.classList.add('focus-input2-boreder');
                    spansenha.classList.remove('focus-input2-boreder-hover');
                    spansenha.classList.add('focus-input2');
                    spansenha.classList.remove('focus-input-animate');
            }else if (!email){
                    spanemail.classList.add('focus-input2-boreder');
                    spanemail.classList.remove('focus-input2-boreder-hover');
                    spanemail.classList.add('focus-input2');
                    spanemail.classList.remove('focus-input-animate');

            }else if (!inputSenha){
                    spansenha.classList.add('focus-input2-boreder');
                    spansenha.classList.remove('focus-input2-boreder-hover');
                    spansenha.classList.add('focus-input2');
                    spansenha.classList.remove('focus-input-animate'); 
            }                
        }
    })
};  

        const {
            params: { id }
        } = useRoute();
        const EnviarNovaSenha = () => {
            let NovaSenha = document.getElementById('novaSenha').value;
            let ConfirmeNovaSenha = document.getElementById('ConfirmeNovaSenha').value;
            if (NovaSenha && ConfirmeNovaSenha){
                let json = {
                    id: id,
                    senha: NovaSenha
                };
            const props = {
                method: "post",
                body: JSON.stringify(json),
                headers: {
                    "content-type": "application/json"
                }
            };
            if (NovaSenha == ConfirmeNovaSenha){       
                let url = urlBase + "recuperar-senha/trocar-senha"
                fetch(url , props)
                   .then(function (response){
                       console.log(response.status)
                       response.text().then(function(responseText){
                            alert(responseText);
                            if (response.status == 200) {
                                router.push({ name: "Login" })
                            }                      
                        });
                      });  
            }else{
                alert('As senhas não coincidem')
            }
            }else{
                alert('Preencha os campos')
            }       
        }     
        return{
            EnviarNovaSenha,
           inputAnomation,
           mostarSenha
        }
    }
}

</script>
