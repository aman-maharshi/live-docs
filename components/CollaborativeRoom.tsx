"use client"

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import ActiveCollaborators from './ActiveCollaborators'
import { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { updateDocument } from '@/lib/actions/room.actions'

const CollaborativeRoom = ({ roomId, roomMetadata, users, currentUserType }: CollaborativeRoomProps) => {

  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)


  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleTitleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLoading(true)
      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle)

          if (updatedDocument) {
            setEditing(false)
          }
        }

      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setEditing(false)
      }

      updateDocument(roomId, documentTitle)
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [roomId, documentTitle])



  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div className='h-screen w-full flex items-center justify-center'>Loading…</div>}>
        <div className="collaborative-room">
          <Header>
            <div ref={containerRef} className='flex w-fit items-center justify-center gap-2'>
              {/* <Button className='bg-blue-500 flex items-center gap-2'>
                <Image src='/assets/icons/share.svg' alt='share' width={20} height={20} />
                Share
              </Button> */}

              {editing && !loading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder='Enter Title'
                  onChange={e => setDocumentTitle(e.target.value)}
                  onKeyDown={handleTitleKeyDown}
                  disabled={!editing}
                  className='document-title-input'
                />
              ) : (
                <p className='document-title'>{documentTitle}</p>
              )}


              {currentUserType === 'editor' && !editing && (
                <Image
                  src='/assets/icons/edit.svg'
                  alt='edit'
                  width={24}
                  height={24}
                  onClick={() => {
                    setEditing(true)
                    setTimeout(() => {
                      inputRef.current?.focus()
                    }, 0)
                  }}
                  className='cursor-pointer'
                />
              )}

              {currentUserType !== "editor" && !editing && (
                <p className='view-only-tag'>View only</p>
              )}

              {loading && <p className='text-sm text-gray-400'>saving...</p>}
            </div>

            <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
              <ActiveCollaborators />

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>

          <Editor
            roomId={roomId}
            currentUserType={currentUserType}
          />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom