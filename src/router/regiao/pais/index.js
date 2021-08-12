import { RouterView } from "vue-router";
const Pais = () =>
    import ("@/views/regiao/pais/Pais.vue");
const NovoPais = () =>
    import ("@/views/regiao/pais/NovoPais.vue");

const PaisViews = {
    path: "pais",
    name: "Pais",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Pais",
            component: Pais,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:paisId",
            name: "Editar Cadastro de Pais",
            component: NovoPais,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Pais",
            component: NovoPais,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default PaisViews;