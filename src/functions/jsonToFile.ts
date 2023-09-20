export const jsonToFile = async (fileName: string, object: object) => {
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(object, null, 2)], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};
