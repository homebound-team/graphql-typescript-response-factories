// The un-exported methods are copied from the `near-operation-file-preset` package.
// In the future, we might choose to use the package directly, but the methods aren't directly exposed.
import { parse as parsePath, join, relative } from "path";
import type { NearOperationFilePresetConfig } from "./types";

export type NearOperationFileConfigWithDefaults = Required<
  Pick<NearOperationFilePresetConfig, "fileName" | "extension" | "folder">
>;

export function generateNearOperationFileImport(
  nearOpFilePreset: NearOperationFileConfigWithDefaults,
  location: string,
  {
    emitLegacyCommonJSImports,
    cwd,
    outputFile,
  }: { emitLegacyCommonJSImports: boolean; cwd: string; outputFile: string },
) {
  const { fileName, extension, folder } = nearOpFilePreset;
  const absoluteFilePath = generateFilePath({ fileName, extension, folder }, location);

  // Get the directory of outputFile relative to cwd
  const outputFileDir = parsePath(join(cwd, outputFile)).dir;

  // Calculate relative path from outputFile's directory to the source file
  const relativeFilePath = relative(outputFileDir, absoluteFilePath);

  // Strip extension if we're emitting legacy CommonJS imports
  if (emitLegacyCommonJSImports) {
    const parts = relativeFilePath.split(".");
    return parts.slice(0, -1).join(".");
  }

  return relativeFilePath;
}

// https://github.com/dotansimha/graphql-code-generator-community/blob/152d2ddbd9a7b86d1f75ab7d86dfaacff5caa2be/packages/presets/near-operation-file/src/index.ts#L247-L251
function generateFilePath({ fileName, extension, folder }: NearOperationFileConfigWithDefaults, location: string) {
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
