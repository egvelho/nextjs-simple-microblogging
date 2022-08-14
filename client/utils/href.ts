import pages from "shared/consts/pages.json";

declare const uniqueHref: unique symbol;

export type Href = string & {
  [uniqueHref]: true;
};

export function href(page: keyof typeof pages): Href {
  return pages[page] as Href;
}
