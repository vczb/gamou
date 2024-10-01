export function slugify(str: string): string {
  const map: { [key: string]: string } = {
    ä: "a",
    ö: "o",
    ü: "u",
    ß: "ss",
    ç: "c",
    é: "e",
    è: "e",
    ê: "e",
    à: "a",
    á: "a",
    ã: "a",
    â: "a",
    í: "i",
    ì: "i",
    î: "i",
    ó: "o",
    ò: "o",
    õ: "o",
    ô: "o",
    ñ: "n",
    ú: "u",
    ù: "u",
    û: "u",
    ý: "y",
    ÿ: "y",
    š: "s",
    ž: "z",
  };

  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[äöüßçéèêàáãâíìîóòõôñúùûýÿšž]/g, (match) => map[match] || "") // Replace mapped special characters
    .normalize("NFD") // Normalize the string to decompose any remaining special characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics (accents)
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except alphanumeric, space, and hyphen
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove consecutive hyphens
}
