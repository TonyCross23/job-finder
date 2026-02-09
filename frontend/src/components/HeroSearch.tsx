// File: src/components/HeroSearch.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function HeroSearch() {
  const [keyword, setKeyword] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedJobType, setSelectedJobType] = React.useState("");

  const categories = ["IT", "Marketing", "Design", "Finance", "HR"];
  const locations = ["Yangon", "Mandalay", "Naypyitaw", "Bago", "Taunggyi"];
  const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];

  const SearchableSelect = ({
    placeholder,
    options,
    value,
    onChange,
  }: {
    placeholder: string;
    options: string[];
    value: string;
    onChange: (val: string) => void;
  }) => {
    const [query, setQuery] = React.useState("");
    const filtered = options.filter((opt) =>
      opt.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <Select value={value} onValueChange={onChange}>
        {/* Mobile မှာ w-full ဖြစ်အောင် ပြင်ထားတယ် */}
        <SelectTrigger className="w-full md:w-[160px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-[var(--radix-select-trigger-width)] md:w-[200px] p-2"
        >
          <div className="mb-2">
            <Input
              placeholder={`Search ${placeholder}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-gray-100 dark:bg-gray-600"
            />
          </div>
          {filtered.length > 0 ? (
            filtered.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))
          ) : (
            <div className="px-2 py-1 text-sm text-gray-500">No results found</div>
          )}
        </SelectContent>
      </Select>
    );
  };

  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center py-12">
      {/* Background image */}
      <img
        src="/bg.jpg"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 dark:bg-black/70" />

      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 text-center leading-tight">
          Find Your Dream Job
        </h1>

        {/* Search Bar Container */}
        <div className="w-full bg-white dark:bg-gray-800 p-4 md:p-2 rounded-xl shadow-2xl">
          <form 
            className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-3 items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Keyword Input - Desktop မှာ flex-1 ယူမယ် */}
            <div className="sm:col-span-2 lg:flex-1 w-full">
              <Input
                placeholder="Job title, keywords..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="h-11 bg-transparent border-gray-200 dark:border-gray-600"
              />
            </div>

            {/* Selects */}
            <SearchableSelect
              placeholder="Category"
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />

            <SearchableSelect
              placeholder="Location"
              options={locations}
              value={selectedLocation}
              onChange={setSelectedLocation}
            />

            <SearchableSelect
              placeholder="Job Type"
              options={jobTypes}
              value={selectedJobType}
              onChange={setSelectedJobType}
            />

            {/* Search Button */}
            <Button className="h-11 w-full lg:w-32 bg-primary hover:bg-primary/90 text-white font-semibold transition-all">
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}