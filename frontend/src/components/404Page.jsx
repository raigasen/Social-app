import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound () {
  return (
    <div>
      OOPs that page is not found
      <Link to='/'>Click here to go to home page</Link>
    </div>
  )
}

export default PageNotFound
