const { createOneThing } = require("../stuff");

jest.mock("../../connections/thingsDatabase");
jest.mock("../../models/thing");

describe("stuffTest", () => {
  const req = {
    auth: { userId: "0101" },
    body: {
      title: "Spedri",
      description: "behi barcha",
      price: 99,
    },
    get: jest.fn((key) => `value of ${key}`),
    protocol: "http",
    file: { filename: "spedri_image.jpg" },
  };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  test("should create a thing", async () => {
    await createOneThing(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Post saved successfully!",
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });
  test("should return error", async () => {
    req.file = undefined;

    await createOneThing(req, res);
    expect(res.json).toHaveBeenCalledWith({
      error: "Please provide an image",
    });
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
