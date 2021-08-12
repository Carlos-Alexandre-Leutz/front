import { RouterView } from "vue-router";
const teste = () =>
    import ("@/views/pessoa/fornecedor/NovoPessoaAntigo.vue");
const NovoTeste = () =>
    import ("@/views/pessoa/fornecedor/NovoPessoaAntigo.vue");

const testeViews = {
    path: "Teste",
    name: "teste",
    component: RouterView,
    children: [{
            path: ":page",
            name: "teste",
            component: teste,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:testeId",
            name: "Editar teste",
            component: NovoTeste,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "nova",
            name: "Novo teste",
            component: NovoTeste,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default testeViews;