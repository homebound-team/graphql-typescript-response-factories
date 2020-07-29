import {
  newAuthorSummary,
  newCurrentAuthorResponse,
  newGetAuthorSummariesResponse,
  newSaveAuthorResponse,
} from "./graphql-types";

describe("factories", () => {
  it("sets the type name for mutation results", () => {
    const { result } = newSaveAuthorResponse(
      { input: { name: "a" } },
      {
        saveAuthor: { author: { name: "a" } },
      },
    );
    expect(result.data).toMatchInlineSnapshot(`
      Object {
        "__typename": "Mutation",
        "saveAuthor": Object {
          "__typename": "SaveAuthorResult",
          "author": Object {
            "__typename": "Author",
            "birthday": null,
            "name": "a",
            "popularity": "Low",
            "summary": Object {
              "__typename": "AuthorSummary",
              "amountOfSales": null,
              "author": [Circular],
              "numberOfBooks": 0,
            },
            "working": null,
          },
        },
      }
    `);
  });

  it("sets the type name for query results", () => {
    const { result } = newGetAuthorSummariesResponse({
      authorSummaries: [newAuthorSummary()],
    });
    expect(result.data).toMatchInlineSnapshot(`
      Object {
        "__typename": "Query",
        "authorSummaries": Array [
          Object {
            "__typename": "AuthorSummary",
            "amountOfSales": null,
            "author": Object {
              "__typename": "Author",
              "birthday": null,
              "name": "name",
              "popularity": "Low",
              "summary": Object {
                "__typename": "AuthorSummary",
                "amountOfSales": null,
                "author": [Circular],
                "numberOfBooks": 0,
              },
              "working": null,
            },
            "numberOfBooks": 0,
          },
        ],
      }
    `);
  });

  it("can return null from nullable queries", () => {
    const { result } = newCurrentAuthorResponse({ currentAuthor: null });
    expect(result.data?.currentAuthor).toBeNull();
  });

  it("can return non-null from nullable queries", () => {
    const { result } = newCurrentAuthorResponse({ currentAuthor: {} });
    expect(result.data?.currentAuthor?.name).toEqual("name");
  });
});
