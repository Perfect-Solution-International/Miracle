import { z } from "zod";

export const importExportRequestSchema = z.object({
  productName: z.string().trim().min(2, "Enter the product you need."),
  category: z.string().min(1, "Select a product category."),
  requestType: z.enum(["import", "export"]),
  country: z.string().min(1, "Select a source or destination country."),
  specifications: z.string().trim().min(10, "Add a few details about the product."),
  additionalRequirements: z.string().trim().optional(),
});

export type ImportExportRequestInput = z.infer<typeof importExportRequestSchema>;
