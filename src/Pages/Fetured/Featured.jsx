import React from 'react'
import SectionTitle from '../../Components/SectionTitle/SectionTitle'
import img from '../../assets/home/featured.jpg'

const Featured = () => {
  return (
    <div className="my-10 space-y-8 featured py-8 text-white bg-fixed bg-center ">
      <SectionTitle heading={"Featured"} subheading={"check it out"} />

      <div className='md:flex justify-items-center gap-6 px-36 pt-8'>
        <div>
          <img src={img} alt="" />
        </div>
        
        <div>
          <p>Aug 29, 2023</p>
          <p>Where can i get some?</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil accusamus quisquam possimus libero aspernatur necessitatibus et fugiat in recusandae, rerum consequatur odio voluptates delectus deleniti sapiente, distinctio natus dolorem vel ducimus non dolores quidem? Aut optio repellat eius aperiam? Ullam!</p>

          <button className='btn btn-outline border-0 border-b-2'>order now</button>
        </div>
      </div>
    </div>
  );
}

export default Featured