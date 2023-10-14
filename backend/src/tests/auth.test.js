import {
  handleLogin,
  handleLogout,
  handleStatus,
} from "../handlers/authHandler";

describe('Test Auth Handlers', () => {
  test('Test login - valid creds', () => {
    const req = {
      body: {
        email: 'john.doe@example.com',
        password: 'password123'
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

    handleLogin(req, res)

    expect(res.data.message).toEqual('Login successful')
  })

  test('Test login - invalid password', () => {
    const req = {
      body: {
        email: 'john.doe@example.com',
        password: 'pa'
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

    handleLogin(req, res)

    expect(res.data.message).toEqual('Invalid email or password')
  })

  test('Test login - invalid email', () => {
    const req = {
      body: {
        email: 'joe.doe@example.com',
        password: 'password123'
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

    handleLogin(req, res)

    expect(res.data.message).toEqual('Invalid email or password')
  })

  test('Test status - logged in', () => {
    const req = {
      user: 'john.doe@example.com'
    }
    const res = {
      user: {},
      code: 0,

      status: function(status) {
        this.code = status
      },
      send: function(input) {
        this.user = input
      }
    }

    handleStatus(req, res)

    let user = {
      id: 1,
      name: 'John Doe',
      password: 'password123',
    }
    // console.log(res)

    expect(res.user).toEqual(user)
  })

  test('Test status - not logged in', () => {
    const req = {
      body: {
        email: 'joe.doe@example.com',
        password: 'password123'
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

    handleStatus(req, res)

    expect(res.data.message).toEqual('User is not logged in')
  })

  test('Test logout', () => {
    const req = {
      body: {
        email: 'joe.doe@example.com',
        password: 'password123'
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

    handleLogout(req, res)

    expect(res.data.message).toEqual('Logout successful')
  })
})