import { MdEditSquare, MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const ManageItemRow = ({ item, index, handleDelete }) => {
  const { _id, name, image, category, price } = item;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>{name}</div>
        </div>
      </td>
      <td>{category}</td>
      <td className="text-right">{price}</td>
      <td>
        <Link>
          <button className="text-orange-500 w-8 h-8 grid place-content-center rounded-md hover:bg-orange-200">
            <MdEditSquare size={20} />
          </button>
        </Link>
      </td>
      <td>
        <button
          className="w-7 h-7 text-white border-red-500 border grid bg-red-500 place-content-center rounded-md hover:bg-transparent hover:text-red-500"
          onClick={() => handleDelete(_id)}
        >
          <MdDeleteOutline size={20} />
        </button>
      </td>
    </tr>
  );
};

export default ManageItemRow;
