"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Filter, LayoutGrid, List, ChevronLeft, ChevronRight, ArrowUpDown, Download, X } from "lucide-react";
import { Patient, ApiResponse } from "@/types/patient";
import PatientTable from "./PatientTable";
import PatientCard from "./PatientCard";

const MEDICAL_ISSUES = [
  "Fever", "Headache", "Sore throat", "Sprained ankle", "Rash", 
  "Sinusitis", "Ear infection", "Broken arm", "Stomach ache", "Allergic reaction"
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

  const clearFilters = () => {
    setSelectedIssues([]);
    setSearch("");
    setPage(1);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Blue Header */}
      <header className="header-pattern pt-12 pb-24 px-6 md:px-12 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Patient Directory</h1>
          <p className="text-blue-100/80 font-medium">{total} Patient Found</p>
        </div>
      </header>

      {/* Main Content (Negative margin to overlap header) */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 -mt-12">
        <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-1 mb-6 border border-white/20">
            <div className="flex items-center gap-1">
                <button 
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <List className="w-4 h-4" />
                    Table View
                </button>
                <button 
                    onClick={() => setViewMode('card')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${viewMode === 'card' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <LayoutGrid className="w-4 h-4" />
                    Card View
                </button>
                <div className="ml-auto pr-4 hidden md:flex items-center gap-2 text-slate-400">
                    <Filter className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Active Filters: {selectedIssues.length + (search ? 1 : 0)}</span>
                </div>
            </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Search by name or ID..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
               <span className="text-sm font-bold text-slate-400 mr-2">Sort by:</span>
               <select 
                 className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 focus:outline-none transition-all cursor-pointer"
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
               >
                 <option value="patient_name">Name</option>
                 <option value="patient_id">ID</option>
                 <option value="age">Age</option>
               </select>
               <button 
                 onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                 className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all text-slate-500"
               >
                 <ArrowUpDown className="w-4 h-4" />
               </button>
               <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  PDF <Download className="w-4 h-4" />
               </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {MEDICAL_ISSUES.map(issue => (
              <button
                key={issue}
                onClick={() => toggleIssue(issue)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  selectedIssues.includes(issue) 
                  ? 'bg-primary border-primary text-white shadow-md' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                {issue}
                {selectedIssues.includes(issue) && <X className="w-3 h-3" />}
              </button>
            ))}
            {selectedIssues.length > 0 && (
              <button 
                onClick={clearFilters}
                className="text-xs font-bold text-primary hover:underline px-2"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* List Content */}
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

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
            <button 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent text-slate-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1 px-4">
               {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                 let pageNum;
                 if (totalPages <= 5) {
                   pageNum = i + 1;
                 } else if (page <= 3) {
                   pageNum = i + 1;
                 } else if (page >= totalPages - 2) {
                   pageNum = totalPages - 4 + i;
                 } else {
                   pageNum = page - 2 + i;
                 }
                 
                 return (
                   <button
                     key={pageNum}
                     onClick={() => setPage(pageNum)}
                     className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${page === pageNum ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                   >
                     {String(pageNum).padStart(2, '0')}
                   </button>
                 );
               })}
            </div>

            <button 
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent text-slate-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
