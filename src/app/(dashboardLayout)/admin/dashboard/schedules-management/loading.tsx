import SkeletonTable from "@/components/shared/skeletons/SkeletonTable";

export default function AdminsSchedulesManagementLoading() {
  return <SkeletonTable columns={8} rows={6} search action pagination />;
}