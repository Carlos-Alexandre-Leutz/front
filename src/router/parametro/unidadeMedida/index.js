import { RouterView } from "vue-router";
const UnidadeMedida = () =>
    import ("@/views/parametro/unidadeMedida/UnidadeMedida.vue");
const NovoUnidadeMedida = () =>
    import ("@/views/parametro/unidadeMedida/NovoUnidadeMedida.vue");

const UnidadeMedidaViews = {
    path: "unidadeMedida",
    name: "Unidade de Medida",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Unidade de Medida",
            component: UnidadeMedida,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:unidadeMedidaId",
            name: "Editar Unidade de Medida",
            component: NovoUnidadeMedida,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Nova Unidade de Medida",
            component: NovoUnidadeMedida,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default UnidadeMedidaViews;