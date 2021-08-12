import { RouterView } from "vue-router";
const Metodo = () =>
    import ("@/views/venda/metodo/Metodo.vue");
const NovoMetodo = () =>
    import ("@/views/venda/metodo/NovoMetodo.vue");

const MetodoViews = {
    path: "metodo",
    name: "Metodo",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Metodo",
            component: Metodo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:metodoId",
            name: "EditarMetodo",
            component: NovoMetodo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "NovoMetodo",
            component: NovoMetodo,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default MetodoViews;