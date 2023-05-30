import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import MenuItem from "../../Pages/Shared/MenuItem/MenuItem";
import useMenu from "../../Hooks/useMenu";

const Popular = () => {
 const [menu, loading] = useMenu()
 const popular = menu.filter(item => item.category === "popular")

 if(loading){
  return <p>Loading...</p>      
 }

  return (
    <section className="space-y-4">
      <SectionTitle heading={"From Our Menu"} subheading={"Popular Items"} />
      <div className="grid gap-4 md:grid-cols-2">
        {popular.map((menu) => (
          <MenuItem menu={menu} key={menu._id} />
        ))}
      </div>
    </section>
  );
};

export default Popular;
