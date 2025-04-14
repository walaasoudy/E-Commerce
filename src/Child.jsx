import React from 'react'

function Child(props) {
  return (
    <>
      <div className="">
        <h1>{props.item.id}</h1>
        <h2>{props.item.name}</h2>
        <p>Value: {props.item.value}</p>
        <button onClick={() => props.delete(props.item.id)}>Delete</button>

      </div>
    </>
  )
}

export default Child
