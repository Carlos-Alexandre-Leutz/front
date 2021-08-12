<template>
  <div class="fade-left">
    <form class="login-form d-flex flex-column justify-content-evenly">
      <h3>
        {{ $i18n.translate("Recuperar Senha") }}
      </h3>
      <h6 v-if="requestSent">
        {{
          $i18n.translate(
            "Verifique seu email para continuar a recuperação da sua senha."
          )
        }}
      </h6>

      <div v-if="!requestSent">
        <h6>
          {{
            $i18n.translate(
              "Digite seu e-mail para continuar a recuperação da senha."
            )
          }}
        </h6>
        <div class="form-group login-form--input">
          <label class="login-form--label" for="EmailInput">{{
            $i18n.translate("Email de Login")
          }}</label>
          <input
            id="EmailInput"
            class="form-control"
            type="email"
            placeholder="usuario@dominio.com.br"
            v-model="email"
          />
        </div>
      </div>

      <div class="d-flex flex-column login-form--actions">
        <button
          v-if="!requestSent"
          class="btn btn-success"
          type="submit"
          @click="requestRecoverPassword"
        >
          Enviar
        </button>
        <button class="btn btn-outline" type="button" @click="returnToLogin">
          Voltar para Login
        </button>
      </div>
      <div
        class="login-form--sub-actions d-flex flex-row align-items-center justify-content-center"
      >
        <h6>
          Ainda não possui acesso?
        </h6>
        <button class="btn btn-sm btn-warning ml-3">Solicitar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { inject, ref } from "vue";

export default {
  setup(props, { emit }) {
    var email = ref("");
    var requestSent = ref(false);
    const http = inject("http");
    const returnToLogin = () => {
      console.log("Rertun to login!");
      emit("return-to-login", true);
    };
    ///implementar gateway api
    const requestRecoverPassword = async () => {
      await http({
        url: "recuperar-senha/solicitar",
        method: "POST",
        data: { de: email }
      })
        .then(() => {
          requestSent.value = true;
        })
        .catch(err => {
          console.error("Error when request recover password: ", err);
        });
    };

    return { email, requestSent, requestRecoverPassword, returnToLogin };
  }
};
</script>

<style></style>
