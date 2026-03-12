import { Stepper } from "@/src/components/ui/Stepper";
import React from "react";

export const StepperLog = () => {
  return (
    <section>
      <Stepper
        currentStep={1}
        steps={[
          { label: "Olahraga", description: "Pilih Olahraga" },
          { label: "Detail", description: "Detail Sesi" },
          { label: "Konfirmasi", description: "Konfirmasi" },
        ]}
      />
    </section>
  );
};
