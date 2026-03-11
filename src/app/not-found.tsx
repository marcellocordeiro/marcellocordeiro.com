import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex items-center justify-center gap-4 text-center">
        <h1>404</h1>
        <Separator orientation="vertical" />
        <h2>This page could not be found.</h2>
      </div>
    </div>
  );
}
