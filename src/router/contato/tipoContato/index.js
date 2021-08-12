import { RouterView } from "vue-router";
const Contato = () =>
    import ("@/views/contato/Contato.vue");
const NovaContato = () =>
    import ("@/views/contato/NovoContato.vue");

const ContatoViews = {
    path: "tipoContato",
    name: "Contato",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Contato",
            component: Contato,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:contatoId",
            name: "Editar Cadastro de Contato",
            component: NovaContato,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Contato",
            component: NovaContato,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:contatoId/:visualizar",
            name: "Visualizar Cadastro de Contato",
            component: NovaContato,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default ContatoViews;