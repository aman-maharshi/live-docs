'use client'

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { createDocument } from '@/lib/actions/room.actions'
import { useRouter } from 'next/navigation'

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter()

  const handleButtonClick = async () => { 
    try {
      const room = await createDocument({ userId, email })
      if (room) {
        router.push(`/documents/${room.id}`)
      }

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <Button
      type='submit'
      className='gradient-blue flex gap-1 shadow-md'
      onClick={handleButtonClick}
    >
      <Image
        src='/assets/icons/add.svg'
        alt='add'
        height={24}
        width={24}
      />
      <p className='hidden sm:block'>Start a blank document</p>
    </Button>
  )
}

export default AddDocumentBtn