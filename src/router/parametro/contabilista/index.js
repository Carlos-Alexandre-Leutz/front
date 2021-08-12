import { RouterView } from "vue-router";
const Contabilista = () =>
    import ("@/views/parametro/contabilista/Contabilista.vue");
const NovoContabilista = () =>
    import ("@/views/parametro/contabilista/NovoContabilista.vue");

const ContabilistaViews = {
    path: "contabilista",
    name: "Contabilista",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Contabilista",
            component: Contabilista,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:contabilistaId",
            name: "Editar Cadastro de Contabilista",
            component: NovoContabilista,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Contabilista",
            component: NovoContabilista,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default ContabilistaViews;