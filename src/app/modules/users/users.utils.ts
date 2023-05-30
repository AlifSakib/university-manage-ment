import { User } from './user.model'

export const findLastUserId = async () => {
  const last_user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return last_user?.id
}

export const generateUserId = async () => {
  const current_id = (await findLastUserId()) || (0).toString().padStart(5, '0')

  // increament by 1
  const incremented_id = (parseInt(current_id) + 1).toString().padStart(5, '0')
  return incremented_id
}
