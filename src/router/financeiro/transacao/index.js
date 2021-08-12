import { RouterView } from "vue-router";
const Transacao = () =>
    import ("@/views/financeiro/transacao/Transacao.vue");
const NovoTransacao = () =>
    import ("@/views/financeiro/transacao/NovoTransacao.vue");

const TransacaoViews = {
    path: "transacao",
    name: "Transacao",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Transacao",
            component: Transacao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:TransacaoId",
            name: "Editar Transacao",
            component: NovoTransacao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Nova Transacao",
            component: NovoTransacao,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default TransacaoViews;