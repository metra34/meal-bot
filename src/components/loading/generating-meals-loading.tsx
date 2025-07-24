import { RefreshCw } from "lucide-react";

const GeneratingMealsLoading = () => {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="text-center">
        <RefreshCw className="text-primary mx-auto mb-4 h-12 w-12 animate-spin" />
        <h2 className="text-primary-foreground mb-2 text-2xl font-semibold">
          Generating Your Meal Plans
        </h2>
        <p className="text-primary-foreground/70">
          This will just take a moment...
        </p>
      </div>
    </div>
  );
};

export default GeneratingMealsLoading;
