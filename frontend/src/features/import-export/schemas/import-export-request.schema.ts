import { z } from "zod";

export const importExportRequestSchema = z.object({
  productName: z.string().trim().min(2, "Enter the product you need."),
  category: z.string().min(1, "Select a product category."),
  requestType: z.enum(["import", "export"]),
  country: z.string().min(1, "Select a source or destination country."),
  quantity: z.string().trim().min(1, "Enter a quantity."),
  specifications: z.string().trim().min(10, "Add a few details about the product."),
  budget: z.string().trim().min(1, "Enter your budget."),
  additionalRequirements: z.string().trim().optional(),
});

export type ImportExportRequestInput = z.infer<typeof importExportRequestSchema>;
