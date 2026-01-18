"use client";
import { Loader } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

function FilterForm({ unique }) {
  const router = useRouter();
  const searchParam = useSearchParams();
  const sub = searchParam.get("sub") || "all";
  console.log("sub", sub);
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="flex justify-end items-center gap-2">
      <select
        name="sub"
        onChange={(e) => {
          startTransition(()=>{
            router.push(`?sub=${e.target.value}`,{scroll:false})
          })
        }}
        value={sub}
        className="px-4 py-2 bg-amber-200 rounded-md focus:ring-amber-400 focus:ring-2 focus:outline-none"
      >
        <option value="all" className="rounded-md">All</option>
        {unique.map((subItem) => (
          <option className="font-semibold rounded-md" key={subItem} value={subItem}>
            {subItem}
          </option>
        ))}
      </select>
      {isPending && <Loader  className="animate-spin" />}
    </div>
  );
}

export default FilterForm;
