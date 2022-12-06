import { useRouter } from 'next/router'
import React from 'react'
import { blogs } from '../../datas/blog'
import styles from './blog.module.css'

function BlogDetail() {
  const {query}=useRouter();
  let callback = v => +v.id == +query.id;
  const filtered= blogs?.filter(callback);
  console.log(filtered)

  return (
    <div className="w-full flex items-center justify-center" >
      <div className='pt-20 w-1/2'> 
        {filtered[0]?.headline}
        <img 
          src={filtered[0]?.image} 
          className="w-full h-1/2"       
        />
        <h3 className='text-5xl font-bold text-white mt-5 mb-2 '>{filtered[0].headline}</h3>
        <h4 className='text-xl text-gray-500 mb-2'>{filtered[0].date}</h4>
        <h2 className="text-md text-white mb-10">{filtered[0].content}</h2>
        
      </div>
       

    </div>
  )
}

export default BlogDetail