      "use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import * as XLSX from "xlsx";
import { subCategories } from "@/data/subCategory";
import {
  Activity,
  ActivityIcon,
  Delete,
  Import,
  PencilIcon,
  Plus,
  Trash2Icon,
  Upload,
  UploadIcon,
} from "lucide-react";
import AddProduct from "./AddProduct";
import { nullable } from "zod";
import { useRouter } from "next/navigation";

function TopProductHeader({ products, bulkAction, selectId,click,setclick }) {
  console.log("products in topheader", products);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const[loading,setLoading] = useState(false);
 
  const router = useRouter();
  
  // Check if any products are selected
  const hasSelection = selectId && selectId.length > 0;
  const normalize = (text = "") =>
    text.toLowerCase().replace(/\s+/g, " ").trim();

  const findCategory = (inputCategory) => {
    if (!inputCategory) return null;

    return Object.keys(subCategories).find(
      (key) => normalize(key) === normalize(inputCategory)
    );
  };

  const findSubCategory = (category, inputSubCategory) => {
    if (!category || !inputSubCategory) return null;

    return subCategories[category]?.find(
      (key) => normalize(key) === normalize(inputSubCategory)
    );
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const handleExport = () => {
    const ExportProduct = products.products.map((product) => ({
      title: product.title,
      category: product.category,
      subCategory: product.subCategory,
      price: product.price,
      stock: product.stock,
      image: product.image,
    }));
    const workSheet = XLSX.utils.json_to_sheet(ExportProduct);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "Products");
    XLSX.writeFile(workBook, "Products.xlsx");
  };

  const handleUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (!file) return;
    const buffer = await file.arrayBuffer();
    console.log(buffer);
    const workBook = XLSX.read(buffer);
    console.log(workBook);

    const sheet = workBook.Sheets[workBook.SheetNames[0]];
    console.log(sheet);
    const row = XLSX.utils.sheet_to_json(sheet);
    console.log(row);

    const formatDocument = row.map((row) => {
      const NewCategory = findCategory(row.category);
      if (!NewCategory) {
        throw new Error(`Row ${index + 1}: Invalid category`);
      }
      const NewSubCategory = findSubCategory(NewCategory, row.subCategory);
      if (!NewSubCategory) {
        throw new Error(
          `Row ${index + 1}: Invalid subcategory for ${NewCategory}`
        );
      }
      return {
        title: row.title?.trim(),
        category: NewCategory,
        subCategory: NewSubCategory,
        price: Number(row.price),
        stock: Number(row.stock),
        image: row.image?.trim(),
      };
    });
    console.log(formatDocument);

    try {
      setLoading(true);
      const res = await fetch("/api/products/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: formatDocument }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      if (data.success) {
        alert(`Successfully imported ${data.inserted || formatDocument.length} products!`);
        router.refresh();
      } else {
        alert(`Import failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    }
    setLoading(false);
  };
  return (
    <div className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-card-foreground">Products</h1>
            <Button 
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 h-10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center justify-center gap-2 h-12 px-4 bg-muted hover:bg-muted/80 text-muted-foreground border border-border rounded-lg cursor-pointer transition-colors">
              <Import className="w-4 h-4" />
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleUpload}
                className="hidden"
              />
              <span className="font-medium">{loading ? "Importing..." : "Import"}</span>
            </label>
            
            <Button
              onClick={handleExport}
              variant="outline"
              className="h-12 border-border hover:bg-muted text-muted-foreground font-medium"
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setclick(!click)}
              variant="outline"
              className="flex-1 h-12 border-border hover:bg-muted text-muted-foreground font-medium"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              Bulk ({selectId?.length || 0})
            </Button>
            
            <Button
              onClick={hasSelection ? bulkAction : undefined}
              disabled={!hasSelection}
              className={`h-12 px-6 font-medium transition-all duration-200 ${
                click && hasSelection 
                  ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              <Trash2Icon className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-card-foreground">Product Management</h1>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center gap-2 h-11 px-4 bg-muted hover:bg-muted/80 text-muted-foreground border border-border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md">
                <Import className="w-4 h-4" />
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleUpload}
                  className="hidden"
                />
                <span className="font-medium">Import</span>
              </label>
              
              <Button
                onClick={handleExport}
                variant="outline"
                className="h-11 px-4 border-border hover:bg-muted text-muted-foreground font-medium hover:shadow-md transition-all duration-200"
              >
                <UploadIcon className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setclick(!click)}
              variant="outline"
              className="h-11 px-4 border-border hover:bg-muted text-muted-foreground font-medium hover:shadow-md transition-all duration-200"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              Bulk Actions ({selectId?.length || 0} selected)
            </Button>
            
            <Button
              onClick={hasSelection ? bulkAction : undefined}
              disabled={!hasSelection}
              className={`h-11 px-4 font-medium transition-all duration-200 hover:shadow-md ${
                click && hasSelection 
                  ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              <Trash2Icon className="w-4 h-4 mr-2" />
              Delete Selected
            </Button>
            
            <Button 
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium hover:shadow-md transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-card rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border">
            <AddProduct
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TopProductHeader;
