import React from 'react'

const MenuItem = ({menu}) => {
    const {image, name, price, recipe} = menu;


  return (
    <div className='flex'>
      <img src={image} alt="menu image" className='w-[120px] rounded-[0_200px_200px_200px] object-cover'/>
  
      <div>
        <h3 className='uppercase font-medium'>{name}------------</h3>
        <p>{recipe}</p>
      </div>
      <p className='text-yellow-500'>${price}</p>
    </div>
  )
}

export default MenuItem