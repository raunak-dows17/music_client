import Profile from '@/components/Layout/UserProfile/Profile';
import React from 'react'

const page = ({ params }) => {
    const id = params.id;
    
  return (
    <div><Profile /></div>
  )
}

export default page
