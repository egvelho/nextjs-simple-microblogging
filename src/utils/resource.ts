import resources from "src/consts/resources.json";

declare const uniqueSrc: unique symbol;

export type Resource = string & {
  [uniqueSrc]: true;
};

export function resource(path: keyof typeof resources): Resource {
  return resources[path] as Resource;
}
