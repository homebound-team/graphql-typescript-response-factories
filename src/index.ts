import { Code, code } from "ts-poet";
import { OperationDefinitionNode } from "graphql";
import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import PluginOutput = Types.PluginOutput;

/** Generates `newQueryResponse({ ... })` factory functions in our `graphql-types` codegen output. */
export const plugin: PluginFunction = async (schema, documents) => {
  const factories: Code[] = [];
  documents.forEach(d => {
    if (d.document) {
      d.document.definitions.forEach(d => {
        if (d.kind === "OperationDefinition" && d.name) {
          factories.push(newQueryFactory(d));
        }
      });
    }
  });
  const content = (await code`${factories}`.toStringWithImports()) + mockedResponse;
  return { content } as PluginOutput;
};

function newQueryFactory(def: OperationDefinitionNode): Code {
  const name = def.name?.value;
  const hasVariables = (def.variableDefinitions?.length || 0) > 0;
  const operation = `${def.operation.charAt(0).toUpperCase()}${def.operation.slice(1)}`;
  return code`
    export function new${name}Response(
      ${hasVariables ? `variables: ${name}${operation}Variables,` : ""}
      data: Omit<${name}${operation}, "__typename"> | Error
    ): MockedResponse<${name}${operation}Variables, ${name}${operation}> {
      return {
        request: { query: ${name}Document, ${hasVariables ? "variables, " : ""} },
        result: { data: data instanceof Error ? undefined : { __typename: "${operation}", ...data } },
        error: data instanceof Error ? data : undefined,
      };
    }`;
}

const mockedResponse = `
  export type MockedResponse<V, Q> = {
    request: {
      query: any;
      variables?: V;
    };
    result: {
      data?: Q;
    };
    error?: Error;
  };
`;
