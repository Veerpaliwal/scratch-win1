// src/app/scratch/page.jsx
import { Suspense } from "react";
import ScratchClient from "./ScratchClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScratchClient />
    </Suspense>
  );
}
