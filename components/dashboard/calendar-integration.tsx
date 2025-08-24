"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar, CalendarPlus, ChromeIcon as Google, ComputerIcon as Microsoft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function CalendarIntegration() {
  const [integrations, setIntegrations] = useState({
    googleCalendar: false,
    outlookCalendar: false,
    appleCalendar: false,
  })

  const [preferences, setPreferences] = useState({
    addRidesToCalendar: true,
    receiveReminders: true,
    syncCancellations: true,
  })

  const handleConnectCalendar = (type: keyof typeof integrations) => {
    // In a real app, this would open OAuth flow to connect the calendar

    // Simulate successful connection
    setIntegrations({
      ...integrations,
      [type]: true,
    })

    toast({
      title: "Calendar connected",
      description: `Your ${type === "googleCalendar" ? "Google Calendar" : type === "outlookCalendar" ? "Outlook Calendar" : "Apple Calendar"} has been connected successfully.`,
    })
  }

  const handleDisconnectCalendar = (type: keyof typeof integrations) => {
    // In a real app, this would revoke access to the calendar

    setIntegrations({
      ...integrations,
      [type]: false,
    })

    toast({
      title: "Calendar disconnected",
      description: `Your ${type === "googleCalendar" ? "Google Calendar" : type === "outlookCalendar" ? "Outlook Calendar" : "Apple Calendar"} has been disconnected.`,
    })
  }

  const handleTogglePreference = (type: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [type]: !preferences[type],
    })

    toast({
      title: "Preference updated",
      description: `Calendar preference has been updated.`,
    })
  }

  const handleAddToCalendar = () => {
    // In a real app, this would add the current ride to the user's calendar

    toast({
      title: "Added to calendar",
      description: "This ride has been added to your calendar.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar Integration</CardTitle>
        <CardDescription>Connect your calendars to manage your rides more efficiently</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Connected Calendars</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <Google className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Google Calendar</p>
                  <p className="text-sm text-muted-foreground">
                    {integrations.googleCalendar ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              {integrations.googleCalendar ? (
                <Button variant="outline" size="sm" onClick={() => handleDisconnectCalendar("googleCalendar")}>
                  Disconnect
                </Button>
              ) : (
                <Button size="sm" onClick={() => handleConnectCalendar("googleCalendar")}>
                  Connect
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Microsoft className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Outlook Calendar</p>
                  <p className="text-sm text-muted-foreground">
                    {integrations.outlookCalendar ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              {integrations.outlookCalendar ? (
                <Button variant="outline" size="sm" onClick={() => handleDisconnectCalendar("outlookCalendar")}>
                  Disconnect
                </Button>
              ) : (
                <Button size="sm" onClick={() => handleConnectCalendar("outlookCalendar")}>
                  Connect
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Apple Calendar</p>
                  <p className="text-sm text-muted-foreground">
                    {integrations.appleCalendar ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              {integrations.appleCalendar ? (
                <Button variant="outline" size="sm" onClick={() => handleDisconnectCalendar("appleCalendar")}>
                  Disconnect
                </Button>
              ) : (
                <Button size="sm" onClick={() => handleConnectCalendar("appleCalendar")}>
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Calendar Preferences</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="add-rides">Add rides to calendar</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically add booked rides to your connected calendars
                </p>
              </div>
              <Switch
                id="add-rides"
                checked={preferences.addRidesToCalendar}
                onCheckedChange={() => handleTogglePreference("addRidesToCalendar")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reminders">Calendar reminders</Label>
                <p className="text-sm text-muted-foreground">Receive calendar reminders for upcoming rides</p>
              </div>
              <Switch
                id="reminders"
                checked={preferences.receiveReminders}
                onCheckedChange={() => handleTogglePreference("receiveReminders")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="cancellations">Sync cancellations</Label>
                <p className="text-sm text-muted-foreground">Update calendar when rides are cancelled or rescheduled</p>
              </div>
              <Switch
                id="cancellations"
                checked={preferences.syncCancellations}
                onCheckedChange={() => handleTogglePreference("syncCancellations")}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddToCalendar}>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Add Current Ride to Calendar
        </Button>
      </CardFooter>
    </Card>
  )
}
