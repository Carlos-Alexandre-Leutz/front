<template>
  <nav class="navbar">
    <div class="d-flex flex-grow-1">
      <div class="navbar-brand-box" :class="navbarCollapseClass(vCollapse)">
        <img v-if="!vCollapse" src="../../assets/img/logo_prisma.png" alt="" />
        <!--<img v-if="!vCollapse" src="../../assets/img/farma-facil.png" alt="" /> -->
      </div>
      <button
        id="vertical-menu-btn"
        type="button"
        class="btn btn-sm px-3 font-size-16 header-item"
        @click="onSidebarClick"
      >
        <i class="fa fa-fw fa-bars"></i>
      </button>
    </div>
    <div class="d-flex">
      <DropDownNew class="navbar-item">
        <template v-slot:main-button-text>
          <span class="name-user" >usuario</span>
       
        </template>
        <template v-slot:list-items>
          <li>
            <a class="dropdown-item" href="">
              <i class="bx bx-user font-size-16 align-middle mr-1"></i>
              Status
            </a>
          </li>
          <li role="presentation">
            <a role="menuitem" href="#" target="_self" class="dropdown-item"
              ><span class=""
                ><i class="bx bx-user font-size-16 align-middle mr-1"></i>
                Profile
              </span>
            </a>
          </li>
          <li role="presentation">
            <a role="menuitem" href="" target="_self" class="dropdown-item">
              <i class="bx bx-wallet font-size-16 align-middle mr-1"> </i>
              Teste
            </a>
          </li>
          <li role="presentation" class="d-block">
            <a role="menuitem" href="" target="_self" class="dropdown-item">
              <span class="badge badge-success float-right">11</span>
              <i class="bx bx-wrench font-size-16 align-middle mr-1"> </i>
              Configurações
            </a>
          </li>
          <li role="presentation">
            <a role="menuitem" href="" target="_self" class="dropdown-item">
              Tela de Bloqueio
            </a>
          </li>
          <li role="presentation">
            <hr
              role="separator"
              aria-orientation="horizontal"
              class="dropdown-divider"
            />
          </li>
          <a href="/logout.html" class="dropdown-item text-danger">
            <i
              class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"
            >
            </i>
            Sair
          </a>
         <router-link to="/logout" >Sair</router-link>
         </template>
      </DropDownNew>
    </div>
  </nav>
</template>
<script>
import { ref } from "vue";
import DropDownNew from "../dropdown/DropDownNew";
var teste = 'ole';
export default {
  props: ["collapse"],
  components: { DropDownNew },
  setup(props, { emit }) {
    var vCollapse = ref(props.collapse);

    const onSidebarClick = () => {
      vCollapse.value = !vCollapse.value;
      emit("on-sidebar-click", { vCollapse });
    };

    const navbarCollapseClass = collapse => {
      if (collapse) return "navbar-brand-box--collapsed";
      return "";
    };

    return {
      navbarCollapseClass,
      onSidebarClick,
      vCollapse,
      teste
    };
  }
};

</script>
<style>
.name-user {
  font-size: 0.8rem;
}

@media only screen and (max-width: 600px) {
  .profile-user {
    height: 1.6rem;
    width: 1.6rem;
  }
  .name-user {
    font-size: 0.8rem;
  }
}
</style>
