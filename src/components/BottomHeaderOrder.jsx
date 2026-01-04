"use client";
import { Filter, RotateCcw, Search } from "lucide-react";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { fetchAllCategories } from "@/app/action/fetchCategory";

function BottomHeaderOrder() {
  return (
    <div className="w-full bg-muted/50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
            //   value={search}
            //   onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="pl-10 h-12 bg-background border-border focus:border-ring focus:ring-ring"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
            //   value={category}
            //   onChange={(e) => setCategory(e.target.value)}
              className="h-12 px-4 bg-background text-foreground border border-border rounded-lg focus:border-ring focus:ring-ring"
            >
              <option value="All">All Categories</option>
              {/* {categories.map((item) => (
                <option key={item._id}>{item.name}</option>
              ))} */}
            </select>

            {/* {category != "All" && subCategories.length > 0 && (
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 px-4 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-gray-700"
              >
                <option value="All">All Categories</option>
                {subCategories?.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            )} */}
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 shadow-md hover:shadow-lg">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 border-border hover:bg-muted text-muted-foreground font-medium transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
            //   value={search}
            //   onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="pl-10 h-12 bg-background border-border focus:border-ring focus:ring-ring text-lg"
            />
          </div>

          <select
            // value={category}
            // onChange={(e) => setCategory(e.target.value)}
            className="h-12 px-4 bg-background text-foreground border border-border rounded-lg focus:border-ring focus:ring-ring min-w-48"
          >
            <option value="All">All Categories</option>
            {/* {categories.map((item) => (
              <option key={item._id}>{item.name}</option>
            ))} */}
          </select>

          {/* {category != "All" && subCategories.length > 0 && (
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 px-4 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-gray-700"
            >
              <option value="All">All Categories</option>
              {subCategories?.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          )} */}

          {/* <select 
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)} 
            className="h-12 px-4 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-gray-700 min-w-44"
          >
            <option value="All">Price: All</option>
            <option value="low to high">Price: Low to High</option>
            <option value="high to low">Price: High to Low</option>
          </select> */}

          <div className="flex gap-3">
            <Button className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 shadow-md hover:shadow-lg">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            {/* <Button 
              variant="outline"
              className="h-12 px-6 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200" 
              onClick={() => {
                setFilter({
                  search: "",
                  category: "All",
                  priceFilter: "All"
                });
                setSearch("");
                setCategory("All");
                setPriceFilter("All");
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomHeaderOrder;
