import Header from "@/app/components/header";
import AnalyticsDashboard from "@/app/components/AnalyticsDashboard";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden p-6">
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
