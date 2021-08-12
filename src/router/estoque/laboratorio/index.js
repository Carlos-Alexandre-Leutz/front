import { RouterView } from "vue-router";
const Laboratorio = () =>
    import ("@/views/estoque/laboratorio/Laboratorio.vue");
const NovoLaboratorio = () =>
    import ("@/views/estoque/laboratorio/NovoLaboratorio.vue");

const LaboratorioViews = {
    path: "laboratorio",
    name: "Laboratório",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Laboratório",
            component: Laboratorio,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:laboratorioId",
            name: "Editar Cadastro de Laboratório",
            component: NovoLaboratorio,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Laboratório",
            component: NovoLaboratorio,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default LaboratorioViews;