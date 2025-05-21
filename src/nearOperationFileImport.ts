// The un-exported methods are copied from the `near-operation-file-preset` package.
// In the future, we might choose to use the package directly, but the methods aren't directly exposed.
import { parse as parsePath, join } from "path";
import type { Config, NearOperationFilePresetConfig } from "./types";

export function generateNearOperationFileImport(config: Config, location: string | undefined) {
  validate(config, location);

  // Defaults from
  // https://github.com/dotansimha/graphql-code-generator-community/blob/152d2ddbd9a7b86d1f75ab7d86dfaacff5caa2be/packages/presets/near-operation-file/src/index.ts#L220-L222
  const { fileName = "", extension = ".generated.ts", folder = "" } = config.nearOperationFilePresetConfig;

  const absoluteFilePath = generateFilePath({ fileName, extension, folder }, location!);

  // Strip `cwd`
  const relativeFilePath = absoluteFilePath.replace(process.cwd(), "");

  // Strip extension if we're emitting legacy CommonJS imports
  if (config.emitLegacyCommonJSImports) {
    const parts = relativeFilePath.split(".");
    return parts.slice(0, -1).join(".");
  }

  return relativeFilePath;
}

function validate(
  config: Config,
  location: string | undefined,
): asserts config is Config & { nearOperationFilePresetConfig: Required<NearOperationFilePresetConfig> } {
  if (!config.nearOperationFilePresetConfig) {
    throw new Error("nearOperationFilePresetConfig is required when calling generateNearOperationFileImport()");
  }
  if (!location) {
    throw new Error("location is required when calling generateNearOperationFileImport()");
  }
}

// https://github.com/dotansimha/graphql-code-generator-community/blob/152d2ddbd9a7b86d1f75ab7d86dfaacff5caa2be/packages/presets/near-operation-file/src/index.ts#L247-L251
function generateFilePath(
  { fileName, extension, folder }: Required<Pick<NearOperationFilePresetConfig, "fileName" | "extension" | "folder">>,
  location: string,
) {
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
