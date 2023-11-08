import BlogDetailComponent from '@/Component/BlogDetail/BlogDetail'
import { BlogDetailAPI } from '@/Constants/Api/Api';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
export default function BlogDetail({ data }) {
  return (
    <div>
      <BlogDetailComponent data={data}/>
    </div>
  )
}
export async function getServerSideProps(context) {
// const storedValue = getLocalStorageItem("UserLoginToken");
// console.log(storedValue,"storedValue")
  const { query } = context;
  const { id } = query;
  const response = await BlogDetailAPI(id);
  const data = response;
  return {
    props: {
      data,
    },
  };
}
