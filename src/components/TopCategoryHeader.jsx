"use client";
import { Import, PencilIcon, Plus, Trash2Icon, UploadIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import AddCategory from "./AddCategory";

function TopCategoryHeader({
  isModalOpen,
  setIsModalOpen,
  categories,
  setCategories,
}) {
  return (
    <div className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4  sm:px-6 lg:px-8 py-4">
        {/* Mobile Layout */}
        <div className="block space-y-4 lg:hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-card-foreground">Category</h1>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 h-10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-card-foreground">
              Category Management
            </h1>
            <div className="flex items-center space-x-4">
              <label className="flex items-center gap-2 h-11 px-4 bg-muted hover:bg-muted/80 text-muted-foreground border border-border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md">
                <Import className="w-4 h-4" />
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) =>
                    console.log("Import file:", e.target.files[0])
                  }
                  className="hidden"
                />
                <span className="font-medium">Import</span>
              </label>

              <Button
                onClick={() => console.log("Export clicked")}
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
              onClick={() => console.log("Bulk actions clicked")}
              variant="outline"
              className="h-11 px-4 border-border hover:bg-muted text-muted-foreground font-medium hover:shadow-md transition-all duration-200"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              Bulk Actions (0 selected)
            </Button>

            <Button
              onClick={() => console.log("Delete clicked")}
              disabled={true}
              className="h-11 px-4 font-medium transition-all duration-200 hover:shadow-md bg-muted text-muted-foreground cursor-not-allowed"
            >
              <Trash2Icon className="w-4 h-4 mr-2" />
              Delete Selected
            </Button>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium hover:shadow-md transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Category
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <AddCategory
            setIsModalOpen={setIsModalOpen}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      ) : null}
    </div>
  );
}

export default TopCategoryHeader;
