"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { DeleteQuery, ResponseQuery } from "@/app/action/faq";
import toast from "react-hot-toast";
// import { success } from "zod";
// import { useStackId } from 'recharts/types/cartesian/BarStack'

function AdminQuery({ data }) {
  const [query, setQuery] = useState(data.data);
  const [isOpen, setIsOpen] = useState(null);
  const [state, Action, pending] = useActionState(ResponseQuery, {
    success: false,
  });
  console.log(query);

  const handleOpen = (idx) => {
    setIsOpen((prev) => {
      return prev == idx ? null : idx;
    });
  };

  useEffect(() => {
    if (state.success) {
      toast.success("Response sent successfully");
      setIsOpen(null);
    }
  }, [state]);

  const handleDelete=async(id)=>{
    const res = await DeleteQuery(id);
    console.log(res);
    if(res.success){
        setQuery((prev)=>prev.filter(item=>item._id!==id))
        toast.success(res.message)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Customer Queries</h1>
          </div>
          <p className="text-gray-600">Manage and respond to customer inquiries</p>
          <div className="mt-4 flex gap-2">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full font-medium">
              {query?.filter(item => item.status === 'pending').length || 0} Pending
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
              {query?.filter(item => item.status === 'answered').length || 0} Answered
            </span>
          </div>
        </header>

        {/* Queries List */}
        <div className="space-y-6">
          {query && query.length > 0 ? (
            query.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  {/* Query Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {item.status === 'pending' ? 'Pending Response' : 'Answered'}
                        </span>
                        <span className="text-xs text-gray-500">
                          #{index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-relaxed">
                        {item.query}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(item.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-medium text-gray-700">
                            {item.user.username}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Response Display */}
                  {item.status === "answered" && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-800 mb-1">Response</h4>
                          <p className="text-green-700">{item.response}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {item.status === "pending" && (
                      <button
                        onClick={() => handleOpen(index)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Respond
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(item._id)} 
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>

                {/* Response Form */}
                {isOpen === index && (
                  <div className="border-t border-gray-100 bg-gray-50 p-6 animate-in slide-in-from-top duration-200">
                    <div className="max-w-2xl">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Write Response
                      </h4>
                      <form action={Action} className="space-y-4">
                        <input type="hidden" name="queryId" value={item._id} />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your response to "{item.user.username}"
                          </label>
                          <Input
                            className="w-full bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-gray-900 placeholder-gray-400"
                            type="text"
                            name="query"
                            placeholder="Type your response here..."
                            required
                          />
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                          <button
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={pending}
                          >
                            {pending ? (
                              <>
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Send Response
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsOpen(null)}
                            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No queries yet</h3>
              <p className="text-gray-600">Customer queries will appear here when they contact you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminQuery;
