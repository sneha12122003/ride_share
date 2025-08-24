import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentMethods } from "@/components/dashboard/payment-methods"
import { EmergencyContacts } from "@/components/dashboard/emergency-contacts"
import { NotificationPreferences } from "@/components/dashboard/notification-preferences"
import { CalendarIntegration } from "@/components/dashboard/calendar-integration"
import { VoiceCommands } from "@/components/dashboard/voice-commands"
import { LanguageSelector } from "@/components/dashboard/language-selector"
import { AccessibilitySettings } from "@/components/dashboard/accessibility-settings"
import { PwaInstall } from "@/components/dashboard/pwa-install"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and how it's displayed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile settings would go here */}
              <p className="text-sm text-muted-foreground">Profile settings component would be implemented here</p>
            </CardContent>
          </Card>

          <PaymentMethods />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <NotificationPreferences />
          <CalendarIntegration />
          <LanguageSelector />
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <EmergencyContacts />
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control what information is shared with other users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Privacy settings would go here */}
              <p className="text-sm text-muted-foreground">Privacy settings component would be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <VoiceCommands />
          <AccessibilitySettings />
          <PwaInstall />
        </TabsContent>
      </Tabs>
    </div>
  )
}
