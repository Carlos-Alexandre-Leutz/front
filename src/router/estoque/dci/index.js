import { RouterView } from "vue-router";
const Dci = () =>
    import ("@/views/estoque/dci/Dci.vue");
const NovoDci = () =>
    import ("@/views/estoque/dci/NovoDci.vue");

const DciViews = {
    path: "dci",
    name: "Dci",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Dci",
            component: Dci,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:dciId",
            name: "Editar Cadastro de Dci",
            component: NovoDci,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Dci",
            component: NovoDci,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default DciViews;