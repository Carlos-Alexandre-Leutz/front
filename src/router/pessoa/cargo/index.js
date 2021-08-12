import { RouterView } from "vue-router";
const Cargo = () =>
    import ("@/views/pessoa/cargo/Cargo.vue");
const NovoCargo = () =>
    import ("@/views/pessoa/cargo/NovoCargo.vue");

const CargoViews = {
    path: "cargo",
    name: "Cargo",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Cargo",
            component: Cargo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:cargoId",
            name: "Editar Cargo",
            component: NovoCargo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Cargo",
            component: NovoCargo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "visualizar/:cargoId/:visualizar",
            name: "Visualizar Cargo",
            component: NovoCargo,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default CargoViews;