import * as SingleFile from "./singleFile/graphql-types.generated";
import * as SeparateFactoryFile from "./separateFactoryFile/graphql-factories.generated";
import * as NearOperationFile from "./nearOperationFile/graphql-factories.generated";

type TestType = "singleFile" | "separateFactoryFile" | "nearOperationFile";

interface TestObject {
  newSaveAuthorResponse: (variables: any, data: any) => any;
  newGetAuthorSummariesResponse: (data: any) => any;
  newCurrentAuthorResponse: (data: any) => any;
  newAuthorSummary: () => any;
}

const getTestObjects = (testType: TestType): TestObject => {
  if (testType === "singleFile") {
    return SingleFile;
  } else if (testType === "separateFactoryFile") {
    return SeparateFactoryFile;
  } else if (testType === "nearOperationFile") {
    return NearOperationFile;
  } else {
    throw `Unsupported test type parameter provided: ${testType}`;
  }
};

const testLabels: { [key in TestType]: string } = {
  singleFile: "Types and factories in a single file",
  separateFactoryFile: "Types and factories in separate files",
  nearOperationFile: "Types and factories in separate files, queries using 'near-operation-file' preset",
};

function getTests(testType: TestType) {
  const testLabel = testLabels[testType];

  const runReferenceTests = ({
    newSaveAuthorResponse,
    newGetAuthorSummariesResponse,
    newCurrentAuthorResponse,
    newAuthorSummary,
  }: TestObject) => {
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
  };

  return describe(testLabel, () => {
    runReferenceTests(getTestObjects(testType));
  });
}

describe("factories", () => {
  getTests("singleFile");
  getTests("separateFactoryFile");
  getTests("nearOperationFile");
});
