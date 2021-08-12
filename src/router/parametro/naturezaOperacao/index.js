import { RouterView } from "vue-router";
const NaturezaOperacao = () =>
    import ("@/views/parametro/naturezaOperacao/NaturezaOperacao.vue");
const NovoNaturezaOperacao = () =>
    import ("@/views/parametro/naturezaOperacao/NovoNaturezaOperacao.vue");

const NaturezaOperacaoViews = {
    path: "naturezaOperacao",
    name: "NaturezaOperacao",
    component: RouterView,
    children: [{
            path: ":page",
            name: "NaturezaOperacao",
            component: NaturezaOperacao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:naturezaOperacaoId",
            name: "Editar Cadastro de Natureza Operacao",
            component: NovoNaturezaOperacao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Natureza Operacao",
            component: NovoNaturezaOperacao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:naturezaOperacaoId/:visualizar",
            name: "Visualizar Natureza Operacao",
            component: NovoNaturezaOperacao,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default NaturezaOperacaoViews;