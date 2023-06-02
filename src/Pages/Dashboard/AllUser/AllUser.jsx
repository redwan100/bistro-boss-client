import { useQuery } from "@tanstack/react-query";
import React from "react";
import useDynamicTitle from "../../../Hooks/useDynamicTitle";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUser = () => {
  useDynamicTitle("All Users");
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeAdmin = (user) => {
   fetch(`http://localhost:5000/users/admin/${user._id}`,{
    method:"PATCH"
   })
   .then(res =>res.json())
   .then(data =>{
      if(data.modifiedCount > 0){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${user.name} is an admin now!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch()
      }
   })
  };

  const handleDelete = (id) => {};
  return (
    <div>
      <h1>Total Users: {users.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <>
                  <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className={`w-6 h-6 bg-orange-500 text-white  grid place-content-center rounded-md hover:bg-rose-600 ${user.role === 'admin' && 'w-max py-1 px-2'}`}
                      >
                        {user.role === "admin" ? (
                          "admin"
                        ) : (
                          <FaUserShield size={15} />
                        )}
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button
                        className="w-6 h-6 bg-rose-500 text-orange-50 grid place-content-center rounded-md hover:bg-rose-600"
                        onClick={() => handleDelete(user._id)}
                      >
                        <AiOutlineDelete size={15} title="Delete" />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
