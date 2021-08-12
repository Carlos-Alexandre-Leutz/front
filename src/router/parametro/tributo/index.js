import { RouterView } from "vue-router";
const Tributo =
    import ("@/views/parametro/tributo/Tributo.vue");
const NovoTributo =
    import ("@/views/parametro/tributo/NovoTributo.vue");

const TributoViews = {
    path: "tributo",
    name: "Tributo",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Tributo",
            component: Tributo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:tributoId",
            name: "Editar Cadastro de Tributo",
            component: NovoTributo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Tributo",
            component: NovoTributo,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default TributoViews;