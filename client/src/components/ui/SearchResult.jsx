import React ,{useState} from 'react'

const SearchResult = ({results, isLoading}) => {
    return (
        <div className='absolute mt-2 p-2 flex flex-col gap-3 font-extralight border overflow-y-auto max-h-[30vh] bg-white  w-full'>
            <div>
            {isLoading ?(
                <div className="flex justify-center items-center ">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ):
              (results && results.length > 0 ? (
                results.map((item) => (
                  <div key={item._id} className='border-b pb-2'>
                    <h3 className='font-semibold'>{item.name}</h3>
                    </div>
                ))
              ) : (
                <p className='text-gray-600'>No results found.</p>
              ))
              }
            </div>
        </div>
    )
}

export default SearchResult
