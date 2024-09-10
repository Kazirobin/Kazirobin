import React from 'react'

const Visit = ({dflag,index}) => {
    console.log(dflag)
    const {region,capital} = dflag
    return (
      <div>Country No {index}
        <h4>name: </h4>
        <h4>region: {region}</h4>
        <h4>capital: {capital}</h4>
      </div>
    )
}

export default Visit