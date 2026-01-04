"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

function FilterForm({ unique }) {
  const router = useRouter();
  const searchParam = useSearchParams();
  const sub = searchParam.get("sub") || "all";
  console.log("sub", sub);

  return (
    <div>
      <select
        name="sub"
        onChange={(e) => {
          router.push(`?sub=${e.target.value}`, { scroll: false });
        }}
        value={sub}
      >
        <option value="all">All</option>
        {unique.map((subItem) => (
          <option key={subItem} value={subItem}>
            {subItem}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterForm;
