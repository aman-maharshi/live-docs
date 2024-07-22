import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import React from 'react'

const SingleDocument = () => {
  return (
    <div>
      <Header>
        <p className='text-white'>Test</p>
      </Header>
      <Editor />
    </div>
  )
}

export default SingleDocument