import * as XLSX from "xlsx";

const downloadTemplate = () => {
  const data = [
    {
      title: "",
      category: "",
      price: "",
      image: ""
    }
  ];

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Products");
  XLSX.writeFile(wb, "product_import_template.xlsx");
};
