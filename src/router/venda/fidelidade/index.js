import { RouterView } from "vue-router";
const Fidelidade = () =>
    import ("@/views/venda/fidelidade/Fidelidade.vue");
const NovoFidelidade = () =>
    import ("@/views/venda/fidelidade/NovoFidelidade.vue");

const FidelidadeViews = {
    path: "fidelidade",
    name: "Fidelidade",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Fidelidade",
            component: Fidelidade,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:fidelidadeId",
            name: "EditarNovoFidelidade",
            component: NovoFidelidade,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Fidelidade",
            component: NovoFidelidade,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default FidelidadeViews;