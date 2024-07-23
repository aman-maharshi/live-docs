import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const SingleDocument = () => {
  return (
    <div>
      <Header>
        <div className='flex w-fit items-center justify-center gap-4'>
          <p className='document-title'>Title</p>
  
          <Button className='bg-blue-500 flex items-center gap-2'>
            <Image src='/assets/icons/share.svg' alt='share' width={20} height={20} />
            Share
          </Button>
          
          <div className='h-10 w-10 rounded-full bg-gray-400'></div>
        </div>
      </Header>
      <Editor />
    </div>
  )
}

export default SingleDocument