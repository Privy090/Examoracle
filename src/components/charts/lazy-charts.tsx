"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ChartFallback = () => <Skeleton className="h-48 w-full" />;

export const TopicPreviewChart = dynamic(() => import("./prediction-charts").then((mod) => mod.TopicPreviewChart), { ssr: false, loading: ChartFallback });
export const TopicProbabilityChart = dynamic(() => import("./prediction-charts").then((mod) => mod.TopicProbabilityChart), { ssr: false, loading: ChartFallback });
