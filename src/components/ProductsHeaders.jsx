import React from "react";
import TopProductHeader from "./TopProductHeader";
import BelowProductHeader from "./BelowProductHeader";

function ProductsHeaders({ products, bulkAction, selectId, click, setclick,search,setSearch,category,setCategory,priceFilter,setPriceFilter,filter,setFilter }) {
  return (
    <div>
      <TopProductHeader
        products={products}
        bulkAction={bulkAction}
        selectId={selectId}
        click={click}
        setclick={setclick}
      />
      <BelowProductHeader
        products={products}
        bulkAction={bulkAction}
        selectId={selectId}
        click={click}
        setclick={setclick}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        setFilter={setFilter}
        filter={filter}
      />
    </div>
  );
}

export default ProductsHeaders;
