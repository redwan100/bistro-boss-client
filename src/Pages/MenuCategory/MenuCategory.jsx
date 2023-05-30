import { Link } from "react-router-dom";

import Cover from "../Shared/Cover/Cover";
import MenuItem from "../Shared/MenuItem/MenuItem";

const MenuCategory = ({items,title, img}) => {
    
  return (
    <div>
      {title && <Cover title={title} img={img} />}
      <div className="grid md:grid-cols-2 gap-10">
        {items?.map((item) => (
          <MenuItem menu={item} key={item._id} />
        ))}
      </div>

      <Link to={`/order/${title}`}>
        <button className="btn btn-outline border-0 border-b-2 my-4">
          order now
        </button>
      </Link>
    </div>
  );
}

export default MenuCategory