import { RouterView } from "vue-router";
const PosAdiquirinte =
    import ("@/views/parametro/posAdiquirinte/PosAdiquirinte.vue");
const NovoPosAdiquirinte =
    import ("@/views/parametro/posAdiquirinte/NovoPosAdiquirinte.vue");

const PosAdiquirinteViews = {
    path: "posAdiquirinte",
    name: "PosAdiquirinte",
    component: RouterView,
    children: [{
            path: ":page",
            name: "PosAdiquirinte",
            component: PosAdiquirinte,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:posAdiquirinteId",
            name: "Editar Cadastro de Pos Adiquirinte",
            component: NovoPosAdiquirinte,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cadastro de Pos Adiquirinte",
            component: NovoPosAdiquirinte,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default PosAdiquirinteViews;