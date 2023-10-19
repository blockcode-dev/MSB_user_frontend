import BlogDetailComponent from '@/Component/BlogDetail/BlogDetail'
import React, { useEffect } from 'react'

const BlogDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });},[])
  return (
    <div>
      <BlogDetailComponent/>
    </div>
  )
}

export default BlogDetail
