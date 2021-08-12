<template>
  <div class="conteiner-login">
     <div class="login100-form validate-form">
        <div class="wrap-input100 validate-input m-t-15 m-b-35" data-validate="Digite seu E-mail">
          <input @click="animationRecuperaSenha" class="input100" id="emailNovaSenha" >
          <span id="spanNovaSenha" class="focus-input2 focus-input2-boreder" data-placeholder="Usuário"></span>
        </div>
        <br>
        <div class="container-login100-form-btn">
           <input type="button" @click="novaSenha" class="login100-form-btn" value="recuperar senha">
        </div>
        <ul class="login-more m-t-20">
          <li>
            <span class="txt1">
               Não tem uma conta?
						</span>
            <a href="https://www.prismafive.com.br/" class="txt2">
							Solicite 
						</a>
          </li>
          <li>
            <a href="/" class="txt2">
							Voltar
						</a>
          </li>
      </ul>
      <div id="fetchResultEmailNovaSenha"></div>
    </div> 
 </div> 
</template>
<script>

export default{
    setup() {

        const animationRecuperaSenha = () => {
        let spaNewpassword = ''
        spaNewpassword = document.getElementById('spanNovaSenha');
        let span = document.getElementById('spanNovaSenha');
        document.addEventListener("click", function(){
           
           
           
           if(spaNewpassword){
             span.classList.add('focus-input2-boreder-hover');
              span.classList.remove('focus-input2-boreder');
                
              span.classList.remove('focus-input2');
              span.classList.add('focus-input-animate');
             spaNewpassword = '';
           }
           else{
            let input = document.getElementById('emailNovaSenha').value;
            if (!input){
               span.classList.remove('focus-input2-boreder-hover');
               span.classList.add('focus-input2-boreder');
                 
               span.classList.add('focus-input2');
               span.classList.remove('focus-input-animate');

             }
            
           }

         });
      }
        const novaSenha = () => {
           console.log("nova Senha solicitada");
           let email = document.getElementById('emailNovaSenha').value;
           console.log(email)
           let fetchResultEmailNovaSenha = document.getElementById("fetchResultEmailNovaSenha");           
           if (email){                         
            var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (!filter.test(document.getElementById("emailNovaSenha").value)) {
                fetchResultEmailNovaSenha.innerText = 'Por favor, digite o email corretamente';                   
                return false
            } else {                    
              const props = {
                  method: "post",
                  headers: {
                      "content-type": "application/json"
              }
            };
            fetch("https://localhost:5001/recuperar-senha/solicitar/" + email, props)
            .then(function(response) {
                response.text().then(function(responseText) {
                fetchResultEmailNovaSenha.innerText = responseText + email;
                });
            });
            return false
          }
          }else{
           fetchResultEmailNovaSenha.innerText = "Preencha o campo e-mail";
          }               
        };
         return {
      novaSenha,
      animationRecuperaSenha
    };
  }
}
</script>
