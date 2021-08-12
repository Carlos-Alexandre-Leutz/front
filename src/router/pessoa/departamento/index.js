import { RouterView } from "vue-router";
const Departamento = () =>
    import ("@/views/pessoa/departamento/Departamento.vue");
const NovoDepartamento = () =>
    import ("@/views/pessoa/departamento/NovoDepartamento.vue");

const DepartamentoViews = {
    path: "departamento",
    name: "Departamento",
    component: RouterView,
    children: [{
            path: ":page",
            name: "Departamento",
            component: Departamento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "editar/:departamentoId",
            name: "Editar Departamento",
            component: NovoDepartamento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "Novo",
            name: "Novo Departamento",
            component: NovoDepartamento,
            meta: {
                requiresAuth: true
            }
        }
    ]
};

export default DepartamentoViews;