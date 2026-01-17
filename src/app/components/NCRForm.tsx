import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { toast } from "sonner";

interface NCRFormData {
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

interface NCRFormProps {
  onSubmit: (data: NCRFormData) => void;
}

export function NCRForm({ onSubmit: onSubmitProp }: NCRFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NCRFormData>();

  const onSubmit = async (data: NCRFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("NCR Report Data:", data);
    toast.success("NCR Report submitted successfully!");
    onSubmitProp(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Part Information Section */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardTitle className="text-blue-900">Part Information</CardTitle>
          <CardDescription>Basic information about the part and job order</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="partType">
              Part Type <span className="text-red-500">*</span>
            </Label>
            <Input
              id="partType"
              {...register("partType", { required: "Part type is required" })}
              placeholder="Enter part type"
            />
            {errors.partType && (
              <p className="text-sm text-red-500">{errors.partType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobOrder">
              Job Order <span className="text-red-500">*</span>
            </Label>
            <Input
              id="jobOrder"
              {...register("jobOrder", { required: "Job order is required" })}
              placeholder="Enter job order"
            />
            {errors.jobOrder && (
              <p className="text-sm text-red-500">{errors.jobOrder.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Non-Conformance Details Section */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
          <CardTitle className="text-orange-900">Non-Conformance Details</CardTitle>
          <CardDescription>Detailed information about the non-conformance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ncDescription">
              NC Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="ncDescription"
              {...register("ncDescription", { required: "NC description is required" })}
              placeholder="Describe the non-conformance"
              rows={3}
            />
            {errors.ncDescription && (
              <p className="text-sm text-red-500">{errors.ncDescription.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ncCode">
                NC Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ncCode"
                {...register("ncCode", { required: "NC code is required" })}
                placeholder="Enter NC code"
              />
              {errors.ncCode && (
                <p className="text-sm text-red-500">{errors.ncCode.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="defectDescEN">
                Defect Description (EN) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="defectDescEN"
                {...register("defectDescEN", { required: "Defect description is required" })}
                placeholder="Enter defect description"
              />
              {errors.defectDescEN && (
                <p className="text-sm text-red-500">{errors.defectDescEN.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qcCommentsEN">
              QC Comments (EN) <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="qcCommentsEN"
              {...register("qcCommentsEN", { required: "QC comments are required" })}
              placeholder="Enter QC comments"
              rows={3}
            />
            {errors.qcCommentsEN && (
              <p className="text-sm text-red-500">{errors.qcCommentsEN.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Measurements Section */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-fuchsia-50">
          <CardTitle className="text-purple-900">Measurements</CardTitle>
          <CardDescription>Nominal values, tolerances, and measured values</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="nominal">
              Nominal <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nominal"
              type="number"
              step="any"
              {...register("nominal", { required: "Nominal value is required" })}
              placeholder="Enter nominal"
            />
            {errors.nominal && (
              <p className="text-sm text-red-500">{errors.nominal.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lowerTolerance">
              Lower Tolerance <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lowerTolerance"
              type="number"
              step="any"
              {...register("lowerTolerance", { required: "Lower tolerance is required" })}
              placeholder="Enter lower tolerance"
            />
            {errors.lowerTolerance && (
              <p className="text-sm text-red-500">{errors.lowerTolerance.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="upperTolerance">
              Upper Tolerance <span className="text-red-500">*</span>
            </Label>
            <Input
              id="upperTolerance"
              type="number"
              step="any"
              {...register("upperTolerance", { required: "Upper tolerance is required" })}
              placeholder="Enter upper tolerance"
            />
            {errors.upperTolerance && (
              <p className="text-sm text-red-500">{errors.upperTolerance.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="measuredValue">
              Measured Value <span className="text-red-500">*</span>
            </Label>
            <Input
              id="measuredValue"
              type="number"
              step="any"
              {...register("measuredValue", { required: "Measured value is required" })}
              placeholder="Enter measured value"
            />
            {errors.measuredValue && (
              <p className="text-sm text-red-500">{errors.measuredValue.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detection Information Section */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="text-green-900">Detection Information</CardTitle>
          <CardDescription>Information about when and where the issue was detected</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="operationNumberDetection">
              Operation Number of Detection <span className="text-red-500">*</span>
            </Label>
            <Input
              id="operationNumberDetection"
              {...register("operationNumberDetection", {
                required: "Operation number is required",
              })}
              placeholder="Enter operation number"
            />
            {errors.operationNumberDetection && (
              <p className="text-sm text-red-500">{errors.operationNumberDetection.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="machineNumDetection">
              Machine Number of Detection <span className="text-red-500">*</span>
            </Label>
            <Input
              id="machineNumDetection"
              {...register("machineNumDetection", { required: "Machine number is required" })}
              placeholder="Enter machine number"
            />
            {errors.machineNumDetection && (
              <p className="text-sm text-red-500">{errors.machineNumDetection.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="operatorDetection">
              Operator of Detection <span className="text-red-500">*</span>
            </Label>
            <Input
              id="operatorDetection"
              {...register("operatorDetection", { required: "Operator name is required" })}
              placeholder="Enter operator name"
            />
            {errors.operatorDetection && (
              <p className="text-sm text-red-500">{errors.operatorDetection.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateDetection">
              Date of Detection <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dateDetection"
              type="date"
              {...register("dateDetection", { required: "Date is required" })}
            />
            {errors.dateDetection && (
              <p className="text-sm text-red-500">{errors.dateDetection.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Occurrence Information Section */}
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
          <CardTitle className="text-indigo-900">Occurrence Information</CardTitle>
          <CardDescription>Information about when and where the issue occurred</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="operationNumberOccurrence">
              Operation Number of Occurrence <span className="text-red-500">*</span>
            </Label>
            <Input
              id="operationNumberOccurrence"
              {...register("operationNumberOccurrence", {
                required: "Operation number is required",
              })}
              placeholder="Enter operation number"
            />
            {errors.operationNumberOccurrence && (
              <p className="text-sm text-red-500">{errors.operationNumberOccurrence.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="machineNumOccurrence">
              Machine Number of Occurrence <span className="text-red-500">*</span>
            </Label>
            <Input
              id="machineNumOccurrence"
              {...register("machineNumOccurrence", { required: "Machine number is required" })}
              placeholder="Enter machine number"
            />
            {errors.machineNumOccurrence && (
              <p className="text-sm text-red-500">{errors.machineNumOccurrence.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="operatorMachining">
              Operator of Machining <span className="text-red-500">*</span>
            </Label>
            <Input
              id="operatorMachining"
              {...register("operatorMachining", { required: "Operator name is required" })}
              placeholder="Enter operator name"
            />
            {errors.operatorMachining && (
              <p className="text-sm text-red-500">{errors.operatorMachining.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateMachining">
              Date of Machining <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dateMachining"
              type="date"
              {...register("dateMachining", { required: "Date is required" })}
            />
            {errors.dateMachining && (
              <p className="text-sm text-red-500">{errors.dateMachining.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset Form
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit NCR Report"}
        </Button>
      </div>
    </form>
  );
}