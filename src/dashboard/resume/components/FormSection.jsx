import { Button } from "@/components/ui/button";
import PersonalDetail from "./form/PersonalDetail";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
import Summery from "./form/Summery";
import Experience from "./form/Experience";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme{" "}
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              className="flex gap-2"
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            className="flex gap-2"
            size="sm"
            disabled={!enableNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Details */}
      {activeFormIndex === 1 ? (
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience />
      ) : null}

      {/* Summary */}

      {/* Professional Experience */}

      {/* Educational */}

      {/* Skills */}
    </div>
  );
}

export default FormSection;
