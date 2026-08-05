import SkeletonTable from "@/components/shared/skeletons/SkeletonTable";

export default function AdminsDoctorsManagementLoading() {
  return (
    <SkeletonTable columns={10} rows={6} search filters={3} action pagination />
  );
}