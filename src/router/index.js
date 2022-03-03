import Vue from 'vue'
import VueRouter from 'vue-router'
import FilmView from '../views/FilmView.vue'
import FilmDetailsView from '../views/DetailsView.vue'
import CinemaView from '../views/CinemaView.vue'
import CinemaDetailsView from '../views/CinemaDetailsView.vue'
import CityView from '../views/CityView.vue'
import OrderView from '../views/OrderView.vue'
import NewsView from '../views/NewsView.vue'
import MineView from '../views/MineView.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/film',
    component: FilmView,
  },
  {
    path: '/filmDetails',
    component: FilmDetailsView,
  },
  {
    path: '/cinema',
    component: CinemaView,
  },
  {
    path: '/cinemaDetails',
    component: CinemaDetailsView,  
  },
  {
    path:'/city',
    component:CityView      
  },
  {
    path:'/order',
    component:OrderView      
  },
  {
    path: '/news',
    component: NewsView
  },
  {
    path: '/mine',
    component: MineView
  },
  {
    path: '/login',
    component: LoginView
  },
  //////这里跳转页面，没跳好
  {
    path: '/',
    redirect:'/city'
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})


//---------------------------------------//
/* router.beforeEach((to,from,next)=>{
  if(to==='/city'){
      next((vm)=>{
        vm.$store.state.showFoot = false;
      });
  }else{
    next((vm)=>{
      vm.$store.state.showFoot = true;
    });
  }
}) */


export default router
