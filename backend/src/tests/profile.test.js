import { handleProfileUpdate } from "../handlers/profileHandler";

describe('Test Profile Handlers', () => {
  test('Test profile update - valid', () => {
    const req = {
      body: {
        userID: 'john.doe@example.com',
        profileData: {
          name: 'John Doe',
          mainAddress: '123 City St.',
          auxAddress: '456 Town Rd.',
          city: 'Houston',
          state: 'TX',
          zipcode: '12345',
        }
      }
    }
    const res = {
      data: {},
      code: 0,

      status: function(status) {
        this.code = status
      },
      send: function(input) {
        this.data = input
      }
    }

    handleProfileUpdate(req, res)

    expect(res.data.message).toEqual('Profile updated successfully')
  })

  test('Test profile update - invalid', () => {
    const req = {
      body: {
        profileData: {
          name: 'John Doe',
          mainAddress: '123 City St.',
          auxAddress: '456 Town Rd.',
          city: 'Houston',
          state: 'TX',
          zipcode: '12345',
        }
      }
    }
    const res = {
      data: {},
      code: 0,

      status: function(status) {
        this.code = status
      },
      send: function(input) {
        this.data = input
      }
    }

    handleProfileUpdate(req, res)

    expect(res.data.message).toEqual('Profile updated successfully')
  })
})