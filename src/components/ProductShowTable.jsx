"use client";
import React, { useActionState, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Edit2, Trash2, Eye, Badge, Calendar } from "lucide-react";
import { BulkAction, DeleteProduct } from "@/app/action/updateProduct";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UpdateSingleProduct from "./UpdateSingleProduct";

function ProductShowTable({
  products,
  selectId,
  setSelectId,
  click,
  setclick,
  search,
  setSearch,
  category,
  setCategory,
  priceFilter,
  setPriceFilter,
  filter,
  setFilter,
}) {
  const router = useRouter();
  const item_per_page = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [productId, setProductId] = useState("");
  const [state, Action, pending] = useActionState(DeleteProduct, {
    success: false,
  });

  const handleUpdate = (id) => {
    setProductId(id);
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e, id) => {
    setSelectId((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAllChange = () => {
    const currentPageIds = currentItems.map((item) => item._id);

    if (isAllProductCheck) {
      setSelectId((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectId((prev) => [
        ...prev,
        ...currentPageIds.filter((id) => !prev.includes(id)),
      ]);
    }
  };

  useEffect(() => {
    if (state?.success) {
      toast.success("Product deleted successfully");
      router.refresh();
    }
  }, [state?.success, router]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const filterProduct = useMemo(() => {
    let data = [...products.products];
    if (filter.search) {
      data = data.filter(
        (item) => item.title.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    if (filter.category && filter.category !== "All") {
      data = data.filter(
        (item) => item.category.toLowerCase().includes(filter.category.toLowerCase())
      );
    }
    if (filter.priceFilter != "All" && filter.priceFilter == "low to high") {
      data = data.sort((a, b) => a.price - b.price);
    }
    if (filter.priceFilter != "All" && filter.priceFilter == "high to low") {
      data = data.sort((a, b) => b.price - a.price);
    }
    return data;
  }, [filter, products.products]);

  const totalPages = Math.ceil(filterProduct.length / item_per_page);
  const indexOfLastItem = currentPage * item_per_page;
  const indexOfFirstItem = indexOfLastItem - item_per_page;
  const currentItems = filterProduct.slice(indexOfFirstItem, indexOfLastItem);

  const isAllProductCheck =
    currentItems.length > 0 &&
    currentItems.every((item) => selectId.includes(item._id));

  if (!products || products.products.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-sm border border-border">
        <div className="flex flex-col items-center justify-center py-16">
          <Badge className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-xl font-medium">No products found</p>
          <p className="text-muted-foreground/70 text-sm mt-2">Add some products to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-card-foreground">Products Management</h2>
            <p className="text-sm lg:text-base text-muted-foreground mt-1">Manage your product inventory and settings</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{filterProduct.length}</span> products
          </div>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="block lg:hidden">
        {currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Badge className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg font-medium">No products found</p>
            <p className="text-muted-foreground/70 text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {currentItems.map((product) => (
              <div key={product._id} className="bg-muted/30 rounded-lg p-4 border border-border hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  {click && (
                    <div className="pt-1">
                      <input
                        onChange={(e) => handleChange(e, product._id)}
                        type="checkbox"
                        checked={selectId.includes(product._id)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </div>
                  )}
                  
                  <img
                    className="w-16 h-16 rounded-lg object-cover border border-border flex-shrink-0"
                    src={product.image}
                    alt={product.title}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-card-foreground line-clamp-2 mb-1">{product.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">ID: {product._id.toString().slice(-8)}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {product.category}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {product.subCategory}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-lg font-bold text-card-foreground">{formatPrice(product.price)}</p>
                            <p className="text-xs text-muted-foreground">
                              Stock: {product?.stock} {product?.stock < 10 ? '(Low)' : ''}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                            Active
                          </span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          Created: {formatDate(product.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-2 mt-4 pt-3 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleUpdate(product._id)}
                        variant="outline"
                        size="sm"
                        className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <form action={Action} className="inline">
                        <input type="hidden" name="productId" value={product._id} />
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block overflow-x-auto">
        {currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Badge className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-xl font-medium">No products found</p>
            <p className="text-muted-foreground/70 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider ${click ? '' : 'hidden'}`}>
                  <input
                    onChange={handleAllChange}
                    checked={isAllProductCheck}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {currentItems.map((product) => (
                <tr key={product._id} className="hover:bg-muted/50 transition-colors duration-200">
                  <td className={`px-6 py-4 whitespace-nowrap ${click ? '' : 'hidden'}`}>
                    <input
                      onChange={(e) => handleChange(e, product._id)}
                      type="checkbox"
                      checked={selectId.includes(product._id)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-16 w-16 rounded-lg object-cover border border-gray-200 shadow-sm"
                          src={product.image}
                          alt={product.title}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-card-foreground truncate max-w-xs">{product.title}</div>
                        <div className="text-sm text-muted-foreground">ID: {product._id.toString().slice(-8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-card-foreground">{product.category}</div>
                    <div className="text-sm text-muted-foreground">{product.subCategory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-card-foreground">{product?.stock}</div>
                    <div className={`text-sm ${product?.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                      {product?.stock < 10 ? 'Low Stock' : 'In Stock'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-card-foreground">{formatPrice(product.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-card-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {formatDate(product.createdAt)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Updated: {formatDate(product.updatedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
                        title="View Product"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleUpdate(product._id)}
                        variant="outline"
                        size="sm"
                        className="hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600 transition-all duration-200"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <form action={Action} className="inline">
                        <input type="hidden" name="productId" value={product._id} />
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastItem, filterProduct.length)}</span> of{' '}
            <span className="font-medium">{filterProduct.length}</span> products
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                    className="w-8 h-8 p-0 text-sm"
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              
              {totalPages > 5 && (
                <>
                  <span className="px-2 text-gray-500">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 p-0 text-sm"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      
      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <UpdateSingleProduct
              productId={productId}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductShowTable;