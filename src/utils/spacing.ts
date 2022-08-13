import layout from "src/consts/layout.json";

export function spacing(size: number) {
  return `${size * layout.spacing}px`;
}
