export const classnames = (namesArray) =>
  namesArray
    .filter((v) => v != "")
    .join(" ")
    .trim();
