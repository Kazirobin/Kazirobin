import React from 'react'

const Country = ({flag,index,handleStore}) => {
  const {name,region,capital} = flag
  return (
    <div  className='border-red-300 border-2 p-3 m-2 cursor-pointer'>Country No {index}
      <h4>name: {name.common}</h4>
      <h4>region: {region}</h4>
      <h4>capital: {capital}</h4>
      <button onClick={handleStore}>visit</button>
    </div>
  )
}

export default Country