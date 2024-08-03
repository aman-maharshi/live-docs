'use server'

import { revalidatePath } from "next/cache";
import { liveblocks } from "../liveblocks";
import { nanoid } from 'nanoid'
import { parseStringify } from "../utils";

export const createDocument = async ({userId, email}: CreateDocumentParams) => {
  const roomId = nanoid()

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled Document",
    }

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"]
    }

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:write"]
    })

    revalidatePath('/')

    return parseStringify(room)


  } catch (error) {
    console.log("Error occurred while creating a room", error)
  }
}
