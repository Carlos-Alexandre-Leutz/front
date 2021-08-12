import { RouterView } from "vue-router";
const PrincipioAtivo = () =>
    import ("@/views/estoque/principioAtivo/PrincipioAtivo.vue");
const NovoPrincipioAtivo = () =>
    import ("@/views/estoque/principioAtivo/NovoPrincipioAtivo.vue");

const PrincipioAtivoViews = {
    path: "principioAtivo",
    name: "Princípio Ativo",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Princípio Ativo",
            component: PrincipioAtivo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:principioAtivoId",
            name: "Editar Princípio Ativo",
            component: NovoPrincipioAtivo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Princípio Ativo",
            component: NovoPrincipioAtivo,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default PrincipioAtivoViews;