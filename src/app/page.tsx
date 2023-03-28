'use client'

import { useEffect, useState } from 'react'

interface DataList {
  name: string,
  price: number,
}

export default function Home() {
  const [data, setData] = useState<DataList[]>([])

  const saveData = (value: any) => {
    value.preventDefault()
    setData((old): DataList[] => {
      const temp = [...old]
      const newData: DataList = {
        name: value.target.name.value,
        price: value.target.price.value,
      }
      temp.push(newData)
      return temp;
    })
  }

  const remove = (id: number) => {
    setData((old): DataList[] => {
      const temp = [...old]
      temp.splice(id, 1);
      return temp;
    })
  }

  const getData = () => {
    const res = localStorage.getItem('to-do-list-data');
    if (res) {
      const arr = JSON.parse(res)
      setData(arr)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    localStorage.setItem('to-do-list-data', JSON.stringify(data));
  }, [data])

  return (
    <div className='p-2 md:p-4 xl:p-8 lg:p-10'>

      <div className='text-lg font-semibold text-gray-300 mb-4'>
        <div>Todo List</div>
      </div>

      <form onSubmit={saveData} className='flex flex-col md:flex-row items-center gap-2'>
        <div className="w-full mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className='flex justify-end w-full md:w-[300px] lg:w-[250px] mb-4 md:mb-0'>
          <button type="submit" className="text-white h-[40px] w-full md:w-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> New Item</button>
        </div>

      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((v, i) => {
                return <tr key={i} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {v.name}
                  </th>
                  <td className="w-[150px] px-6 py-4">
                    {v.price}
                  </td>
                  <td className="w-[50px] px-6 py-4">
                    <div onClick={() => remove(i)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Delete</div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>





    </div>
  )
}
