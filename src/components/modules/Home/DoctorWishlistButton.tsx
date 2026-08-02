"use client";

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";

const DoctorWishlistButton = ({ doctorName }: { doctorName: string }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleToggle = () => {
    setIsWishlisted((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={
        isWishlisted
          ? `Remove ${doctorName} from wishlist`
          : `Add ${doctorName} to wishlist`
      }
      aria-pressed={isWishlisted}
      className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md shadow-black/5 backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95"
    >
      <Heart
        className={cn(
          "size-4 transition-colors",
          isWishlisted && "fill-rose-500 text-rose-500"
        )}
      />
    </button>
  );
};

export default DoctorWishlistButton;
