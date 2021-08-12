import { RouterView } from "vue-router";
const Teste = () =>
    import ("@/views/regiao/testeNewLista/teste.vue");
const NovoTeste = () =>
    import ("@/views/regiao/testeNewLista/NovoTeste.vue");

const testeTabelaViews = {
    path: "testeTabela",
    name: "Teste Tabela",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Teste Tabela",
            component: Teste,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:testetabelaId",
            name: "Editar teste Tabela",
            component: NovoTeste,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Nova teste Tabela",
            component: NovoTeste,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default testeTabelaViews;