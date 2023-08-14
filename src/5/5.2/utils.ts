export const isElement = (
  value: Element | null | undefined
): value is Element => typeof value === "object" && value !== null;
