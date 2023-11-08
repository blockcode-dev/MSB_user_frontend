import Blogs from '@/Component/Blogs/Blogs'
import React from 'react'

const index = () => {
  return (
    <div>
      <Blogs/>
    </div>
  )
}

export async function getServerSideProps() {
  // Here you can fetch data or perform any server-side logic
  const message = "Hello from Server-Side Rendering!";
console.log("hello")
  // Return the data as props
  return {
    props: {
      message,
    }
  };
}

export default index
