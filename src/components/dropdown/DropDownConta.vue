<template>
  <div>
    <b-dropdown
      id="ddown1"
      :text="contaSelecionada"
      class="dropdown"
      title="Empresa selecionada"
    >
      <b-dropdown-item
        v-for="item in dropdownItems"
        :key="item.id"
        @click="MudarConta(item.id)"
      >
        {{ item.nomeFantasia }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "DropDownConta",
  data() {
    return {
      dropdownItems: [],
      contaSelecionada: ""
    };
  },
  created() {},
  mounted() {
    this.dropdownItems = this.$store.getters.getAutenticacao.contas;
    let selecionada = this.$store.getters.getAutenticacao.contaSelecionadaId;
    this.contaSelecionada = this.$store.getters.getAutenticacao.contas.filter(
      x => x.id == selecionada
    )[0].nomeFantasia;
  },
  methods: {
    MudarConta(contaId) {
      this.$http({
        url: "login/mudar-conta/" + contaId,
        method: "GET"
      })
        .then(resp => {
          const token = resp.data;
          this.$store.dispatch("login", token).then(() => this.$router.go());
        })
        .catch(erro => {
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
