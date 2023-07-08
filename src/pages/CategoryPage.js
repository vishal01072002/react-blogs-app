import React from 'react'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
// import Blogs from '../components/Blogs'
import { useLocation, useNavigate } from 'react-router-dom';
import Blogs from '../components/Blogs';

export const CategoryPage = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const category = location.pathname.split("/").at(-1);
  
  return (
    <div>
      <Header/>
      <div className='w-11/12 max-w-2xl mx-auto my-2'>
        <button 
        onClick={()=>navigation(-1)}
        className='px-4 py-1 rounded-md border-2 border-gray-300 mb-4'>
          BACK
        </button>

        <span className='ml-3 font-bold text-xl'>Blogs On <span className='underline'>{category}</span></span>
      </div>
        <Blogs/>
        <Pagination/>
    </div>
  )
}
