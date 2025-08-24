"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    rideUpdates: true,
    chatMessages: true,
    rideReminders: true,
    promotions: false,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
  })

  const [reminderTiming, setReminderTiming] = useState("1hour")

  const handleTogglePreference = (preference: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [preference]: !preferences[preference],
    })

    toast({
      title: "Notification preference updated",
      description: `${preference} notifications have been ${preferences[preference] ? "disabled" : "enabled"}.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Types</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ride-updates">Ride Updates</Label>
                <p className="text-sm text-muted-foreground">Notifications about ride status changes</p>
              </div>
              <Switch
                id="ride-updates"
                checked={preferences.rideUpdates}
                onCheckedChange={() => handleTogglePreference("rideUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="chat-messages">Chat Messages</Label>
                <p className="text-sm text-muted-foreground">Notifications for new chat messages</p>
              </div>
              <Switch
                id="chat-messages"
                checked={preferences.chatMessages}
                onCheckedChange={() => handleTogglePreference("chatMessages")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ride-reminders">Ride Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders before your scheduled rides</p>
              </div>
              <Switch
                id="ride-reminders"
                checked={preferences.rideReminders}
                onCheckedChange={() => handleTogglePreference("rideReminders")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions">Promotions & News</Label>
                <p className="text-sm text-muted-foreground">Updates about promotions and new features</p>
              </div>
              <Switch
                id="promotions"
                checked={preferences.promotions}
                onCheckedChange={() => handleTogglePreference("promotions")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Channels</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferences.emailNotifications}
                onCheckedChange={() => handleTogglePreference("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
              </div>
              <Switch
                id="push-notifications"
                checked={preferences.pushNotifications}
                onCheckedChange={() => handleTogglePreference("pushNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={preferences.smsNotifications}
                onCheckedChange={() => handleTogglePreference("smsNotifications")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Reminder Timing</h3>

          <RadioGroup value={reminderTiming} onValueChange={setReminderTiming} className="space-y-3">
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="24hours" id="24hours" />
              <Label htmlFor="24hours" className="flex-1 cursor-pointer">
                24 hours before ride
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="1hour" id="1hour" />
              <Label htmlFor="1hour" className="flex-1 cursor-pointer">
                1 hour before ride
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="30mins" id="30mins" />
              <Label htmlFor="30mins" className="flex-1 cursor-pointer">
                30 minutes before ride
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="15mins" id="15mins" />
              <Label htmlFor="15mins" className="flex-1 cursor-pointer">
                15 minutes before ride
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
