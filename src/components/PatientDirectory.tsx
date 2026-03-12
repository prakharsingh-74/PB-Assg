"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, ListFilter, Download, X } from "lucide-react";
import { Patient, ApiResponse } from "@/types/patient";
import PatientTable from "./PatientTable";
import PatientCard from "./PatientCard";

const MEDICAL_ISSUES = [
  "Option 1", "Option 2", "Option 3", "Option 4", "Option 5", 
  "Option 6", "Option 7", "Option 8", "Option 9", "Option 10"
];

export default function PatientDirectory() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("patient_name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: viewMode === 'table' ? "10" : "12",
        search: debouncedSearch,
        medical_issue: selectedIssues.join(","),
        sortBy,
        order,
      });

      const response = await fetch(`/api/patients?${params.toString()}`);
      const data: ApiResponse = await response.json();
      
      setPatients(data.patients);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, selectedIssues, sortBy, order, viewMode]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const toggleIssue = (issue: string) => {
    setSelectedIssues(prev => 
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    );
    setPage(1);
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Blue Header with Asset */}
      <header className="header-bg pt-8 pb-14 px-6 md:px-12 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-semibold mb-2 tracking-tight">Patient Directory</h1>
          <p className="text-white/90 text-lg font-normal mb-0 leading-tight">{total} Patient Found</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Top Control Bar (Tabs and Active Filters) */}
        <div className="flex items-center justify-between mb-0 border-b border-slate-200">
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => setViewMode('table')}
                    className={`pb-3 text-[13px] font-bold transition-all px-1 cursor-pointer relative ${viewMode === 'table' ? 'text-slate-900 after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-primary' : 'text-slate-400 hover:text-slate-700'}`}
                >
                    Table View
                </button>
                <button 
                    onClick={() => setViewMode('card')}
                    className={`pb-3 text-[13px] font-bold transition-all px-1 cursor-pointer relative ${viewMode === 'card' ? 'text-slate-900 after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-primary' : 'text-slate-400 hover:text-slate-700'}`}
                >
                    Card View
                </button>
            </div>
            <div className="pb-3 flex items-center gap-2">
                <ListFilter className="w-4 h-4 text-primary" />
                <span className="text-[13px] font-medium text-slate-500">Active Filters: {selectedIssues.length + (search ? 1 : 0)}</span>
            </div>
        </div>

        {/* Search and Sort Row (Combined Box) */}
        <div className="mt-6 border border-slate-200 rounded-md overflow-hidden flex flex-col md:flex-row shadow-sm">
            {/* Search Section */}
            <div className="flex-1 p-3 flex items-center gap-3 bg-white">
                <Search className="w-4 h-4 text-primary shrink-0" />
                <input 
                    type="text"
                    placeholder="Search"
                    className="flex-1 bg-transparent border-none outline-none text-[14px] font-medium text-slate-700 placeholder:text-slate-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <ListFilter className="w-4 h-4 text-primary cursor-pointer shrink-0" />
            </div>

            {/* Vertical Split Line (Dotted) */}
            <div className="hidden md:block w-px border-l border-dotted border-slate-300"></div>

            {/* Sort Section */}
            <div className="p-3 flex items-center gap-4 bg-white md:min-w-[300px]">
                <span className="text-[14px] font-bold text-primary ml-2">Sort by:</span>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setSortBy(sortBy === 'patient_name' ? 'patient_id' : 'patient_name')}
                        className="px-3 py-1.5 border border-slate-200 rounded text-[12px] font-medium text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all min-w-[100px] justify-between"
                    >
                        {sortBy === 'patient_name' ? 'option 1' : 'ID'}
                        <span className="text-[10px]">&uarr;&darr;</span>
                    </button>
                    <button 
                        onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                        className="px-3 py-1.5 border border-slate-200 rounded text-[12px] font-medium text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all min-w-[100px] justify-between"
                    >
                        {order === 'asc' ? 'option 1' : 'option 1'}
                        <span className="text-[10px]">&uarr;&darr;</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Filter Buttons Container */}
        <div className="mt-4 flex flex-wrap gap-3">
            {MEDICAL_ISSUES.slice(0, 4).map(issue => (
                <div 
                    key={issue} 
                    onClick={() => toggleIssue(issue)}
                    className={`flex items-center gap-2 px-3 py-2 border rounded text-[13px] font-medium shadow-sm cursor-pointer transition-all ${selectedIssues.includes(issue) ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                    {issue}
                    <X className={`w-3 h-3 ${selectedIssues.includes(issue) ? 'text-primary' : 'text-slate-400'}`} />
                </div>
            ))}
        </div>

        {/* PDF Button */}
        <div className="mt-6 flex justify-end">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                PDF <Download className="w-4 h-4 text-slate-400" />
            </button>
        </div>

        {/* List Content */}
        <div className="mt-8">
            {viewMode === 'table' ? (
              <PatientTable patients={patients} loading={loading} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                   Array.from({ length: 12 }).map((_, i) => (
                     <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-slate-100"></div>
                   ))
                ) : patients.map(p => (
                  <PatientCard key={p.patient_id} patient={p} />
                ))}
              </div>
            )}
        </div>

        {/* Pagination - Polished to match design */}
        <div className="mt-16 mb-20 flex justify-center">
          <div className="flex items-center gap-4">
            <button 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 border border-slate-200 rounded flex items-center gap-2 text-[12px] font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all bg-white"
            >
              &lt; Previous
            </button>
            
            <div className="flex items-center gap-2">
               {totalPages > 1 && Array.from({ length: Math.min(7, totalPages) }).map((_, i) => {
                 const pageNum = i + 1;
                 return (
                   <button
                     key={pageNum}
                     onClick={() => setPage(pageNum)}
                     className={`w-7 h-7 rounded text-[12px] font-bold transition-all ${page === pageNum ? 'bg-primary text-white' : 'text-slate-400 hover:text-slate-600'}`}
                   >
                     {String(pageNum).padStart(2, '0')}
                   </button>
                 );
               })}
            </div>

            <button 
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 border border-slate-200 rounded flex items-center gap-2 text-[12px] font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all bg-white"
            >
              Next &gt;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
