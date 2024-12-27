const request = require("supertest");
const app = require("../app");


const { Thing } = require("../models/thing");

jest.mock("../connections/thingsDatabase");
jest.mock("../models/thing");
jest.mock("../connections/usersDatabase");
jest.mock("../models/user");



describe("GET /api/stuff", () => {
  it("should return a list of things", async () => {
    
    const mockStuff = [
      {
        title: "thing1",
        description: "description1",
        imageUrl: "imageUrl1",
        userId: "userId1",
        price: 1,
      },
      {
        title: "thing2",
        description: "description2",
        imageUrl: "imageUrl2",
        userId: "userId2",
        price: 2,
      },
    ];
    Thing.find = jest.fn().mockResolvedValue(mockStuff);


    const response = await request(app).get("/api/stuff");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockStuff);
    expect(Thing.find).toHaveBeenCalled();
  });
});
