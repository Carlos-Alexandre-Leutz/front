import { RouterView } from "vue-router";
const GrupoProduto = () =>
    import ("@/views/estoque/produto/GrupoProduto.vue");
const NovoGrupoProduto = () =>
    import ("@/views/estoque/produto/NovoGrupoProduto.vue");

const GrupoProdutoViews = {
    path: "grupoProduto",
    name: "GrupoProduto",
    component: RouterView,
    children: [{
            path: ":page",
            name: "GrupoProduto",
            component: GrupoProduto,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:grupoProdutoId",
            name: "Editar Cadastro Grupo de Produto",
            component: NovoGrupoProduto,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro Grupo de Produto",
            component: NovoGrupoProduto,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default GrupoProdutoViews;