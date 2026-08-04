"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IMedicalReport } from "@/types/patient.types";
import { format } from "date-fns";
import { Eye, FileImage, FileText, FileUp } from "lucide-react";

type ReportType = "pdf" | "image" | "other";

const getReportType = (link: string): ReportType => {
  const ext = link.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "avif"].includes(ext)) return "image";
  return "other";
};

const formatUploadDate = (date?: string) =>
  date ? format(new Date(date), "MMM dd, yyyy") : "—";

interface MedicalReportsListProps {
  reports?: IMedicalReport[];
}

const MedicalReportsList = ({ reports = [] }: MedicalReportsListProps) => {
  if (reports.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileUp className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">No health records uploaded yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Upload your diagnostic reports and lab results using the form below, and they will
            appear here for quick access.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {reports.map((report) => {
        const type = getReportType(report.reportLink);
        const isImage = type === "image";

        return (
          <Card key={report.id} className="py-4">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                {isImage ? (
                  // eslint-disable-next-line @next/next/no-img-element -- report links are external URLs, matching codebase pattern for external images
                  <img
                    src={report.reportLink}
                    alt={report.reportName}
                    className="h-14 w-14 shrink-0 rounded-lg border object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
                    <FileText className="h-7 w-7" />
                  </div>
                )}

                <div className="min-w-0 space-y-1.5">
                  <p className="truncate text-sm font-medium" title={report.reportName}>
                    {report.reportName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Uploaded {formatUploadDate(report.createdAt)}
                  </p>
                  <Badge
                    variant={isImage ? "secondary" : "outline"}
                    className="text-[11px]"
                  >
                    {isImage ? <FileImage className="mr-1 h-3 w-3" /> : <FileText className="mr-1 h-3 w-3" />}
                    {type === "pdf" ? "PDF" : type === "image" ? "Image" : "File"}
                  </Badge>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full gap-1.5 text-xs"
              >
                <a href={report.reportLink} target="_blank" rel="noreferrer">
                  <Eye className="h-4 w-4 text-primary" />
                  View Report
                </a>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MedicalReportsList;
