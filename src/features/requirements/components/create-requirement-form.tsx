"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/components/shared/file-uploader/file-uploader";
import { FormSection } from "@/components/shared/form-section";
import { CURRENCIES } from "@/lib/constants/currencies";
import { applyBackendErrors } from "@/lib/validation/backend-errors";

import { useCreateRequirement } from "../hooks/use-requirement";
import {
  createRequirementSchema,
  type CreateRequirementFormInput,
  type CreateRequirementInput,
} from "../schemas/create-requirement.schema";

/**
 * Requirement capture form.
 *
 * Demonstrates the composition pattern for longer forms: grouped `FormSection`s,
 * the shared `FileUploader` feeding document ids into the payload, and backend
 * validation errors mapped back onto individual fields.
 */
export function CreateRequirementForm({
  onCreated,
}: {
  onCreated?: (id: string) => void;
}) {
  const createRequirement = useCreateRequirement();
  const [formError, setFormError] = useState<string | null>(null);

  // <Input, context, Output>: `.default()` means the typed values and the
  // parsed values differ, and RHF needs both to line up with the resolver.
  const form = useForm<CreateRequirementFormInput, unknown, CreateRequirementInput>({
    resolver: zodResolver(createRequirementSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      quantity: 1,
      unit: "units",
      targetCurrency: "USD",
      destinationCountry: "",
      attachmentIds: [],
    },
  });

  async function onSubmit(values: CreateRequirementInput) {
    setFormError(null);
    try {
      const requirement = await createRequirement.mutateAsync(values);
      form.reset();
      onCreated?.(requirement.id);
    } catch (error) {
      const message = applyBackendErrors(error, form.setError, [
        "title",
        "description",
        "category",
        "quantity",
        "unit",
        "targetCurrency",
        "targetUnitPrice",
        "destinationCountry",
        "requiredBy",
      ]);
      setFormError(message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
        {formError ? (
          <Alert variant="destructive">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}

        <FormSection
          title="What do you need?"
          description="Describe the product so our sourcing team can find the right suppliers."
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Stainless steel kitchen sinks" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Specifications, materials, certifications, packaging requirements..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The more detail you provide, the more accurate the quotations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Kitchenware" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destinationCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination country</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Sri Lanka" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection title="Quantity and budget">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  {/* `z.coerce.number()` accepts unknown input, so the value is
                      narrowed to a string for the DOM and coerced on parse. */}
                  <Input
                    type="number"
                    min={1}
                    inputMode="numeric"
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value == null ? "" : String(field.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Input placeholder="units, kg, cartons" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetCurrency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(CURRENCIES).map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetUnitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target unit price (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    inputMode="decimal"
                    value={field.value == null ? "" : String(field.value)}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requiredBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required by (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection
          title="Supporting documents"
          description="Drawings, specifications, or reference images. Optional."
        >
          <div className="sm:col-span-2">
            <FileUploader
              constraints={{
                maxFiles: 10,
                maxSizeBytes: 10 * 1024 * 1024,
                accept: [".pdf", ".docx", ".xlsx", "image/*"],
              }}
              onComplete={(ids) => form.setValue("attachmentIds", ids)}
              label="Attach documents"
            />
          </div>
        </FormSection>

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Submitting...
              </>
            ) : (
              "Submit requirement"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
