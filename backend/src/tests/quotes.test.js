import { handleNewQuote, handleGetHistory } from "../handlers/quotesHandler"

describe('Test Quotes Handler', () => {
  test('Test Get Quote History - empty', () => {
    const req = {}
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

    handleGetHistory(req, res)
    
    expect(res.data).toEqual([])
  })

  test('Test New Quote - valid', () => {
    const req = {
      body: {
        text: 'New Fuel'
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

    handleNewQuote(req, res)
    
    expect(res.data.message).toEqual('New fuel quote created')
  })

  test('Test Get Quote History - empty', () => {
    const req = {}
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

    handleGetHistory(req, res)

    const quotes = [
      {
        text: "New Fuel"
      }
    ]
    
    expect(res.data).toEqual(quotes)
  })
}) 