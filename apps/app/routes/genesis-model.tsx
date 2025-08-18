import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/genesis-model")({
  component: () => (
    <div className="flex flex-1 flex-col gap-4 p-4 2xl:p-8 3xl:p-12 4xl:p-16 w-full">
      <h1 className="text-3xl font-bold mb-4">Genesis Model Test Page</h1>
      <p>
        This is a test page for the Genesis (Model) sidebar item. The sidebar
        and navbar should remain visible.
      </p>
    </div>
  ),
});
