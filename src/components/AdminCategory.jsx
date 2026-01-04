'use client'
import React, { useState } from 'react'
import ProductsHeaders from './ProductsHeaders'
import TopCategoryHeader from './TopCategoryHeader';
import BottomCategoryHeader from './BottomCategoryHeader';
import CategoryShowTable from './CategoryShowTable';

function AdminCategory({products}) {
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category,setCategory] = useState("All");
  const [isUpdatedModalOpen,setIsUpdatedModalOpen] = useState(false);
  const [search,setSearch] = useState("");
  console.log("category",products.products);
  return (
    <div>
     <TopCategoryHeader isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} categories={categories} setCategories={setCategories} />
     <BottomCategoryHeader categories={categories} search={search} setSearch={setSearch} setCategories={setCategories} subCategories={subCategories} setSubCategories={setSubCategories} category={category} setCategory={setCategory} />
     <CategoryShowTable categories={categories} search={search} setSearch={setSearch} setCategories={setCategories} subCategories={subCategories} setSubCategories={setSubCategories} category={category} setCategory={setCategory} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isUpdatedModalOpen={isUpdatedModalOpen} setIsUpdatedModalOpen={setIsUpdatedModalOpen} />
    </div>
  )
}

export default AdminCategory