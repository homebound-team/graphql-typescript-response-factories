// These methods are copied from the `near-operation-file-preset` package.
// In the future, we might choose to use the package directly, but the methods aren't directly exposed.
import { parse as parsePath, join } from "path";
import type { NearOperationFilePresetConfig } from "./types";

// https://github.com/dotansimha/graphql-code-generator-community/blob/152d2ddbd9a7b86d1f75ab7d86dfaacff5caa2be/packages/presets/near-operation-file/src/index.ts#L247-L251
export function generateFilePath(config: NearOperationFilePresetConfig, location: string) {
  // Defaults from
  // https://github.com/dotansimha/graphql-code-generator-community/blob/152d2ddbd9a7b86d1f75ab7d86dfaacff5caa2be/packages/presets/near-operation-file/src/index.ts#L220-L222
  const { fileName = "", extension = ".generated.ts", folder = "" } = config;
  const newFilePath = defineFilepathSubfolder(location, folder);

  return appendFileNameToFilePath(newFilePath, fileName, extension);
}

// https://github.com/dotansimha/graphql-code-generator-community/blob/152d2ddbd9a7b86d1f75ab7d86dfaacff5caa2be/packages/presets/near-operation-file/src/utils.ts#L7-L10
function defineFilepathSubfolder(baseFilePath: string, folder: string) {
  const parsedPath = parsePath(baseFilePath);
  return join(parsedPath.dir, folder, parsedPath.base).replace(/\\/g, "/");
}

// https://github.com/dotansimha/graphql-code-generator-community/blob/152d2ddbd9a7b86d1f75ab7d86dfaacff5caa2be/packages/presets/near-operation-file/src/utils.ts#L12-L21
function appendFileNameToFilePath(baseFilePath: string, fileName: string, extension: string) {
  const parsedPath = parsePath(baseFilePath);
  const name = fileName || parsedPath.name;

  return join(parsedPath.dir, name + extension).replace(/\\/g, "/");
}
