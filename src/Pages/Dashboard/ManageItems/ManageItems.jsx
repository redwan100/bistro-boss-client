import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useDynamicTitle from "../../../Hooks/useDynamicTitle";
import useMenu from "../../../Hooks/useMenu";
import ManageItemRow from "./ManageItemRow";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageItems = () => {
  useDynamicTitle("Manage All Items");
  const [menu, isLoading, refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();

  if (isLoading) {
    return <span className="loading loading-ring loading-md"></span>;
  }


    const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          

          axiosSecure.delete(`/menu/${id}`).then((res) => {
            if(res.data.deletedCount > 0){
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              refetch()
            }
          });
        }
      });
    };

    
  return (
    <div className="">
      <div className="">
        <SectionTitle heading={"Manage All Items"} subheading={"Hurry up"} />
      </div>

      <div className="w-full">
        <div className="overflow-x-auto w-full mx-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>item</th>
                <th>category</th>
                <th>price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <ManageItemRow
                  key={item._id}
                  item={item}
                  index={index}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
