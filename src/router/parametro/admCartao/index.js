import { RouterView } from "vue-router";
const AdimistradorCartao = () =>
    import ("@/views/parametro/adimistradorCartao/AdimistradorCartao.vue");
const NovoAdimistradorCartao = () =>
    import ("@/views/parametro/adimistradorCartao/NovoAdimistradorCartao.vue");

const AdimistradorCartaoViews = {
    path: "adimistradorCartao",
    name: "AdimistradorCartao",
    component: RouterView,
    children: [{
            path: ":page",
            name: "AdimistradorCartao",
            component: AdimistradorCartao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:adimistradorCartaoId",
            name: "Editar Cadastro de Adimistrador Cartao",
            component: NovoAdimistradorCartao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Adimistrador Cartao",
            component: NovoAdimistradorCartao,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default AdimistradorCartaoViews;