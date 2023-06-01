import React from 'react'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle'
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_UPLOAD_TOKEN;
const AddItem = () => {
    const formData = new FormData()
    const axios = useAxiosSecure()

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const {
      handleSubmit,
      register,
      reset,
    } = useForm();

    const onSubmit = (data) =>{
        formData.append('image', data.image[0])

        fetch(img_hosting_url,{
            method:"POST",
            body: formData,
        })
        .then(res => res.json())
        .then(imgResponse => {
            if(imgResponse.success){
                const imgUrl = imgResponse.data.display_url;

               const {name,price,category, recipe} = data;

               const newMenuItem = {
                 name,
                 price: parseFloat(price),
                 category,
                 recipe,
                 image: imgUrl,
               };

               axios.post('/menu', newMenuItem)
               .then((data) => {
                if (data.data.insertedId) {
                  reset();
                  console.log(data);
                  Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Successfully added your product item",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
               })
            }
        })
    }
  return (
    <div className="mb-8">
      <div className="my-6">
        <SectionTitle heading={"Add an item"} subheading={'What"s new'} />
      </div>

      <form
        className="max-w-xl w-full mx-auto space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Recipe Name</span>
          </label>
          <input
            type="text"
            placeholder="Recipe name"
            className="input input-accent input-bordered w-full"
            {...register("name", { required: true })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-accent w-full max-w-xs"
              {...register("category", { required: true })}
            >
              <option disabled selected>
                Pick one
              </option>
              <option>Pizza</option>
              <option>Salad</option>
              <option>Soup</option>
              <option>Desert</option>
              <option>Desi</option>
              <option>Drinks</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-accent input-bordered w-full"
              {...register("price", { required: true })}
            />
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Recipe Details</span>
          </label>
          <textarea
            className="textarea textarea-accent w-full"
            placeholder="write here..."
            {...register("recipe", { required: true })}
          ></textarea>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Add Picture</span>
          </label>
          <input
            type="file"
            className="file-input input-accent file-input-bordered file-input-warning w-full max-w-xs"
            {...register("image", { required: true })}
          />
        </div>

        <div>
          <button className="btn" type="submit">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItem