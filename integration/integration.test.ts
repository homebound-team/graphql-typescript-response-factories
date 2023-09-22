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
      {
        "__typename": "Mutation",
        "saveAuthor": {
          "__typename": "SaveAuthorResult",
          "author": {
            "__typename": "Author",
            "birthday": null,
            "name": "a",
            "popularity": "High",
            "summary": {
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
      {
        "__typename": "Query",
        "authorSummaries": [
          {
            "__typename": "AuthorSummary",
            "amountOfSales": null,
            "author": {
              "__typename": "Author",
              "birthday": null,
              "name": "name",
              "popularity": "High",
              "summary": [Circular],
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
