import { FindRideTab } from "@/components/dashboard/tabs/find-ride-tab"
import { AiRideSuggestions } from "@/components/dashboard/ai-ride-suggestions"

export default function FindRidePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find a Ride</h1>
        <p className="text-muted-foreground">Search for available rides that match your route and schedule</p>
      </div>

      <FindRideTab />
      <AiRideSuggestions />
    </div>
  )
}
