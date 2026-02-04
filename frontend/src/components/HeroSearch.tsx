// File: src/components/HeroSearch.tsx
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function HeroSearch() {
  const [keyword, setKeyword] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("")
  const [selectedLocation, setSelectedLocation] = React.useState("")
  const [selectedJobType, setSelectedJobType] = React.useState("")

  const categories = ["IT", "Marketing", "Design", "Finance", "HR"]
  const locations = ["Yangon", "Mandalay", "Naypyitaw", "Bago", "Taunggyi"]
  const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"]

  // Reusable searchable Select component
  const SearchableSelect = ({
    placeholder,
    options,
    value,
    onChange,
  }: {
    placeholder: string
    options: string[]
    value: string
    onChange: (val: string) => void
  }) => {
    const [query, setQuery] = React.useState("")

    // Filter options based on input
    const filtered = options.filter((opt) =>
      opt.toLowerCase().includes(query.toLowerCase())
    )

    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[150px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          position="popper" // floating dropdown
          
          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-[200px] p-2"
        >
          {/* Input inside dropdown */}
          <div className="mb-2">
            <Input
              placeholder={`Search ${placeholder}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 w-full"
            />
          </div>

          {/* Options */}
          {filtered.length > 0 ? (
            filtered.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))
          ) : (
            <div className="px-2 py-1 text-sm text-gray-500 dark:text-gray-300">
              No results found
            </div>
          )}
        </SelectContent>
      </Select>
    )
  }

  return (
    <section className="relative w-full h-[500px]">
      {/* Background image */}
      <img
        src="/bg.jpg"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
          Find Your Dream Job
        </h1>

        {/* Search bar */}
        <form className="w-full max-w-6xl rounded-lg p-4 flex flex-col md:flex-row gap-4 shadow-lg bg-white dark:bg-gray-800">
          {/* Keyword input */}
          <Input
            placeholder="Search jobs..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />

          {/* Category */}
          <SearchableSelect
            placeholder="Category"
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />

          {/* Location */}
          <SearchableSelect
            placeholder="Location"
            options={locations}
            value={selectedLocation}
            onChange={setSelectedLocation}
          />

          {/* Job Type */}
          <SearchableSelect
            placeholder="Job Type"
            options={jobTypes}
            value={selectedJobType}
            onChange={setSelectedJobType}
          />

          {/* Search button */}
          <Button className="px-6 flex-none w-35 hover:bg-primary/90">
            Search
          </Button>
        </form>
      </div>
    </section>
  )
}
