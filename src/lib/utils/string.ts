export const formatWordsWithCapitalizedFirstLetter = (
  input: string
): string => {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getFileNameFromUrl = (url: string): string => {
  try {
    const pathSegment = url.split("?")[0].split("/").pop();
    if (!pathSegment) {
      throw new Error("No file name found in URL");
    }
    return decodeURIComponent(pathSegment);
  } catch (error) {
    console.error("Error extracting filename:", error);
    return "";
  }
};

export const truncateString = (
  str: string | null | undefined,
  limit: number
): string => {
  if (!str) return "";
  if (str.length <= limit) return str;
  return str.slice(0, limit) + "...";
};

export const capitalizeFirstLetter = (text: string): string => {
  try {
    let newText = text.substring(0, 1).toUpperCase();
    if (text?.length > 1) {
      newText = `${newText}${text.substring(1, text?.length).toLowerCase()}`;
    }
    return newText;
  } catch (e) {
    console.error(e);
  }
  return text;
};

export const normalizeLineSpacing = (text: string): string => {
  return text.replace(/\n{2,}/g, "\n");
};

export const snakeToCamel = (snakeCaseString: string): string => {
  return snakeCaseString.replace(/(_\w)/g, (match) => match[1].toUpperCase());
};

export default {
  formatWordsWithCapitalizedFirstLetter,
  getFileNameFromUrl,
  truncateString,
  capitalizeFirstLetter,
  normalizeLineSpacing,
  snakeToCamel,
};
