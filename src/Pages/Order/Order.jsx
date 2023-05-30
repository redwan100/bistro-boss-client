import Cover from "../Shared/Cover/Cover";
import orderCover from "../../assets/shop/banner2.jpg";
import useMenu from "../../Hooks/useMenu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import FoodCard from "../../Components/FoodCard/FoodCard";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import useDynamicTitle from "../../Hooks/useDynamicTitle";

const Order = () => {
    useDynamicTitle('Order Food')
  const [menu] = useMenu();
  const {category} = useParams()
  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
  const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);

  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div>
      <Cover img={orderCover} title={"order food"} />

      <div className="tabs">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soup</Tab>
            <Tab>Dessert</Tab>
            <Tab>Drinks</Tab>
          </TabList>

          <TabPanel>
           <OrderTab items={salad}/>
          </TabPanel>
         
          <TabPanel>
           <OrderTab items={pizza}/>
          </TabPanel>
         
          <TabPanel>
           <OrderTab items={soup}/>
          </TabPanel>
         
          <TabPanel>
           <OrderTab items={dessert}/>
          </TabPanel>
         
          <TabPanel>
           <OrderTab items={drinks}/>
          </TabPanel>
         
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
