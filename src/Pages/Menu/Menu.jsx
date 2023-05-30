import React from 'react'
import useDynamicTitle from '../../Hooks/useDynamicTitle'
import Cover from '../Shared/Cover/Cover'
import img from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import useMenu from '../../Hooks/useMenu'
import SectionTitle from '../../Components/SectionTitle/SectionTitle'
import MenuCategory from '../MenuCategory/MenuCategory'


const Menu = () => {
    useDynamicTitle('Menu')
    
    const [menu] = useMenu();
   
     const dessert = menu.filter((item) => item.category === "dessert");
     const soup = menu.filter((item) => item.category === "soup");
     const salad = menu.filter((item) => item.category === "salad");
     const pizza = menu.filter((item) => item.category === "pizza");
     const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Cover img={img} title={"our menu"} />

      <SectionTitle heading={"Todays offer"} subheading={"Dont miss"} />

      <MenuCategory items={offered} />

      <MenuCategory img={dessertImg} items={dessert} title={"desert"} />

      <MenuCategory img={pizzaImg} items={pizza} title={"pizza"} />


      <MenuCategory img={saladImg} items={salad} title={"salad"} />


      <MenuCategory img={soupImg} items={soup} title={"soup"} />
    </div>
  );
}

export default Menu