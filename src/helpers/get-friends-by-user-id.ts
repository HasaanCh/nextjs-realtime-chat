import { fetch_api } from './api_nilchat'

export const getFriendsByUserId = async (userId: string) => {
  // retrieve friends for current user
  console.log("userid", userId)
  const friendIds = (await fetch_api(
    'smembers',
    `user:${userId}:friends`
  )) as string[]
  console.log("friend ids", friendIds)

  const friends = await Promise.all(
    friendIds.map(async (friendId) => {
      const friend = await fetch_api('get', `user:${friendId}`) as string
      const parsedFriend = JSON.parse(friend) as User
      return parsedFriend
    })
  )

  return friends
}
