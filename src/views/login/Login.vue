<template>
  <div>
    <!-- <select id="select" @change="newLanguage">
      <option>Selecione</option>
      <option value="br">Português</option>
      <option value="es">Espanhol</option>
    </select> -->
    <!-- <button @click="switchLanguage">Switch language</button> -->
    <div class="conteiner-login">
      <div style="display: flex; justify-content: center">
        <img
          style="width: 100%; max-width: 250px; object-fit: cover"
          src="/Preto_amarelo.png"
          alt=""
        />
      </div>
    </div>
    <div v-show="!showRecoverPassword" class="conteiner-login">
      <div class="login100-form validate-form">
        <!--  <div class="wrap-input100 validate-input m-t-15 m-b-35 cor1" data-validate="Digite seu E-mail">
                        <input class="input100 " id="email" type="email">
                        <span class="focus-input100" data-placeholder="Usuário"></span>
                    </div>
                    <div class="wrap-input100 validate-input m-b-50 " data-validate="Digite a senha">
                        <input  id="password" class="input100" type="password">
                    <span class="focus-input100" data-placeholder="Senha"></span>
                    </div> -->
                   
        <div class="wrap-input100 mt-5 mb-5">
          <input
            @click="inputAnomation('spanEmail')"
            id="imputEmal"
            type="text"
            class="input100"
          />
          <span
            id="spanEmail"
            class="focus-input2 focus-input2-boreder"
            data-placeholder="Email"
          ></span>
        </div>
        <div class="wrap-input100 mt-5 mb-5">
          <input
            @click="inputAnomation('spanSenha')"
            id="inputSenha"
            type="password"
            class="input100"
          />
          <span
            id="spanSenha"
            class="focus-input2 focus-input2-boreder"
            data-placeholder="Senha"
          ></span>
        </div>
        <div class="d-flex bd-highlight mb-3">
          <div class="ml-auto p-2 bd-highlight">
            <button
              @click="mostarSenha"
              class="m-b-50 RememberMe"
              type="button"
              id="senha"
            >
              Mostrar senha
            </button>
          </div>
        </div>
        <div class="container-login100-form-btn">
          <button @click="logar" class="login100-form-btn" type="button">
            {{ $i18n.translate("Entrar") }}
          </button>
        </div>
        <ul class="login-more m-t-20">
          <li class="m-b-8">
            <span class="txt1"> Esqueceu </span>
            <button
              class="btn btn-outline"
              type="button"
              @click="recoverPassword"
            >
              Esqueceu a senha?
            </button>
            <!--<a href="./recuperarSenha.html" class="txt2">
                                Usuário / senha?
              							</a> -->
          </li>
          <li>
            <span class="txt1"> Não tem uma conta? </span>
            <a
              target="blanck"
              href="https://www.prismafive.com.br/"
              class="txt2"
            >
              Solicite
            </a>
          </li>
          
        </ul>
        <div>
           <selectGlobalizacao></selectGlobalizacao>
        </div>
        <div style="color: red" id="fetchResult"></div>
      </div>
    </div>

    <LostPassword
      v-if="showRecoverPassword"
      @return-to-login="recoverPassword"
    ></LostPassword>
    <div class="conteiner-login">Desenvolvido por PrismaFive © 2020</div>
  </div>
</template>
<script>
console.log(window.location.origin);
import router from "@/router";
import { ref } from "vue";
import LostPassword from "../../components/login/LostPassword";
import servicoLogin from "../../services/login/login";
import { useI18n } from "../../../src/plugins/i18n/i18nPlugin";
import selectGlobalizacao from "../../components/globalizacao/selectGlobalização";


