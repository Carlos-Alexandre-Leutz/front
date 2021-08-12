import { RouterView } from "vue-router";
const Floral = () =>
    import ("@/views/venda/floral/Floral.vue");
const NovoFloral = () =>
    import ("@/views/venda/floral/NovoFloral.vue");

const FloralViews = {
    path: "floral",
    name: "Floral",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Floral",
            component: Floral,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:floralId",
            name: "EditarFloral",
            component: NovoFloral,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Floral",
            component: NovoFloral,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default FloralViews;