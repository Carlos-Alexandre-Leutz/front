<template>
  <div class="card shadow">
    <div class="card-header">
      Alterar Senha
    </div>
    <div class="card-body">
      <label for="basic-url">Senha Atual</label>
      <div class="input-group mb-3">
        <input
          id="senhaAtual"
          type="password"
          class="form-control"
          placeholder="Senha Atual"
          aria-label="Usuário"
          aria-describedby="basic-addon1"
        />
        <div class="input-group-prepend">
          <span
            id="spanSenhaAtual"
            @click="mostrarSenha('senhaAtual', 'spanSenhaAtual')"
            class="input-group-text"
          >
            <i class="fas fa-eye p-1"></i>
          </span>
        </div>
      </div>
      <label for="basic-url">Nova senha</label>

      <div class="input-group mb-3">
        <input
          id="novaSenha"
          type="password"
          class="form-control"
          placeholder="Nova senha"
          aria-label="Usuário"
          aria-describedby="basic-addon1"
        />
        <div class="input-group-prepend">
          <span
            id="spanNovaSenha"
            @click="mostrarSenha('novaSenha', 'spanNovaSenha')"
            class="input-group-text"
          >
            <i class="fas fa-eye p-1"></i>
          </span>
        </div>
      </div>

      <label for="basic-url">Confirma senha</label>
      <div class="input-group mb-3">
        <input
          id="confirmaSenha"
          type="password"
          class="form-control"
          placeholder="Confirma senha"
          aria-label="Usuário"
          aria-describedby="basic-addon1"
        />
        <span
          id="spanConfirmaSenha"
          @click="mostrarSenha('confirmaSenha', 'spanConfirmaSenha')"
          class="input-group-text"
        >
          <i class="fas fa-eye p-1"></i>
        </span>
      </div>

      <button @click="alterarSenha" class="ml-auto m-1 btn btn-sm btn-primary">
        Alterar
      </button>
      <label style="color:red;" id="response"></label>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    var urlBase = "https://hapi-farmafacil.prismafive.com.br/";
    if (process.env.NODE_ENV === "development") {
      urlBase = "https://localhost:5001/";
    }
    const mostrarSenha = (a, b) => {
      let inputTypePass = document.getElementById(a);
      let btnSenha = document.getElementById(b);
      if (inputTypePass.type === "password") {
        inputTypePass.type = "text";
        btnSenha.innerHTML = "<i class='fas fa-eye-slash p-1'></i>";
      } else {
        inputTypePass.type = "password";
        btnSenha.innerHTML = "<i class='fas fa-eye p-1'></i>";
      }
    };
    const tokenDeAcesso = JSON.parse(localStorage.getItem("user-token"));
    const alterarSenha = () => {
      let senhaAtual = document.getElementById("senhaAtual").value;
      let novaSenha = document.getElementById("novaSenha").value;
      let confirmaSenha = document.getElementById("confirmaSenha").value;
      let response = document.getElementById("response");
      let json = {
        contaId: tokenDeAcesso.contaSelecionada.id,
        senha: senhaAtual,
        confirmarSenha: confirmaSenha,
        novaSenha: novaSenha,
        usuarioId: tokenDeAcesso.usuarioId
      };
      const props = {
        method: "post",
        body: JSON.stringify(json),
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + tokenDeAcesso.token
        }
      };
      if (
        novaSenha != "" &&
        confirmaSenha != "" &&
        novaSenha == confirmaSenha
      ) {
        let url = urlBase + "usuario/trocar-senha";
        fetch(url, props).then(function(response) {
          response.text().then(function(response) {
            console.log(response);
            response.innerHTML = response;
          });
        });
      } else if (novaSenha != confirmaSenha) {
        response.innerHTML = "A senha e a senha de confirmação não coencidem";
      } else if (novaSenha == "" || confirmaSenha == "") {
        response.innerHTML = "Preencha os campos";
      }
    };
    return {
      alterarSenha,
      mostrarSenha
    };
  }
};
</script>