export default {
  components: { LostPassword, selectGlobalizacao },
  setup() {
    const i18n = useI18n();
    const switchLanguage = () => {
      const locale = i18n.locale.value === "br" ? "es" : "br";
      i18n.locale.value = locale;
    };

    const newLanguage = () => {
      var e = document.getElementById("select");
      var lang = e.options[e.selectedIndex].value;
      localStorage.setItem("idioma", lang);
      document.location.reload(true);
    };
    let landDefault = localStorage.getItem("idioma") || "br";
    if (landDefault == "br") {
      langPt();
    } else if (landDefault == "es") {
      langEs();
    }
    function langPt() {
      //this.$t("br")
      // this.$router.push("br")
    }
    function langEs() {}
    const mostarSenha = () => {
      let inputTypePass = document.getElementById("inputSenha");
      let btnSenha = document.getElementById("senha");
      if (inputTypePass.type === "password") {
        inputTypePass.type = "text";
        btnSenha.innerHTML = "Esconder Senha";
      } else {
        inputTypePass.type = "password";
        btnSenha.innerHTML = "Mostrar Senha";
      }
    };
    const inputAnomation = b => {
      let span = "";
      span = document.getElementById(b);
      console.log(span);
      document.addEventListener("click", function () {
        if (span) {
          span.classList.remove("focus-input2-boreder");
          span.classList.add("focus-input2-boreder-hover");
          span.classList.remove("focus-input2");
          span.classList.add("focus-input-animate");
          span = "";
        } else {
          let email = document.getElementById("imputEmal").value;
          let inputSenha = document.getElementById("inputSenha").value;
          let spanemail = document.getElementById("spanEmail");
          let spansenha = document.getElementById("spanSenha");
          if (email && inputSenha) {
            spanemail.classList.remove("focus-input2-boreder");
            spanemail.classList.add("focus-input2-boreder-hover");
            spanemail.classList.remove("focus-input2");
            spanemail.classList.add("focus-input-animate");

            spansenha.classList.remove("focus-input2-boreder");
            spansenha.classList.add("focus-input2-boreder-hover");
            spansenha.classList.remove("focus-input2");
            spansenha.classList.add("focus-input-animate");
          } else if (email) {
            spanemail.classList.remove("focus-input2-boreder");
            spanemail.classList.add("focus-input2-boreder-hover");
            spanemail.classList.remove("focus-input2");
            spanemail.classList.add("focus-input-animate");
            //remover senha
            spansenha.classList.add("focus-input2-boreder");
            spansenha.classList.remove("focus-input2-boreder-hover");
            spansenha.classList.add("focus-input2");
            spansenha.classList.remove("focus-input-animate");
          } else if (inputSenha) {
            spansenha.classList.remove("focus-input2-boreder");
            spansenha.classList.add("focus-input2-boreder-hover");
            spansenha.classList.remove("focus-input2");
            spansenha.classList.add("focus-input-animate");
            //remover email
            spanemail.classList.add("focus-input2-boreder");
            spanemail.classList.remove("focus-input2-boreder-hover");
            spanemail.classList.add("focus-input2");
            spanemail.classList.remove("focus-input-animate");
          } else if (!email && !inputSenha) {
            spanemail.classList.add("focus-input2-boreder");
            spanemail.classList.remove("focus-input2-boreder-hover");
            spanemail.classList.add("focus-input2");
            spanemail.classList.remove("focus-input-animate");
            spansenha.classList.add("focus-input2-boreder");
            spansenha.classList.remove("focus-input2-boreder-hover");
            spansenha.classList.add("focus-input2");
            spansenha.classList.remove("focus-input-animate");
          } else if (!email) {
            spanemail.classList.add("focus-input2-boreder");
            spanemail.classList.remove("focus-input2-boreder-hover");
            spanemail.classList.add("focus-input2");
            spanemail.classList.remove("focus-input-animate");
          } else if (!inputSenha) {
            spansenha.classList.add("focus-input2-boreder");
            spansenha.classList.remove("focus-input2-boreder-hover");
            spansenha.classList.add("focus-input2");
            spansenha.classList.remove("focus-input-animate");
          }
        }
      });
    };
    const tokenDeAcesso = JSON.parse(localStorage.getItem("user-token"));
    if (tokenDeAcesso) {
      router.push({ name: "Main" });
    }
    var showRecoverPassword = ref(false);
    const logar = () => {
      let fetchResult = document.getElementById("fetchResult");
      let email = document.getElementById("imputEmal").value;
      let password = document.getElementById("inputSenha").value;
      let json = {
        email: email,
        senha: password,
      };
      if (email && password) {
        var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!filter.test(document.getElementById("imputEmal").value)) {
          fetchResult.innerText = "Por favor, digite o email corretamente";
          return false;
        } else {
          servicoLogin.logar(json).then(response => {
            console.log(response);
            //localStorage.setItem("user-token", response);
            if (response.status == 200) {
              response.text().then(function (response) {
                localStorage.setItem("user-token", response);
                //router.push({ name: "Main" })
                document.location.reload(true);
              });
            } else {
              response.text().then(function (response) {
                fetchResult.innerText = response;
              });
            }
          });
        }
      } else {
        fetchResult.innerText = "Preencha os campos";
      }
    };
    const recoverPassword = () => {
      showRecoverPassword.value = !showRecoverPassword.value;
    };
    return {
      showRecoverPassword,
      recoverPassword,
      logar,
      inputAnomation,
      mostarSenha,
      newLanguage,
      i18n,
      switchLanguage,
    };
  },
};
</script>