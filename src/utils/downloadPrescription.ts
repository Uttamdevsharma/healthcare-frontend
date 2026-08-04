import { downloadPrescriptionPdf } from "@/services/prescription.services";

export const downloadPrescription = async (id: string): Promise<void> => {
  try {
    const { dataUrl, fileName } = await downloadPrescriptionPdf(id);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to download prescription PDF:", error);
    throw error;
  }
};