import { RouterView } from "vue-router";
const Classe = () =>
    import ("@/views/estoque/classe/Classe.vue");
const NovaClasse = () =>
    import ("@/views/estoque/classe/NovaClasse.vue");

const ClasseViews = {
    path: "classe",
    name: "Classe",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Classe",
            component: Classe,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:classeId",
            name: "Editar Cadastro de Classe",
            component: NovaClasse,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Classe",
            component: NovaClasse,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default ClasseViews;