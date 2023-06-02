
const SectionTitle = ({heading, subheading}) => {
  return (
    <div className='mx-auto text-center md:w-4/12'>
      <p className="text-yellow-500 mb-3">---{subheading}---</p>
      <h1 className="text-4xl uppercase font-medium border-y-4 py-2 ">{heading}</h1>
    </div>
  )
}

export default SectionTitle