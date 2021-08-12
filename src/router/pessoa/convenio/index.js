import { RouterView } from "vue-router";
const Convenio = () =>
    import ("@/views/pessoa/convenio/Convenio.vue");
const NovoConvenio = () =>
    import ("@/views/pessoa/convenio/NovoConvenio.vue");

const PrescritorViews = {
    path: "convenio",
    name: "Convenio",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Convenio",
            component: Convenio,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:convenioId",
            name: "Editar Convenio",
            component: NovoConvenio,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Convenio",
            component: NovoConvenio,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "visualizar/:convenioId/:visualizar",
            name: "Visualizar Convenio",
            component: NovoConvenio,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default PrescritorViews;