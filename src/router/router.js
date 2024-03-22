import Home from '../page/home/Home.js'
// import Following from '../page/Following/Following.js'
import Shop from '../page/Shop/Shop.js'


export const links = [
  {
    name: "Home",
    path: "/",
    link: true,
    component: Home,
  },
 
  {
    name: "Shop",
    path: "/shop",
    link: true,
    component: Shop,
  },
  {
    name: "Categori",
    path: "/Categori",
    link: false,
    sub: [
      {
        title: "Sofa",
      },
      {
        title: "Chair",
      },
      {
        title: "Camping",
      },
    ],
  },
  
];