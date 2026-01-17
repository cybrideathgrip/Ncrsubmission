import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Sparkles, AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface PredictionResult {
  rootCauses: Array<{ cause: string; confidence: number; category: string }>;
  suggestedFixes: Array<{ fix: string; priority: string; cost: string }>;
  preventiveMeasures: string[];
  impactAssessment: string;
}

export function AIPrediction() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState({
    partType: "",
    ncCode: "",
    ncDescription: "",
    measuredValue: "",
    nominal: "",
    defectDescription: "",
  });

  const handleAnalyze = async () => {
    if (!formData.ncDescription || !formData.partType) {
      toast.error("Please fill in at least Part Type and NC Description");
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock AI prediction results
    const mockPrediction: PredictionResult = {
      rootCauses: [
        {
          cause: "Machine calibration drift detected in temperature control system",
          confidence: 92,
          category: "Equipment",
        },
        {
          cause: "Operator training gap in measurement procedure verification",
          confidence: 78,
          category: "Human Factor",
        },
        {
          cause: "Material batch variation exceeding specification limits",
          confidence: 65,
          category: "Material",
        },
      ],
      suggestedFixes: [
        {
          fix: "Perform immediate machine recalibration and establish weekly verification schedule",
          priority: "High",
          cost: "Medium",
        },
        {
          fix: "Conduct refresher training session on measurement protocols for all operators",
          priority: "High",
          cost: "Low",
        },
        {
          fix: "Implement incoming material inspection with tighter acceptance criteria",
          priority: "Medium",
          cost: "Medium",
        },
        {
          fix: "Install automated monitoring system for temperature fluctuations",
          priority: "Medium",
          cost: "High",
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
    toast.success("AI analysis complete!");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <CardTitle>AI Analysis Input</CardTitle>
          </div>
          <CardDescription>
            Enter non-conformance details for AI-powered root cause analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="partType">Part Type</Label>
              <Input
                id="partType"
                value={formData.partType}
                onChange={(e) => handleInputChange("partType", e.target.value)}
                placeholder="e.g., Gear Housing"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ncCode">NC Code</Label>
              <Input
                id="ncCode"
                value={formData.ncCode}
                onChange={(e) => handleInputChange("ncCode", e.target.value)}
                placeholder="e.g., DIM-001"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ncDescription">NC Description</Label>
            <Textarea
              id="ncDescription"
              value={formData.ncDescription}
              onChange={(e) => handleInputChange("ncDescription", e.target.value)}
              placeholder="Describe the non-conformance in detail..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="nominal">Nominal Value</Label>
              <Input
                id="nominal"
                type="number"
                step="any"
                value={formData.nominal}
                onChange={(e) => handleInputChange("nominal", e.target.value)}
                placeholder="e.g., 25.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="measuredValue">Measured Value</Label>
              <Input
                id="measuredValue"
                type="number"
                step="any"
                value={formData.measuredValue}
                onChange={(e) => handleInputChange("measuredValue", e.target.value)}
                placeholder="e.g., 25.15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defectDescription">Defect Type</Label>
              <Input
                id="defectDescription"
                value={formData.defectDescription}
                onChange={(e) => handleInputChange("defectDescription", e.target.value)}
                placeholder="e.g., Over-size"
              />
            </div>
          </div>

          <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full bg-blue-600 hover:bg-blue-700">
            {isAnalyzing ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {prediction && (
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
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(item.priority)}>Priority: {item.priority}</Badge>
                    <Badge className={getCostColor(item.cost)}>Cost: {item.cost}</Badge>
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
              <CardTitle>Impact Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                <p className="text-slate-700">{prediction.impactAssessment}</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!prediction && (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Sparkles className="mb-4 h-12 w-12 text-slate-300" />
            <p className="text-slate-500">
              Enter non-conformance details above and click "Analyze with AI" to get predictions
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
