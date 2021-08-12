import { RouterView } from "vue-router";
const Ensaio = () =>
    import ("@/views/parametro/ensaio/Ensaio.vue");
const NovoEnsaio = () =>
    import ("@/views/parametro/ensaio/NovoEnsaio.vue");

const EnsaioViews = {
    path: "ensaio",
    name: "Ensaio",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Ensaio",
            component: Ensaio,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:ensaioId",
            name: "Editar Cadastro de Ensaio",
            component: NovoEnsaio,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Ensaio",
            component: NovoEnsaio,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default EnsaioViews;