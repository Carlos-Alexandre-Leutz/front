import { RouterView } from "vue-router";
const Cotacao = () =>
    import ("@/views/parametro/moeda/CotacaoMoeda.vue");
const NovoCotacao = () =>
    import ("@/views/parametro/moeda/NovoCotacaoMoeda.vue");

const CotacaoViews = {
    path: "cotacao",
    name: "Cotacao",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Cotacao",
            component: Cotacao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:cotacaoId",
            name: "Editar Cadastro de Cotacao",
            component: NovoCotacao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Cotacao",
            component: NovoCotacao,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default CotacaoViews;