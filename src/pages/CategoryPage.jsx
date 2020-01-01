import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import Table from '../components/Table'
import { TextField } from '../components/inputs'
import { Button } from '../components/buttons'
import Panel from '../components/Panel'
import { IoIosCreate, IoIosTrash } from 'react-icons/io'
import CategoryForm from '../components/forms/CategoryForm'

const CategoryPage = () => {
  const [tableData, setTableData] = useState({ meta: {}, data: [] })
  const [isLoading, setIsLoading] = useState(false)

  const [isAdd, setIsAdd] = useState(false)

  const columns = [
    { 
      key: 'name', 
      label: 'Name',
      render: (item) => (item.name)
    },
    { 
      key: 'created_at', 
      label: 'Created at',
      render: ({ created_at }) => ('render', created_at.seconds)
    },
    { 
      key: 'options', 
      label: 'Options',
      render: (item) => (<div className='flex items-center'>
        <button className='p-1 text-gray-400 hover:text-yellow-400' onClick={() => console.log(item)}><IoIosCreate size={22}/></button>
        <button className='p-1 text-gray-400 hover:text-red-400' onClick={() => console.log(item)}><IoIosTrash size={22}/></button>
      </div>)
    },
  ]

  useEffect(() => {
    onLoadPage()
  }, [])

  async function onLoadPage() {
    const data = []

    setIsLoading(true)
    const docs = await db.collection('categories').get()
    
    docs.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    const newTableData = {
      meta: { count: data.length },
      data
    }

    if (newTableData) setIsLoading(false)
    setTableData({...newTableData})
  }

  async function onCommitAdd(values) {
    setIsLoading(true)
    const saved = await db.collection("categories").add({
      ...values,
      created_at: Date.now()
    })

    if (saved) {
      setIsAdd(false)
      setIsLoading(false)
      onLoadPage()
    }
  }


  return (<div>
    <Panel title='Category' size='small' isOpen={isAdd} onClose={() => setIsAdd(false)}>
      <CategoryForm
        onSubmit={onCommitAdd}
        onCancel={() => setIsAdd(false)} />
    </Panel>
    <div className='flex items-center bg-white py-4 px-6 shadow mb-6 rounded'>
      <h1 className='text-2xl font-medium text-gray-600'>Category</h1>
      <span className='ml-auto'>December 17 2019</span>
    </div>
  
  
    <div className='bg-white py-4 px-6 shadow mb-8 rounded'>

      <div className='mb-6 flex'>
        <div>
          <Button color='primary' icon='add' size='small' onClick={() => setIsAdd(true)}>Add Category</Button>
        </div>
        <div className='w-64 ml-auto'>
          <TextField noMargin size='small' placeholder='Find category'/>
        </div>
      </div>

      <Table
        tableData={tableData}
        columns={columns}
        loading={isLoading}
      />
    </div>
  </div>)
}

export default CategoryPage