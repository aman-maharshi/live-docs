"use client";

import { ReactNode } from "react"
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react/suspense"
import { getClerkUsers } from "@/lib/actions/user.actions";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds })
        return users
      }}
    >
      <ClientSideSuspense fallback={<div className='h-screen w-full flex items-center justify-center'>Loading…</div>}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider