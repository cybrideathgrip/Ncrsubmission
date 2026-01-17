import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Sparkles, AlertCircle, Lightbulb, TrendingUp, FileText, Info } from "lucide-react";

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

interface PredictionResult {
  rootCauses: Array<{ cause: string; confidence: number; category: string }>;
  suggestedFixes: Array<{ fix: string; confidence: number }>;
  preventiveMeasures: string[];
  impactAssessment: string;
}

interface AIPredictionProps {
  ncrData: NCRData | null;
}

export function AIPrediction({ ncrData }: AIPredictionProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  useEffect(() => {
    if (ncrData) {
      handleAnalyze();
    }
  }, [ncrData]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock AI prediction results
    const mockPrediction: PredictionResult = {
      rootCauses: [
        {
          cause: "Tool Calibration",
          confidence: 92,
          category: "Equipment",
        },
        {
          cause: "Process Instability",
          confidence: 78,
          category: "Process",
        },
        {
          cause: "Human Error",
          confidence: 65,
          category: "Human Factor",
        },
      ],
      suggestedFixes: [
        {
          fix: "Cancel releasing clamping force",
          confidence: 88,
        },
        {
          fix: "Add manual tool calibration",
          confidence: 85,
        },
        {
          fix: "Maintenance marking machine",
          confidence: 79,
        },
      ],
      preventiveMeasures: [
        "Schedule preventive maintenance every 2 weeks instead of monthly",
        "Create visual work instructions at the workstation",
        "Implement statistical process control (SPC) charts for this operation",
        "Add secondary verification step for critical dimensions",
      ],
      impactAssessment:
        "Based on historical data, this type of non-conformance typically affects 2-5% of production runs. Implementing the suggested fixes could reduce occurrence rate by 85% and save approximately $15,000-$25,000 annually in scrap costs.",
    };

    setPrediction(mockPrediction);
    setIsAnalyzing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost.toLowerCase()) {
      case "high":
        return "bg-purple-500";
      case "medium":
        return "bg-blue-500";
      case "low":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  if (!ncrData) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="mb-4 h-12 w-12 text-slate-300" />
          <h3 className="mb-2 text-lg">No NCR Data Available</h3>
          <p className="text-slate-500">
            Please submit an NCR report from the "Submit NCR" tab to view the management report and AI analysis
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Submitted NCR Report Section */}
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <CardTitle>Submitted NCR Report</CardTitle>
            </div>
            <Button onClick={handleAnalyze} disabled={isAnalyzing} size="sm" className="bg-blue-600 hover:bg-blue-700">
              {isAnalyzing ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Re-analyze
                </>
              )}
            </Button>
          </div>
          <CardDescription>Review of submitted non-conformance data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Part Information */}
          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-3 font-semibold text-blue-900">Part Information</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">Part Type</p>
                <p className="font-medium">{ncrData.partType}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Job Order</p>
                <p className="font-medium">{ncrData.jobOrder}</p>
              </div>
            </div>
          </div>

          {/* Non-Conformance Details */}
          <div className="rounded-lg bg-orange-50 p-4">
            <h4 className="mb-3 font-semibold text-orange-900">Non-Conformance Details</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">NC Description</p>
                <p className="font-medium">{ncrData.ncDescription}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-600">NC Code</p>
                  <p className="font-medium">{ncrData.ncCode}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Defect Description</p>
                  <p className="font-medium">{ncrData.defectDescEN}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600">QC Comments</p>
                <p className="font-medium">{ncrData.qcCommentsEN}</p>
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div className="rounded-lg bg-purple-50 p-4">
            <h4 className="mb-3 font-semibold text-purple-900">Measurements</h4>
            <div className="grid gap-3 sm:grid-cols-4">
              <div>
                <p className="text-sm text-slate-600">Nominal</p>
                <p className="font-medium">{ncrData.nominal}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Lower Tolerance</p>
                <p className="font-medium">{ncrData.lowerTolerance}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Upper Tolerance</p>
                <p className="font-medium">{ncrData.upperTolerance}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Measured Value</p>
                <p className="font-medium">{ncrData.measuredValue}</p>
              </div>
            </div>
          </div>

          {/* Detection Information */}
          <div className="rounded-lg bg-green-50 p-4">
            <h4 className="mb-3 font-semibold text-green-900">Detection Information</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">Operation Number</p>
                <p className="font-medium">{ncrData.operationNumberDetection}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Machine Number</p>
                <p className="font-medium">{ncrData.machineNumDetection}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Operator</p>
                <p className="font-medium">{ncrData.operatorDetection}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Date of Detection</p>
                <p className="font-medium">{new Date(ncrData.dateDetection).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Occurrence Information */}
          <div className="rounded-lg bg-indigo-50 p-4">
            <h4 className="mb-3 font-semibold text-indigo-900">Occurrence Information</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">Operation Number</p>
                <p className="font-medium">{ncrData.operationNumberOccurrence}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Machine Number</p>
                <p className="font-medium">{ncrData.machineNumOccurrence}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Operator</p>
                <p className="font-medium">{ncrData.operatorMachining}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Date of Machining</p>
                <p className="font-medium">{new Date(ncrData.dateMachining).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* AI Analysis Section */}
      {isAnalyzing && (
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Sparkles className="mb-4 h-12 w-12 animate-spin text-blue-600" />
            <h3 className="mb-2 text-lg">AI Analysis in Progress</h3>
            <p className="text-slate-500">Analyzing NCR data to identify root causes and suggest corrective actions...</p>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {prediction && !isAnalyzing && (
        <>
          {/* Root Causes */}
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <CardTitle>Predicted Root Causes</CardTitle>
              </div>
              <CardDescription>AI-identified potential root causes ranked by confidence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {prediction.rootCauses.map((item, index) => (
                <div key={index} className="rounded-lg border bg-gradient-to-r from-red-50 to-orange-50 p-4">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <p className="flex-1">{item.cause}</p>
                    <Badge className={getPriorityColor("high")}>{item.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{item.confidence}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Suggested Fixes */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-green-500" />
                <CardTitle>Suggested Corrective Actions</CardTitle>
              </div>
              <CardDescription>Recommended fixes prioritized by impact and feasibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {prediction.suggestedFixes.map((item, index) => (
                <div key={index} className="rounded-lg border bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                  <div className="mb-3 flex items-start gap-2">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                      {index + 1}
                    </div>
                    <p className="flex-1">{item.fix}</p>
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{item.confidence}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preventive Measures */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <CardTitle>Preventive Measures</CardTitle>
              </div>
              <CardDescription>Long-term actions to prevent recurrence</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {prediction.preventiveMeasures.map((measure, index) => (
                  <li key={index} className="flex items-start gap-3 rounded-lg bg-purple-50 p-3">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-purple-500" />
                    <span className="flex-1">{measure}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Impact Assessment */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                <CardTitle>Impact Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                <p className="text-slate-700">{prediction.impactAssessment}</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}