"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISpecialty } from "@/types/specialty.types";

const SPECIALTIES_FILTER_KEY = "specialties.specialty.title";

interface HeroSearchBarProps {
  specialties: ISpecialty[];
}

const HeroSearchBar = ({ specialties }: HeroSearchBarProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("searchTerm", searchTerm.trim());
    }
    if (specialty) {
      params.set(SPECIALTIES_FILTER_KEY, specialty);
    }
    const query = params.toString();
    router.push(query ? `/consultation?${query}` : "/consultation");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-[0px_20px_40px_-12px_rgba(0,0,0,0.15)] sm:flex-row sm:items-center"
    >
      <Select value={specialty} onValueChange={setSpecialty}>
        <SelectTrigger className="h-12 w-full border-0 bg-muted/50 px-4 text-sm sm:w-44">
          <SelectValue placeholder="All Specialties" />
        </SelectTrigger>
        <SelectContent>
          {specialties.map((s) => (
            <SelectItem key={s.id} value={s.title}>
              {s.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="search"
        placeholder="Search by doctor or symptom..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-12 flex-1 border-0 bg-transparent px-4 text-sm shadow-none focus-visible:ring-0"
      />
      <Button
        type="submit"
        className="h-12 gap-2 rounded-xl bg-blue-600 px-6 text-sm text-white hover:bg-blue-700"
      >
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
};

export default HeroSearchBar;
