import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WifiOff } from "lucide-react"

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <WifiOff className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-2xl font-bold">You're offline</h1>
      <p className="mt-2 text-center text-muted-foreground">
        It looks like you're not connected to the internet. Check your connection and try again.
      </p>
      <div className="mt-6 space-y-4">
        <Button asChild>
          <Link href="/">Try Again</Link>
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Some features of SmartCommuteX are available offline once you've used them before.
        </div>
      </div>
    </div>
  )
}
