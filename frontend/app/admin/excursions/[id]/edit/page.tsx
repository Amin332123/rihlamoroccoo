"use client";

import { useEffect, useState, use } from "react";
import ExcursionEditor from "@/components/admin/excursion-editor";
import { ApiClient } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditExcursionPage({ params }: Props) {
  const { id } = use(params);
  const [excursion, setExcursion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await ApiClient.get(`/excursions/${id}`);
      if (res.success && res.data) {
        setExcursion(res.data);
      }
      setIsLoading(false);
    }
    loadData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-green animate-spin" />
      </div>
    );
  }

  if (!excursion) {
    return (
      <div className="text-center py-12">
        <p className="text-red-700 font-serif text-lg font-bold">Excursion not found.</p>
      </div>
    );
  }

  return <ExcursionEditor initialData={excursion} />;
}
