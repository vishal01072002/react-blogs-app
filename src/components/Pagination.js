import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Pagination() {
  const {page ,pageChangeHandler ,totalPage} = useContext(AppContext);

  return (
    <div className='mt-8 fixed bottom-0 bg-white border border-t-2 border-gray-300 w-full py-2'>
      <div className='w-11/12 max-w-2xl mx-auto flex justify-between items-center'>
      <div className='flex'>
      {
        page > 1 && 
        <button className='px-4 py-1 rounded-md border-2 border-gray-300 mr-3'
        onClick={()=>pageChangeHandler(page-1)}>Previous</button>
      }

      {
        page < totalPage &&
        <button className='px-4 py-1 rounded-md border-2 border-gray-300'
        onClick={()=> pageChangeHandler(page+1)}>Next</button>
      }
      </div>

      <span className='font-semibold'>{`Page ${page} of ${totalPage}`}</span>
      </div>
    </div>
  )
}
