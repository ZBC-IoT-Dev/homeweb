import { LayoutDashboard, Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardView() {
  return (
    <div className="flex w-full flex-col p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-muted p-1">
            <LayoutDashboard />
          </div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Pencil />
            Edit Mode
          </Button>
          <Button>
            <Plus />
            Add Device
          </Button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div></div>
    </div>
  );
}
