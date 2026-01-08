"use client";
import {
  ArrowBigLeft,
  ArrowBigRight,
  ArrowDown,
  DownloadIcon,
  Plus,
} from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { askQuery, getQuery } from "@/app/action/faq";
// import { success } from "zod";
import toast from "react-hot-toast";

function Faq({ enquiryRef }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isexpanded, setIsExpanded] = useState(null);
  const [state, Action, pending] = useActionState(askQuery, {
    success: false,
  });

  console.log(" data in faq ", data);

  const handleDown = (idx) => {
    setIsExpanded((prev)=>{
      return prev === idx ? null : idx;
    })
  };

  useEffect(() => {
    const getdata = async () => {
      const res = await getQuery();
      setData(res.data);
    };
    getdata();
  }, []);

  useEffect(() => {
    if (state?.success) {
      toast.success("Query sent successfully");
      setIsModalOpen(false);
    }
  }, [state]);
  return (
    <div className="faq h-fit w-full bg-black text-white">
      <div
        ref={enquiryRef}
        className="cnt h-full w-full p-20 flex flex-col gap-20"
      >
        <div className="head text-7xl font-semibold">
          <h1>FAQs</h1>
        </div>
        <div className="Faq grid grid-cols-1 gap-10">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={item._id || index}
                className="block1 border-b-2 border-gray-300"
              >
                <div  onClick={(idx) => {
                      handleDown(index);
                    }} className="flex items-center justify-between cursor-pointer py-4">
                  <h2 className="text-2xl">{item.query}</h2>
                  <ArrowDown
                    className="transition-transform"
                  />
                </div>

                {isexpanded==index && (
                  <div className="pb-4 px-4">
                    <p className="text-gray-300">
                      {item.response || "Response pending..."}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      Status:{" "}
                      <span
                        className={`${
                          item.status === "answered"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <>
              <div className="block1 flex items-center justify-between border-b-2 border-gray-300">
                <h2 className="text-2xl">How does the Design process work ?</h2>
                <Plus />
              </div>
              <div className="block1 flex items-center justify-between border-b-2 border-gray-300">
                <h2 className="text-2xl">What services do you offer ?</h2>
                <Plus />
              </div>
              <div className="block1 flex items-center justify-between border-b-2 border-gray-300">
                <h2 className="text-2xl">How long does a project take ?</h2>
                <Plus />
              </div>
            </>
          )}
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer active:scale-95"
        >
          Ask Some Question <ArrowBigRight />
        </Button>
      </div>
      {isModalOpen && (
        <div className="pl-20 pr-20 pt-10 pb-10  bg-gradient-to-r from-black to-white ">
          <form action={Action} className="flex flex-col gap-10">
            <Input className="bg-white text-black" type="text" name="query" />
            <div className="flex gap-4">
              <button
                className="bg-black w-fit border-white border-2 text-white active:scale-95 px-10 py-2 rounded-md "
                type="submit"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-700 w-fit border-white border-2 text-white active:scale-95 px-10 py-2 rounded-md "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Faq;
