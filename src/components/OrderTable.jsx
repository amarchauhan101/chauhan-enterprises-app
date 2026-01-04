'use client'
import { Calendar, Edit2, Eye, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Package } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { getOrderUser } from "@/app/action/getOrder";

function OrderTable({ order, products }) {
  console.log("order in ordertable", order);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Calculate pagination
  const totalItems = order?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = order?.slice(startIndex, endIndex) || [];
  
  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPrevPage = () => goToPage(currentPage - 1);
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    
    for (let i = Math.max(2, currentPage - delta);
         i <= Math.min(totalPages - 1, currentPage + delta);
         i++) {
      range.push(i);
    }
    
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }
    
    rangeWithDots.push(...range);
    
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }
    
    return rangeWithDots;
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-muted/50 p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-card-foreground">
              Order Management
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground mt-2">
              Track and manage all customer orders
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-lg text-primary">{totalItems}</span> Total Orders
            </div>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-background text-foreground border border-border rounded-lg text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      {totalItems === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Package className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground text-xl font-medium">No Orders Found</p>
          <p className="text-muted-foreground/70 text-sm mt-2">
            Orders will appear here once customers place them
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Customer & Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Order Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {currentItems.map((product, idx) => (
                  <tr
                    key={product._id}
                    className="hover:bg-muted/50 transition-all duration-200 group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {product.items.slice(0, 3).map((p, index) => (
                            <div key={index} className="relative">
                              <img
                                className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-sm"
                                src={p.image}
                                alt={p.title}
                              />
                            </div>
                          ))}
                          {product.items.length > 3 && (
                            <div className="w-12 h-12 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs font-medium text-muted-foreground">
                                +{product.items.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-card-foreground">
                            {product.userId ? product.userId.username : 'Unknown User'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {product.userId ? product.userId.email : 'No email'}
                          </div>
                          <div className="text-xs text-muted-foreground/70 mt-1">
                            ID: #{product._id.toString().slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        {product.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            <div className="font-medium text-card-foreground truncate max-w-xs">{item.title}</div>
                            <div className="text-muted-foreground">Qty: {item.quantity} × ₹{item.price}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-lg font-bold text-card-foreground">
                        ₹{product.TotalAmount?.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {product.items.length} item{product.items.length > 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        product.orderStatus === 'delivered' ? 'bg-green-100 text-green-700 border border-green-200' :
                        product.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        product.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                        'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          product.orderStatus === 'delivered' ? 'bg-green-500' :
                          product.orderStatus === 'shipped' ? 'bg-blue-500' :
                          product.orderStatus === 'processing' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }`}></div>
                        {product.orderStatus.charAt(0).toUpperCase() + product.orderStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        product.paymentStatus === 'paid' ? 'bg-green-100 text-green-700 border border-green-200' :
                        product.paymentStatus === 'failed' ? 'bg-red-100 text-red-700 border border-red-200' :
                        'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          product.paymentStatus === 'paid' ? 'bg-green-500' :
                          product.paymentStatus === 'failed' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}></div>
                        {product.paymentStatus.charAt(0).toUpperCase() + product.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center text-sm text-card-foreground">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        <div>
                          <div>{new Date(product.createdAt).toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(product.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
                          title="View Order"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600 transition-all duration-200"
                          title="Edit Order"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {currentItems.map((product) => (
              <div key={product._id} className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-4">
                  {/* Customer Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex -space-x-2">
                      {product.items.slice(0, 2).map((p, index) => (
                        <img
                          key={index}
                          className="w-10 h-10 rounded-full object-cover border-2 border-background"
                          src={p.image}
                          alt={p.title}
                        />
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-card-foreground">
                        {product.userId ? product.userId.username : 'Unknown User'}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        #{product._id.toString().slice(-8)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-card-foreground">₹{product.TotalAmount?.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-card-foreground mb-2">Items ({product.items.length})</div>
                    <div className="space-y-1">
                      {product.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-card-foreground truncate flex-1 mr-2">{item.title}</span>
                          <span className="text-muted-foreground whitespace-nowrap">
                            {item.quantity} × ₹{item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Row */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      product.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                      product.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      product.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {product.orderStatus.charAt(0).toUpperCase() + product.orderStatus.slice(1)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      product.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                      product.paymentStatus === 'failed' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {product.paymentStatus.charAt(0).toUpperCase() + product.paymentStatus.slice(1)}
                    </span>
                  </div>

                  {/* Date and Actions */}
                  <div className="flex justify-between items-center pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-muted/30 px-6 py-4 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, totalItems)}</span> of{' '}
                  <span className="font-medium">{totalItems}</span> orders
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="disabled:opacity-50"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map((pageNum, index) => (
                      <React.Fragment key={index}>
                        {pageNum === '...' ? (
                          <span className="px-3 py-1 text-muted-foreground">...</span>
                        ) : (
                          <Button
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(pageNum)}
                            className={currentPage === pageNum ? "bg-blue-600 text-white" : ""}
                          >
                            {pageNum}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="disabled:opacity-50"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OrderTable;
