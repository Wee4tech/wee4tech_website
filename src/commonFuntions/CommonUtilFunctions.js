import { format, parseISO } from "date-fns";
import dayjs from "dayjs";
import { baseUrl } from "../commonUtils/commonUtils";

export const dateFormat = (inputDate) => {
  if (!inputDate || inputDate === "None") return "Date is Invalid";
  const parsedDate1 = parseISO(inputDate);
  const formattedDate1 = format(parsedDate1, "dd MMM yyyy, hh:mmaaa");
  return formattedDate1;
};
export const onlyDateFormat = (inputDate) => {
  //	2023-09-18T03:48:58Z use this format to convert dates
  if (!inputDate || inputDate === "None") return "Date is Invalid";
  const parsedDate1 = parseISO(inputDate);
  const formattedDate1 = format(parsedDate1, "dd MMM yyyy");
  return formattedDate1;
};

export const bytesToSize = (bytes) => {
  const kilobytes = bytes / 1024;
  if (kilobytes < 1) {
    return bytes + "b";
  } else if (kilobytes < 1024) {
    return kilobytes.toFixed(2) + "kb";
  } else {
    const megabytes = kilobytes / 1024;
    return megabytes.toFixed(2) + "mb";
  }
};

export const dateFormatDDMMM = (inputDate) => {
  if (!inputDate) return "Date is Invalid";
  const formattedDate = dayjs(inputDate).format("DD MMM");
  return formattedDate;
};

export const getNameInitials = (fullName) => {
  if (fullName === "" || !fullName) return "No Name";
  const names = fullName?.split(" ");
  const firstNameInitial = names[0] ? names[0][0]?.toUpperCase() : "";
  const lastNameInitial = names[1] ? names[1][0]?.toUpperCase() : "";
  return `${firstNameInitial}${lastNameInitial}`;
};

export const number = (value) => parseFloat(value);

export const handlePdfDownload = (pdfURL, check) => {
  const pdfUrl = `${baseUrl}${pdfURL}`;
  if (check) {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading PDF: ", error);
      });
  } else {
    window.open(pdfUrl, "_blank");
  }
};
export const handleExcelDownload = (excelURL, check) => {
  const pdfUrl = `${baseUrl}${excelURL}`;
  if (check) {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading PDF: ", error);
      });
  } else {
    window.open(pdfUrl, "_blank");
  }
};
export const handlePublicFolderDownload = (url) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  // downloadLink.download = "Pricing-Sheet-Example.xlsx";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
