<template>
  <div class="container fade-in">
    <div class="min-vh-100 d-flex justify-content-center align-content-center">
      <div class="m-auto col-lg-8">
        <div class="card-group">
          <div class="card p-4">
            <div class="card-body">
              <div v-if="loading" class="loading-container">
                <RotateSquare
                  class="loading-position animated fadeIn"
                  size="60px"
                ></RotateSquare>
              </div>
              <form v-else @submit="onFormValidate">
                <div v-if="id">
                  <h1>Nova Senha</h1>
                  <p class="text-muted">Informe a nova senha abaixo.</p>
                  <div class="d-flex flex-column">
                    <div class="input-group mb-3">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <CIcon name="cil-lock-locked" />
                        </span>
                      </div>
                      <input
                        v-model="newPassword"
                        type="password"
                        class="form-control"
                        placeholder="Nova Senha"
                        required
                      />
                    </div>

                    <div class="input-group mb-3">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <CIcon name="cil-lock-locked" />
                        </span>
                      </div>
                      <input
                        v-model="repeatNewPassword"
                        type="password"
                        class="form-control"
                        placeholder="Repita a Nova Senha"
                        required
                      />
                    </div>
                  </div>
                  <div class="d-flex align-content-around mt-5">
                    <button class="btn btn-primary mr-auto" type="submit">
                      Trocar Senha
                    </button>
                    <button
                      class="btn btn-link"
                      @click="$router.push('/login')"
                    >
                      Voltar
                    </button>
                  </div>
                </div>
                <div v-else>
                  <h3>Recuperar Senha</h3>
                  <p v-if="emailSent">
                    Foi enviado um link de recuperação para seu e-mail.
                  </p>
                  <p v-else class="text-muted">
                    Digite um e-mail para continuar a recuperação da senha.
                  </p>
                  <div v-if="!emailSent">
                    <input
                      id="email"
                      v-model="email"
                      type="email"
                      class="form-control"
                      placeholder="E-mail"
                      autocomplete="username email"
                      required
                      @keyup.enter="RecuperarSenha"
                    />
                  </div>
                  <div class="d-flex align-content-around mt-5">
                    <button class="btn btn-primary mr-auto" type="submit">
                      Enviar
                    </button>
                    <button
                      class="btn btn-link"
                      @click="$router.push('/login')"
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            class="card text-center py-5 d-md-down-none bg-primary text-white"
          >
            <h2>Ainda não tem uma conta?</h2>
            <p class="m-5">
              Entre em contato com nossa equipe de vendas para maiores
              informações.
            </p>
            <div>
              <button
                href="https://www.prismafive.com.br/"
                target="_blank"
                class="btn btn-primary active mt-3"
              >
                Contratar agora!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import LoadingButton from "../../components/loading-button/LoadingButton";
import RotateSquare from "../../components/RotateSquare";

export default {
  name: "ForgotPassword",
  components: {
    RotateSquare
  },
  data() {
    return {
      loading: false,
      id: "",
      email: "",
      newPassword: "",
      repeatNewPassword: "",
      emailSent: false
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {
    onFormValidate(event) {
      let valid = true;
      event.preventDefault();

      if (this.email && (this.newPassword || this.repeatNewPassword)) {
        valid = false;
      }

      if (valid && !this.email) {
        this.recoveryPassword();
        return;
      }

      if (valid && this.newPassword == this.repeatNewPassword) {
        this.changePassword();
      }
    },
    changePassword() {
      this.loading = true;
      this.$http({
        url: "recuperar-senha/" + this.email,
        method: "GET"
      })
        .then(() => {
          this.loading = false;

          this.emailSent = true;
        })
        .catch((erro) => {
          this.loading = false;
          this.$notify({
            data: erro.response.data.erros,
            type: "warn",
            duration: 10000
          });
        });
    },
    recoveryPassword() {
      let vm = {
        Id: this.id,
        Senha: this.newPassword
      };
      this.loading = true;
      this.$http({
        url: "recuperar-senha/trocar-senha",
        data: vm,
        method: "POST"
      })
        .then(() => {
          this.loading = false;
          this.$notify({
            data: ["Senha atualizada com sucesso."],
            type: "success",
            duration: 10000
          });
          this.$router.push("/login");
        })
        .catch((erro) => {
          this.loading = false;
          this.$notify({
            data: erro.response.data.erros,
            type: "warn",
            duration: 10000
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
