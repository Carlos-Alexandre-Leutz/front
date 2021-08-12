import { RouterView } from "vue-router";
const MensagemPadrao = () =>
    import ("@/views/venda/mensagemPadrao/MensagemPadrao.vue");
const NovoMensagemPadrao = () =>
    import ("@/views/venda/mensagemPadrao/NovoMensagemPadrao.vue");

const MensagemPadraoViews = {
    path: "mensagemPadrao",
    name: "MensagemPadrao",
    component: RouterView,
    children: [{
            path: ":page",
            name: "MensagemPadrao",
            component: MensagemPadrao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:mensagemPadraoId",
            name: "Editar Mensagem Padrao",
            component: NovoMensagemPadrao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "NovoMensagemPadrao",
            component: NovoMensagemPadrao,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default MensagemPadraoViews;