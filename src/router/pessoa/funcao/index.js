import { RouterView } from "vue-router";
const Funcao = () =>
    import ("@/views/pessoa/funcao/Funcao.vue");
const NovoFuncao = () =>
    import ("@/views/pessoa/funcao/NovoFuncao.vue");

const FuncaoViews = {
    path: "funcao",
    name: "Funcao",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Funcao",
            component: Funcao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:funcaoId",
            name: "Editar Funcao",
            component: NovoFuncao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Funcao",
            component: NovoFuncao,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "visualizar/:funcaoId/:visualizar",
            name: "Visualizar Funcao",
            component: NovoFuncao,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default FuncaoViews;