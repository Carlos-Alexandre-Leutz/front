import { RouterView } from "vue-router";
const Banco = () =>
    import ("@/views/financeiro/banco/Banco.vue");
const NovoBanco = () =>
    import ("@/views/financeiro/banco/NovoBanco.vue");

const BancoViews = {
    path: "banco",
    name: "Banco",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Banco",
            component: Banco,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:bancoId",
            name: "Editar Banco",
            component: NovoBanco,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Nova Banco",
            component: NovoBanco,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default BancoViews;