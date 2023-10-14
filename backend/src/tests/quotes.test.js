import { handleNewQuote, handleGetHistory } from "../handlers/quotesHandler";

describe("Test Quotes Handler", () => {
  test("Test Get Quote History - empty", () => {
    const req = {};
    const res = {
      data: {},
      code: 0,

      status: function (status) {
        this.code = status;
      },
      send: function (input) {
        this.data = input;
      },
    };

    handleGetHistory(req, res);

    expect(res.data).toEqual([]);
  });

  test("Test New Quote - valid", () => {
    const req = {
      body: {
        userID: 1,
        requestData: {
          amount: 10,
          unitPrice: 1,
          deliveryDate: "2023-01-01",
          mainAddress: "123 City St.",
        },
      },
    };
    const res = {
      data: {},
      code: 0,

      status: function (status) {
        this.code = status;
      },
      send: function (input) {
        this.data = input;
      },
    };

    handleNewQuote(req, res);

    expect(res.data.message).toEqual("New fuel data stored");
  });

  test("Test New Quote - no user id", () => {
    const req = {
      body: {
        requestData: {},
      },
    };
    const res = {
      data: {},
      code: 0,

      status: function (status) {
        this.code = status;
      },
      send: function (input) {
        this.data = input;
      },
    };

    handleNewQuote(req, res);

    expect(res.data.error).toEqual("User ID not provided in the request.");
  });

  test("Test New Quote - no body", () => {
    const req = {};
    const res = {
      data: {},
      code: 0,

      status: function (status) {
        this.code = status;
      },
      send: function (input) {
        this.data = input;
      },
    };

    handleNewQuote(req, res);

    expect(res.data.error).toEqual("Internal server error");
  });

  test("Test Get Quote History - empty", () => {
    const req = {};
    const res = {
      data: {},
      code: 0,

      status: function (status) {
        this.code = status;
      },
      send: function (input) {
        this.data = input;
      },
    };

    handleGetHistory(req, res);

    const quotes = [
      {
        userID: 1,
        amount: 10,
        unitPrice: 1,
        deliveryDate: "2023-01-01",
        mainAddress: "123 City St.",
      },
    ];

    expect(res.data).toEqual(quotes);
  });
});
