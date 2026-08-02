"use client";

import {
  DataTableFilterValue,
  DataTableFilterValues,
  DataTableRangeValue,
} from "@/components/shared/table/DataTableFilters";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type ISpecialty } from "@/types/specialty.types";
import { RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

export const SPECIALTIES_FILTER_KEY = "specialties.specialty.title";
export const APPOINTMENT_FEE_FILTER_KEY = "appointmentFee";

const GENDER_OPTIONS = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];

const isRangeValue = (
  value: DataTableFilterValue | undefined,
): value is DataTableRangeValue => {
  return !!value && !Array.isArray(value) && typeof value === "object";
};

export const countActiveConsultationFilters = (values: DataTableFilterValues): number => {
  let count = 0;

  const gender = typeof values.gender === "string" ? values.gender.trim() : "";
  if (gender) {
    count += 1;
  }

  const specialties = Array.isArray(values[SPECIALTIES_FILTER_KEY])
    ? values[SPECIALTIES_FILTER_KEY].length
    : 0;
  count += specialties;

  const range = isRangeValue(values[APPOINTMENT_FEE_FILTER_KEY])
    ? values[APPOINTMENT_FEE_FILTER_KEY]
    : {};
  count += [range.gte, range.lte].filter((value) => value && value.trim()).length;

  return count;
};

interface ConsultationFiltersProps {
  specialties: ISpecialty[];
  filterValues: DataTableFilterValues;
  onFilterChange: (filterId: string, value: DataTableFilterValue | undefined) => void;
  onClearAll: () => void;
  isLoading?: boolean;
  hideHeader?: boolean;
  className?: string;
}

const FeeRangeControl = ({
  initialValue,
  isLoading,
  onApply,
}: {
  initialValue: DataTableRangeValue;
  isLoading?: boolean;
  onApply: (value: DataTableRangeValue) => void;
}) => {
  const [minFee, setMinFee] = useState(initialValue.gte ?? "");
  const [maxFee, setMaxFee] = useState(initialValue.lte ?? "");

  const handleApply = () => {
    const next: DataTableRangeValue = {};
    if (minFee.trim()) {
      next.gte = minFee.trim();
    }
    if (maxFee.trim()) {
      next.lte = maxFee.trim();
    }
    onApply(next);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Min</Label>
          <Input
            type="number"
            min={0}
            placeholder="0"
            value={minFee}
            onChange={(event) => setMinFee(event.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Max</Label>
          <Input
            type="number"
            min={0}
            placeholder="Any"
            value={maxFee}
            onChange={(event) => setMaxFee(event.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="w-full"
        onClick={handleApply}
        disabled={isLoading}
      >
        Apply fee range
      </Button>
    </div>
  );
};

const ConsultationFilters = ({
  specialties,
  filterValues,
  onFilterChange,
  onClearAll,
  isLoading,
  hideHeader = false,
  className,
}: ConsultationFiltersProps) => {
  const feeRange = isRangeValue(filterValues[APPOINTMENT_FEE_FILTER_KEY])
    ? filterValues[APPOINTMENT_FEE_FILTER_KEY]
    : {};

  const genderValue = typeof filterValues.gender === "string" ? filterValues.gender : "";
  const selectedSpecialties = Array.isArray(filterValues[SPECIALTIES_FILTER_KEY])
    ? (filterValues[SPECIALTIES_FILTER_KEY] as string[])
    : [];

  const activeCount = useMemo(() => countActiveConsultationFilters(filterValues), [filterValues]);

  const handleSpecialtyToggle = (value: string) => {
    const next = selectedSpecialties.includes(value)
      ? selectedSpecialties.filter((item) => item !== value)
      : [...selectedSpecialties, value];

    onFilterChange(SPECIALTIES_FILTER_KEY, next.length > 0 ? next : undefined);
  };

  return (
    <div className={cn("space-y-5", className)}>
      {!hideHeader && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-primary" />
            <h2 className="text-sm font-semibold">Filters</h2>
            {activeCount > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {activeCount} active
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={onClearAll}
              disabled={isLoading}
            >
              <RotateCcw className="size-3.5" />
              Reset
            </Button>
          )}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Label>Gender</Label>
          {genderValue && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground"
              onClick={() => onFilterChange("gender", undefined)}
              disabled={isLoading}
              aria-label="Clear gender filter"
            >
              <X className="size-3.5" />
            </Button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-xl border bg-muted/40 p-1">
          {GENDER_OPTIONS.map((option) => {
            const isActive = genderValue === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onFilterChange("gender", isActive ? undefined : option.value)}
                disabled={isLoading}
                className={cn(
                  "rounded-lg px-2 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
                  isActive
                    ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Label>Specialties</Label>
          {selectedSpecialties.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {selectedSpecialties.length} selected
            </span>
          )}
        </div>
        <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
          {specialties.length > 0 ? (
            specialties.map((specialty) => {
              const checked = selectedSpecialties.includes(specialty.title);

              return (
                <label
                  key={specialty.id}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-sm transition hover:bg-muted/50 disabled:pointer-events-none disabled:opacity-50"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => handleSpecialtyToggle(specialty.title)}
                    disabled={isLoading}
                  />
                  <span
                    className={cn(
                      "truncate text-muted-foreground",
                      checked && "font-medium text-foreground",
                    )}
                  >
                    {specialty.title}
                  </span>
                </label>
              );
            })
          ) : (
            <p className="text-xs text-muted-foreground">No specialties available.</p>
          )}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label>Consultation Fee</Label>
        <FeeRangeControl
          key={JSON.stringify(feeRange)}
          initialValue={feeRange}
          isLoading={isLoading}
          onApply={(next) =>
            onFilterChange(
              APPOINTMENT_FEE_FILTER_KEY,
              Object.keys(next).length > 0 ? next : undefined,
            )
          }
        />
      </div>
    </div>
  );
};

export default ConsultationFilters;
