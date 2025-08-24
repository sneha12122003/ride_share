"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Plus, Trash2, UserPlus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface EmergencyContact {
  id: string
  name: string
  phone: string
  email?: string
  relation?: string
}

export function EmergencyContacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: "1",
      name: "Jane Doe",
      phone: "+1 (555) 123-4567",
      email: "jane@example.com",
      relation: "Spouse",
    },
  ])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newContact, setNewContact] = useState<Omit<EmergencyContact, "id">>({
    name: "",
    phone: "",
    email: "",
    relation: "",
  })

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would call your API to add the contact
    // and then update the state with the response

    const contact: EmergencyContact = {
      id: `${contacts.length + 1}`,
      ...newContact,
    }

    setContacts([...contacts, contact])
    setIsAddDialogOpen(false)
    setNewContact({
      name: "",
      phone: "",
      email: "",
      relation: "",
    })

    toast({
      title: "Emergency contact added",
      description: `${contact.name} has been added as an emergency contact.`,
    })
  }

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id))

    toast({
      title: "Emergency contact removed",
      description: "The emergency contact has been removed.",
    })
  }

  const handleTriggerEmergency = () => {
    // In a real app, this would trigger an emergency alert
    // to the user's emergency contacts

    toast({
      title: "Emergency alert sent",
      description: "Your emergency contacts have been notified with your current location.",
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
        <CardDescription>Manage your emergency contacts for safety during rides</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm">{contact.phone}</p>
                  {contact.email && <p className="text-sm text-muted-foreground">{contact.email}</p>}
                  {contact.relation && (
                    <span className="text-xs text-muted-foreground">Relation: {contact.relation}</span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleRemoveContact(contact.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <UserPlus className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No emergency contacts</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Add emergency contacts to enhance your safety during rides
              </p>
            </div>
          )}
        </div>

        {contacts.length > 0 && (
          <div className="mt-6">
            <Button variant="destructive" className="w-full" onClick={handleTriggerEmergency}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Trigger Emergency Alert
            </Button>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              This will send an alert with your current location to all your emergency contacts
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Emergency Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
              <DialogDescription>
                Add a new emergency contact who will be notified in case of an emergency
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddContact}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relation">Relation (Optional)</Label>
                  <Input
                    id="relation"
                    value={newContact.relation}
                    onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                    placeholder="Spouse, Parent, Friend, etc."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Contact</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
