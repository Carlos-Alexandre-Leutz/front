import { RouterView } from "vue-router";
const GrupoUsuario = () =>
    import ("@/views/usuario/grupoUsuario/GrupoUsuario.vue");
const NovoGrupoUsuario = () =>
    import ("@/views/usuario/grupoUsuario/NovoGrupoUsuario.vue");

const GrupoUsuarioViews = {
    path: "grupoUsuario",
    name: "GrupoUsuario",
    component: RouterView,
    children: [{
            path: ":page",
            name: "GrupoUsuario",
            component: GrupoUsuario,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:grupoUsuarioId",
            name: "Editar Cadastro Grupo de Usuário",
            component: NovoGrupoUsuario,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro Grupo de Usuário",
            component: NovoGrupoUsuario,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "visualizar/:grupoUsuarioId/:visualizar",
            name: "visualizar Cadastro Grupo de Usuário",
            component: NovoGrupoUsuario,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default GrupoUsuarioViews;