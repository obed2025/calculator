export const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
};
