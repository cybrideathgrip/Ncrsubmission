import { NCRForm } from "@/app/components/NCRForm";
import { AIPrediction } from "@/app/components/AIPrediction";
import { Toaster } from "@/app/components/ui/sonner";
import { ClipboardList, FileText } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

interface NCRData {
  partType: string;
  jobOrder: string;
  operationNumberDetection: string;
  ncDescription: string;
  ncCode: string;
  nominal: string;
  lowerTolerance: string;
  upperTolerance: string;
  measuredValue: string;
  defectDescEN: string;
  qcCommentsEN: string;
  machineNumDetection: string;
  operatorDetection: string;
  dateDetection: string;
  operationNumberOccurrence: string;
  operatorMachining: string;
  machineNumOccurrence: string;
  dateMachining: string;
}

// NCR Application with AI Analysis
export default function App() {
  const [activeTab, setActiveTab] = useState("form");
  const [submittedData, setSubmittedData] = useState<NCRData | null>(null);

  const handleNCRSubmit = (data: NCRData) => {
    setSubmittedData(data);
    setActiveTab("management");
  };

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
            <TabsTrigger value="management" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <FileText className="h-4 w-4" />
              NCR Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6">
            <NCRForm onSubmit={handleNCRSubmit} />
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <AIPrediction ncrData={submittedData} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}