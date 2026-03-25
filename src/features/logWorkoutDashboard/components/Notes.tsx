import { Card, CardContent } from "@/src/components/ui/Card";
import { Textarea } from "@/src/components/ui/TextArea";
import React from "react";

export const Notes = () => {
  return (
    <section>
      <Card className="w-full bg-black/40">
        <CardContent>
          <Textarea
            label="Catatan Sesi"
            placeholder="Gimana rasanya workout hari ini?"
            hint="Maksimal 200 karakter"
            rows={3}
          />
        </CardContent>
      </Card>
    </section>
  );
};
