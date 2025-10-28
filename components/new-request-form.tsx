"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { db } from "@/lib/db";

const requestSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().optional(),
  city: z.string().optional(),
  budget: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    if (typeof val === "string") return Number(val);
    return val;
  }, z.number().nonnegative().optional()),
  scheduledAt: z.string().optional(),
});

type RequestFormData = z.infer<typeof requestSchema>;

export function NewRequestForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [aiCategory, setAiCategory] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(requestSchema),
  });

  const description = watch("description");

  // Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  const handleClassify = async () => {
    if (!description || description.length < 10) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await res.json();
      if (data.category) {
        setAiCategory(data.category);
        setValue("categoryId", data.category.id);
        toast.success(
          `AI suggested: ${data.category.name} (${Math.round(
            data.confidence * 100
          )}% confidence)`
        );
      }
    } catch (error) {
      toast.error("Failed to classify request");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: RequestFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create request");

      toast.success("Service request created!");
      router.push("/dashboard/requests");
    } catch (error) {
      toast.error("Failed to create request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div>
        <Label>Service Category *</Label>
        <Select onValueChange={(value) => setValue("categoryId", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && (
          <p className="text-sm text-red-500">{errors.categoryId.message}</p>
        )}
      </div>

      <div>
        <Label>Request Title *</Label>
        <Input
          {...register("title")}
          placeholder="Brief title for your request"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Description *</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClassify}
            disabled={!description || description.length < 10 || isLoading}
          >
            {isLoading ? "Classifying..." : "🤖 AI Classify"}
          </Button>
        </div>
        <Textarea
          {...register("description")}
          placeholder="Describe what you need in detail..."
          rows={6}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
        {aiCategory && (
          <p className="text-sm text-green-600 mt-1">
            AI category: {aiCategory.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>City</Label>
          <Input {...register("city")} placeholder="City" />
        </div>
        <div>
          <Label>Budget ($)</Label>
          <Input
            {...register("budget")}
            type="number"
            step="any"
            placeholder="Optional"
          />
        </div>
      </div>

      <div>
        <Label>Address</Label>
        <Input {...register("location")} placeholder="Street address" />
      </div>

      <div>
        <Label>Preferred Date & Time</Label>
        <Input {...register("scheduledAt")} type="datetime-local" />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Request"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
