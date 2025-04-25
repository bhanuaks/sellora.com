import React from 'react'

function page({params}) {
  return (
    <div className='main-content'>{params.filepath}</div>
  )
}

export default page