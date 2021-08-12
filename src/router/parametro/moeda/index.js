import { RouterView } from "vue-router";
const Moeda = () =>
    import ("@/views/parametro/moeda/Moeda.vue");
const NovoMoeda = () =>
    import ("@/views/parametro/moeda/NovoMoeda.vue");

const MoedaViews = {
    path: "moeda",
    name: "Moeda",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Moeda",
            component: Moeda,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:moedaId",
            name: "Editar Cadastro de Moeda",
            component: NovoMoeda,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Moeda",
            component: NovoMoeda,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default MoedaViews;