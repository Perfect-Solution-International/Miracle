"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  SERVICE_BY_PATH,
  type ServiceContext,
} from "../data/service-requirement-options";
import { RequirementInquiryForm } from "./requirement-inquiry-form";

export function ServiceRequirementDialog({
  trigger,
  context,
  defaultService,
}: {
  trigger: ReactNode;
  context: "general" | ServiceContext;
  defaultService?: string;
}) {
  const pathname = usePathname();
  const selectedService = defaultService ?? SERVICE_BY_PATH[pathname] ?? "";

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-[rgba(15,30,50,0.5)] supports-backdrop-filter:backdrop-blur-none"
        className="flex max-h-[92dvh] w-[calc(100vw-20px)] max-w-[670px] flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white p-0 shadow-[0_24px_70px_rgba(15,23,42,0.24)] sm:w-[calc(100vw-32px)]"
      >
        <div className="sticky top-0 z-20 h-0">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="hover:text-navy absolute top-4 right-5 bg-white text-slate-500 shadow-none hover:bg-white sm:right-6"
              aria-label="Close"
            >
              <X aria-hidden="true" className="size-4" />
            </Button>
          </DialogClose>
        </div>
        <DialogHeader className="sr-only">
          <DialogTitle>Tell Us What You Need</DialogTitle>
          <DialogDescription>
            Share your business requirements and we will coordinate the ideal solution.
          </DialogDescription>
        </DialogHeader>
        <div className="public-form-scrollbar min-h-0 overflow-y-auto p-2 sm:p-3" tabIndex={0} aria-label="Requirement form">
          <RequirementInquiryForm context={context} defaultService={selectedService} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
