import BlogDetailComponent from '@/Component/BlogDetail/BlogDetail'
import { BlogDetailAPI } from '@/Constants/Api/Api';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

export default function BlogDetail({ data }) {
  // const router = useRouter()
  // const { id } = router.query
  // console.log(id, "router")
  // useEffect(() => {
  //   BlogDetailAPI(1).then((res) => {
  //     console.log(res)
  //   }).catch((e) => {
  //     console.log(e)
  //   })
  // })
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  // }, [])


  return (
    <div>
      <BlogDetailComponent data={data}/>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;


  const response = await BlogDetailAPI(1);
  console.log(response,"hello")
  const data = response;

  return {
    props: {
      data,
    },
  };
}


