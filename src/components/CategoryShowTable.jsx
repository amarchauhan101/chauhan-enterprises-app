import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Eye,
  Edit2,
  Trash2,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/app/action/updateProduct";
import toast from "react-hot-toast";

function CategoryTable({
  categories,
  isModalOpen,
  setIsModalOpen,
  setCategories,
  subCategories,
  setSubCategories,
  category,
  setCategory,
  isUpdatedModalOpen,
  setIsUpdatedModalOpen,
  search,
  setSearch,
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can make this configurable
  const router = useRouter();
  // Select / Unselect single checkbox
  const handleCheckboxChange = (id) => {
    // setSelectedIds((prev) =>
    //   prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    // );
  };
  console.log("search in category", search);

  // Select / Unselect all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(categories.map((item) => item._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteCategory(id);
    console.log(res);
    if (res.success) {
      toast.success("Category deleted successfully");
      // Update local state to remove the deleted category
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
      setIsUpdated(true);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      // No need for router.refresh() here since it's already called in UpdateCategory
      setIsUpdated(false);
    }
  }, [isUpdated]);
  const handleClick = (id) => {
    console.log(id);
    setIsUpdatedModalOpen(!isUpdatedModalOpen);
    setSelectedIds(id);
  };
  console.log(isUpdatedModalOpen);
  const SearchOutput =
    search.length > 0
      ? categories.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      : category == "All"
      ? categories
      : categories.filter((item) => item.name == category);
  console.log(SearchOutput);

  // Pagination calculations
  const totalItems = SearchOutput.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = SearchOutput.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-4">
              <input
                type="checkbox"
                checked={
                  categories.length > 0 &&
                  selectedIds.length === categories.length
                }
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </th>

            <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">
              Category
            </th>

            <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">
              Sub Categories
            </th>

            <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase">
              Status
            </th>

            <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">
              Created
            </th>

            <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-card divide-y divide-border">
          {currentItems.map((category) => (
            <tr key={category._id} className="hover:bg-muted/50 transition">
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(category._id)}
                  onChange={() => handleCheckboxChange(category._id)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </td>

              <td className="px-6 py-4 text-sm font-medium text-card-foreground">
                {category.name}
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {category.subCategory?.map((sub, index) => (
                  <ul className="font-semibold text-sm" key={index}>
                    <li type="disc">{sub.trim()}</li>
                    <br />
                  </ul>
                ))}
              </td>

              <td className="px-6 py-4 text-center">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground/70" />
                  {new Date(category.createdAt).toLocaleDateString()}
                </div>
              </td>

              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleClick(category._id)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(category._id)}
                    size="sm"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-card border-t border-border">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
              {totalItems} results
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <div className="flex space-x-1">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-1 text-muted-foreground">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {isUpdatedModalOpen ? (
        <div className="fixed inset-0 z-40 backdrop-blur-2xl">
          <UpdateCategory
            selectedIds={selectedIds}
            categories={categories}
            isUpdatedModalOpen={isUpdatedModalOpen}
            setIsUpdatedModalOpen={setIsUpdatedModalOpen}
            setCategories={setCategories}
            subCategories={subCategories}
            setSubCategories={setSubCategories}
            category={category}
            setCategory={setCategory}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
        </div>
      ) : null}

      {/* Debug */}
      {/* <pre>{JSON.stringify(selectedIds, null, 2)}</pre> */}
    </div>
  );
}

export default CategoryTable;
