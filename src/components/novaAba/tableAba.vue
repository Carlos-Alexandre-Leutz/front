<template style="d-flex">
  <div class="nav-item">
    <li :id="id" class="nav-link">
      <router-link @click="ativarClassAbas(id)" :to="link" aria-current="page">
       <!--  {{ label }} -->
        {{ $i18n.translate(label) }}
      </router-link>
      <button
        @click="killAba(id)"
        type="button"
        class="btn-close ml-1"
        aria-label="Close"
      ></button>
    </li>
  </div>
</template>



<script>
//tem que verificar o ativo class="nav-link active"
export default {
  props: {
    link: { type: String, default: "vazio" },
    label: { type: String, default: "vazio" },
    id: { type: String, default: "00000000-0000-0000-0000-000000000000" },
  },
  data() {
    let getPaginasAbertas = sessionStorage.getItem("paginasAbertas");
    if (!getPaginasAbertas) {
      sessionStorage.setItem("paginasAbertas", "[]");
    } else {
      console.log("ja foi definido o paginasAbertas");
    }
    const killAba = id => {
      sessionStorage.setItem("idItemKill", id);
    };
    const ativarClassAbas = id => {
      //remover todos os outros e add quandofor criado tmb
      let abas = document.getElementsByClassName("nav-link ");
      var array = Array.prototype.slice.call(abas);
      function logArrayElements(element) {
        let div = element;
        div.classList.remove("active");
      }
      array.forEach(logArrayElements);
      let teste = document.getElementById(id);
      teste.classList.add("active");
    };

    return { killAba, ativarClassAbas };
  },
};
</script>
