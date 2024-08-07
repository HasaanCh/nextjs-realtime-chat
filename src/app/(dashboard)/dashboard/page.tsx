import { getFriendsByUserId } from '@/helpers/get-friends-by-user-id'
import { fetch_api } from '@/helpers/api_nilchat'
import { authOptions } from '@/lib/auth'
import { chatHrefConstructor } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const page = async ({}) => {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const blockchainUser = await fetch_api('get',[], `accounts/${session.user.email}`);
  // console.log(blockchainUser);

  const friends = await fetch_api('get',[], `accounts/ayoub@gmail.com/chats`);
  // console.log(friends);
  // const friendsWithLastMessage = await Promise.all(
  //   friends.map(async (friend) => {
  //     const [lastMessageRaw] = (await fetch_api(
  //       'zrange',
  //       `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
  //       -1,
  //       -1
  //     )) as string[]

  //     const lastMessage = JSON.parse(lastMessageRaw) as Message

  //     return {
  //       ...friend,
  //       lastMessage,
  //     }
  //   })
  // )

  return (
    <div className='container py-12'>
      <h1 className='font-bold text-5xl mb-8'>Your Profile Details</h1>
      <p><strong>Name: </strong>{session.user.name}</p>
      <p><strong>Email: </strong>{session.user.email}</p>
    </div>
  )
}

export default page
