 import { RouterView } from "vue-router";
 const Loginvue = () =>
     import ("@/views/login/Login.vue");


 const LoginViews = {
     path: "login",
     name: "Logar",
     component: RouterView,
     children: [{
             path: "/login",
             name: "Logar",
             component: Loginvue
         },

     ]
 };


 export default LoginViews;