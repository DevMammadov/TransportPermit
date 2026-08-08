import { FileDTO } from "@/data/dto/file.dto";

export const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

type TSearchDSO = {
  pageIndex: number;
  pageSize: number;
  [key: string]: any;
};

export const isFiltered = (searchDSO: TSearchDSO) => {
  if (searchDSO.pageIndex !== 0) {
    return false;
  }

  const filteredKeys = Object.keys(searchDSO).filter(
    (key) => key !== "pageIndex" && key !== "pageSize",
  );

  return filteredKeys.some((key) => {
    const value = searchDSO[key];
    return !!value || (Array.isArray(value) && value.length);
  });
};

export const downloadExcelFile = (file: FileDTO) => {
  // Convert Base64 to a Blob
  const byteCharacters = atob(file.fileBytes);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = file.fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
