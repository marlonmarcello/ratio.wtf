export const classnames = (namesArray) =>
  namesArray
    .filter((v) => v != "")
    .join(" ")
    .trim();

export const gcd = (a, b) => {
  return b == 0 ? a : gcd(b, a % b);
};

export const gcdString = (a, b) => {
  const r = gcd(a, b);
  return `${a / r}:${b / r}`;
};
