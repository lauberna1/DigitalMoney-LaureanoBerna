import { Actividad } from "@/features/dashboard/Actividad/Actividad";
import { Suspense } from "react";

export default function ActividadPage() {
  return (
    <Suspense>
      <Actividad isHome={false} />
    </Suspense>
  );
}
