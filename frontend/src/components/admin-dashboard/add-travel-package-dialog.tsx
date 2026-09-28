import { Plane, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { TravelPackageFormData } from "./types";

interface AddTravelPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitPackage: (data: TravelPackageFormData) => void;
}

export function AddTravelPackageDialog({
  open,
  onOpenChange,
  onSubmitPackage,
}: AddTravelPackageDialogProps) {
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("5 Days / 4 Nights");
  const [category, setCategory] = useState<TravelPackageFormData["category"]>("Leisure");
  const [priceEstimate, setPriceEstimate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TravelPackageFormData["status"]>("Published");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !destination.trim()) return;

    onSubmitPackage({
      title,
      destination,
      duration,
      category,
      priceEstimate,
      description,
      status,
    });

    // Reset form
    setTitle("");
    setDestination("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-brand-blue-light text-brand-blue dark:bg-brand-blue/30">
              <Plane className="size-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-navy dark:text-foreground">
                Add New Travel Package
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Publish or draft a travel itinerary package for Miracle International
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="pkg-title" className="text-xs font-semibold">
              Package Title <span className="text-brand-red">*</span>
            </Label>
            <Input
              id="pkg-title"
              placeholder="e.g. Dubai Business & Luxury Expo Tour 5D4N"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="pkg-destination" className="text-xs font-semibold">
                Destination(s) <span className="text-brand-red">*</span>
              </Label>
              <Input
                id="pkg-destination"
                placeholder="e.g. Dubai & Abu Dhabi, UAE"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pkg-duration" className="text-xs font-semibold">
                Duration
              </Label>
              <Input
                id="pkg-duration"
                placeholder="e.g. 5 Days / 4 Nights"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Package Category</Label>
              <Select
                value={category}
                onValueChange={(val) =>
                  setCategory(val as TravelPackageFormData["category"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Business">Business Tour</SelectItem>
                  <SelectItem value="Leisure">Leisure & Holiday</SelectItem>
                  <SelectItem value="Inbound">Inbound (Sri Lanka)</SelectItem>
                  <SelectItem value="Outbound">Outbound International</SelectItem>
                  <SelectItem value="Tech Tour">Tech & Trade Summit</SelectItem>
                  <SelectItem value="Cultural">Cultural & Heritage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Initial Status</Label>
              <Select
                value={status}
                onValueChange={(val) =>
                  setStatus(val as TravelPackageFormData["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">Published (Active)</SelectItem>
                  <SelectItem value="Draft">Draft (Internal)</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pkg-desc" className="text-xs font-semibold">
              Package Description & Highlights
            </Label>
            <Textarea
              id="pkg-desc"
              rows={3}
              placeholder="Highlight key inclusions, luxury hotel categories, guided excursions, VIP transfers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white gap-1.5"
            >
              <Plus className="size-4" />
              Create Package
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
