import { HeseyaResponse } from '../../../../interfaces/Response'
import { User } from '../../../../interfaces/User'
import { App } from '../../../../interfaces/App'
import { ServiceFactory } from '../../types/Service'
import { createTwoFactorAuthService, TwoFactorAuthService } from './twoFactorAuth'
import { UserSavedAddress } from '../../../../interfaces/Address'
import { CreateEntityRequest, DeleteEntityRequest, UpdateEntityRequest } from '../../types/Requests'
import { createDeleteRequest, createPatchRequest, createPostRequest } from '../../utils/requests'

export interface UserProfileService {
  /**
   * Fetch the logged user profile.
   * Returns the App if the token belongs to the application.
   */
  get(): Promise<User | App>

  /**
   * Change logged user password.
   */
  changePassword(payload: { currentPassword: string; newPassword: string }): Promise<true>

  saveDeliveryAddress: CreateEntityRequest<UserSavedAddress, UserSavedAddress>
  updateDeliveryAddress: UpdateEntityRequest<UserSavedAddress, UserSavedAddress>
  removeDeliveryAddress: DeleteEntityRequest

  saveInviceAddress: CreateEntityRequest<UserSavedAddress, UserSavedAddress>
  updateInviceAddress: UpdateEntityRequest<UserSavedAddress, UserSavedAddress>
  removeInviceAddress: DeleteEntityRequest

  TwoFactorAuthentication: TwoFactorAuthService
}

export const createUserProfileService: ServiceFactory<UserProfileService> = (axios) => ({
  async get() {
    const { data } = await axios.get<HeseyaResponse<User | App>>(`/auth/profile`)
    return data.data
  },

  async changePassword({ currentPassword, newPassword }) {
    await axios.patch('/users/password', {
      password: currentPassword,
      password_new: newPassword,
      password_confirmation: newPassword,
    })
    return true
  },

  saveDeliveryAddress: createPostRequest(axios, '/auth/profile/delivery-addresses'),
  updateDeliveryAddress: createPatchRequest(axios, '/auth/profile/delivery-addresses'),
  removeDeliveryAddress: createDeleteRequest(axios, '/auth/profile/delivery-addresses'),

  saveInviceAddress: createPostRequest(axios, '/auth/profile/invoice-addresses'),
  updateInviceAddress: createPatchRequest(axios, '/auth/profile/invoice-addresses'),
  removeInviceAddress: createDeleteRequest(axios, '/auth/profile/invoice-addresses'),

  TwoFactorAuthentication: createTwoFactorAuthService(axios),
})
