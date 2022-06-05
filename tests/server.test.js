const request = require("supertest");
const server = require("../server");

// Test different routes both successful and error request

describe("Testing different routes", () => {
  it("GET /api/ping ", () => {
    return request(server)
      .get("/api/ping")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: expect.any(Boolean),
          })
        );
      });
  });

  it("GET /api/post", () => {
    return request(server)
      .get("/api/posts?tag=random_check")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("posts");
      });
  });
});

describe("Testing different variations of /api/post", () => {
  it("making GET call /api/posts without tag param", () => {
    return request(server)
      .get("/api/posts")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      });
  });

  it("making GET call with invalid sortBy param", () => {
    return request(server)
      .get("/api/posts?tag=tech&sortBy=invalidParam")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      });
  });

  it("making GET call with invalid direction param should return 400 and error message", () => {
    return request(server)
      .get("/api/posts?tag=tech&direction=invalidParam")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      });
  });

  it("making GET call with multiple tag params should return blogpost in post array", () => {
    return request(server)
      .get("/api/posts?tag=tech,design")
      .expect(200)
      .then((response) => {
        // check response return an array named posts
        expect(response.body).toHaveProperty("posts");

        // check the response array should not be empty
        expect(response.body.posts.length).not.toBe(0);
      });
  });

  it("Ensure post array contains correct", () => {
    return request(server)
      .get("/api/posts?tag=tech,design")
      .expect(200)
      .then((response) => {
        expect(response.body.posts[0]).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            id:expect.any(Number),
            reads:expect.any(Number),
            tags:expect.any(Array),
            likes:expect.any(Number)
            
          })
        );
        
      });
  });
});
