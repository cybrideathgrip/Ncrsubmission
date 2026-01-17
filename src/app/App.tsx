import { NCRForm } from "@/app/components/NCRForm";
import { AIPrediction } from "@/app/components/AIPrediction";
import { Toaster } from "@/app/components/ui/sonner";
import { ClipboardList, Sparkles } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

export default function App() {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Blue Header Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
              <ClipboardList className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-white">Non-Conformance Report (NCR)</h1>
              <p className="text-blue-100">
                Quality control and AI-powered root cause analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-md">
            <TabsTrigger value="form" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <ClipboardList className="h-4 w-4" />
              Submit NCR
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Sparkles className="h-4 w-4" />
              AI Prediction
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6">
            <NCRForm />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <AIPrediction />
          </TabsContent>
        </Tabs>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}