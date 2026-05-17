"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogOffOption {
  id: string
  label: string
  description?: string
  emoji: string
}

const logOffOptions: LogOffOption[] = [
  { id: "comfort-break",   label: "Comfort Break",   emoji: "🚻" },
  { id: "official-break",  label: "Official Break",  description: "Use this when taking your lunch or tea breaks", emoji: "☕" },
  { id: "meeting",         label: "Meeting",         description: "Use this when attending departmental or company wide meetings", emoji: "👥" },
  { id: "admin-work",      label: "Admin Work",      description: "Use this when you are working on customer reports, back office tasks or any admin work", emoji: "📋" },
  { id: "coaching",        label: "Coaching / 1:1",  description: "Use this when attending coaching, mentoring, 1:1's or appraisals", emoji: "📊" },
  { id: "training",        label: "Training",        description: "Use this when attending training", emoji: "📚" },
  { id: "system-issues",   label: "System Issues",   description: "Use this when system or network issues prevent you from doing your work", emoji: "⚠️" },
  { id: "end-of-shift",    label: "End of Shift",    description: "Use this when your shift has ended", emoji: "🏠" },
]

interface LogOffModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LogOffModal({ open, onOpenChange }: LogOffModalProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSetUnavailable = () => {
    if (selected) {
      onOpenChange(false)
      setSelected(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 pt-8 pb-4 px-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
            <LogOut className="h-5 w-5 text-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Log Off</h2>
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Mark yourself as unavailable to stop receiving queries
          </p>
        </div>

        {/* Options list */}
        <div className="flex flex-col gap-2 px-4 pb-4 max-h-[60vh] overflow-y-auto">
          {logOffOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={cn(
                "flex items-start gap-3 w-full text-left px-4 py-3 rounded-xl border transition-colors",
                selected === option.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:bg-muted/50"
              )}
            >
              <span className="text-xl shrink-0 mt-0.5">{option.emoji}</span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{option.label}</span>
                {option.description && (
                  <span className="text-xs text-muted-foreground leading-relaxed mt-0.5">{option.description}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 pb-6 pt-2">
          <Button
            onClick={handleSetUnavailable}
            disabled={!selected}
            className="w-full h-12 text-sm font-semibold bg-muted text-foreground hover:bg-muted/80 disabled:opacity-50"
            variant="secondary"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Set as Unavailable
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
