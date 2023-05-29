import { User } from './user.model'

export const findLastUserId = async () => {
  const last_user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      created: -1,
    })
    .lean()
  return last_user?.id
}

export const generateUserId = async () => {
  const current_id = (await findLastUserId()) || (0).toString().padStart(5, '0')
  return current_id
}
