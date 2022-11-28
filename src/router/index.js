import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/init";
import Home from "../views/Home.vue";
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Create from "../views/Create.vue"
import ViewWorkout from "../views/ViewWorkout.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
     meta: {
      title: "Home",
      auth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      auth: false,
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
     meta: {
      title: "Create",
      auth: true,
    },
  },
  {
    path: "/view-workout/:workoutId",
    name: "View-Workout",
    component: ViewWorkout,
     meta: {
      title: "View Workout",
      auth: false,
    },
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {                 // En el router se establece un guard ( condición ) que se ejecuta antes de cualquier navegación
  document.title = `${to.meta.title} | Active Tracker`; // El título de cada pestaña se establecerá con la info del meta de cada ruta
  next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();                    // Se define el usuario logueado si lo hay
  if (to.matched.some((res) => res.meta.auth)) {        // Si el destino de la ruta tiene la condición de que debe estar el usuario autenticado
    if (user) {                                         // comprobamos si existe un usuario logueado
      next();                                           // Si lo hay deja ir a la ruta de la condición
      return;
    }
    next({ name: "Login" });                            // Sino te manda al login
    return;
  }
  next();                                               // Si la ruta no tiene auth permite el paso.
});

export default router;
