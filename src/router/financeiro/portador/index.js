import { RouterView } from "vue-router";
const Portador = () =>
    import ("@/views/financeiro/portador/Portador.vue");
const NovoPortador = () =>
    import ("@/views/financeiro/portador/NovoPortador.vue");

const PortadorViews = {
    path: "portador",
    name: "Portador",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Portador",
            component: Portador,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:portadorId",
            name: "Editar Portador",
            component: NovoPortador,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Nova TranPortadoracao",
            component: NovoPortador,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default PortadorViews;