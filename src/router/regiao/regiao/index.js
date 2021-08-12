import { RouterView } from "vue-router";
const Regiao = () =>
    import ("@/views/regiao/regiao/Regiao.vue");
const NovoRegiao = () =>
    import ("@/views/regiao/regiao/NovoRegiao.vue");

const RegiaoViews = {
    path: "regiao",
    name: "Regiao",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Regiao",
            component: Regiao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:regiaoId",
            name: "Editar Região",
            component: NovoRegiao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Nova Região",
            component: NovoRegiao,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default RegiaoViews;