import { RouterView } from "vue-router";
const RemoveItemPlanoContavue = () =>
    import ("@/views/parametro/planoDeContas/RemoveItemPlanoConta.vue");


const RemoveItemPlanoContaViews = {
    path: "RemoveItemPlanoConta",
    name: "RemoveItemPlanoConta",
    component: RouterView,
    children: [{
            path: "/planocontas/remove",
            name: "RemoveItemPlanoConta",
            component: RemoveItemPlanoContavue
        },

    ]
};


export default RemoveItemPlanoContaViews;