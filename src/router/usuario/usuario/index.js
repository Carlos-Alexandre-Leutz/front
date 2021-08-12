import { RouterView } from "vue-router";
const Usuario = () =>
    import ("@/views/usuario/usuario//Usuario.vue");
const NovoUsuario = () =>
    import ("@/views/usuario/usuario/NovoUsuario.vue");

const UsuarioViews = {
    path: "usuario",
    name: "Usuario",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Usuario",
            component: Usuario,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:usuarioId",
            name: "Editar Usuario",
            component: NovoUsuario,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Usuario",
            component: NovoUsuario,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "visualizar/:usuarioId/:visualizar",
            name: "visualizar Usuario",
            component: NovoUsuario,
            meta: {
                requiresAuth: true
            }
        },
    ]
};

export default UsuarioViews;