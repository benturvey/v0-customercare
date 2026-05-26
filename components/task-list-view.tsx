"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, CheckCircle2, Circle, ChevronDown, MoreHorizontal, Flag, Calendar, User, Repeat, MessageSquare, Send, ChevronUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Priority = "low" | "medium" | "high"
type Status = "todo" | "in-progress" | "done"
type Recurrence = "none" | "daily" | "weekly" | "monthly"

interface Comment {
  id: string
  text: string
  user: string
  timestamp: string
}

interface SubTask {
  taskNo: number
  carriers: string[]
  description: string
}

interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  assignee: string
  raisedDate: string
  raisedBy: string
  carriers: string[]
  dueDate: string
  createdAt: string
  recurrence: Recurrence
  comments: Comment[]
  subTasks: SubTask[]
}

const RECURRENCE_CONFIG: Record<Recurrence, { label: string; className: string }> = {
  none:    { label: "No Repeat",  className: "" },
  daily:   { label: "Daily",     className: "bg-violet-100 text-violet-700" },
  weekly:  { label: "Weekly",    className: "bg-cyan-100 text-cyan-700" },
  monthly: { label: "Monthly",   className: "bg-orange-100 text-orange-700" },
}

const CARRIERS = [
  "Evri", "DPD", "DPD Local", "Royal Mail", "DHL", "FedEx", "UPS", "Yodel", "Parcelforce", "Amazon Logistics", "Other",
]

const PRIORITY_CONFIG: Record<Priority, { label: string; className: string }> = {
  low:    { label: "Low",    className: "bg-slate-100 text-slate-600" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-700" },
  high:   { label: "High",   className: "bg-red-100 text-red-700" },
}

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  "todo":        { label: "To Do",       className: "bg-slate-100 text-slate-600" },
  "in-progress": { label: "In Progress", className: "bg-blue-100 text-blue-700" },
  "done":        { label: "Done",        className: "bg-green-100 text-green-700" },
}

function generateId() {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function generateCommentId() {
  return `comment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function formatTimestamp(isoString: string) {
  const date = new Date(isoString)
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

interface TaskRowProps {
  task: Task
  onStatusToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Task>) => void
  onAddComment: (taskId: string, comment: Comment) => void
}

function TaskRow({ task, onStatusToggle, onDelete, onUpdate, onAddComment }: TaskRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [newComment, setNewComment] = useState("")
  const isDone = task.status === "done"

  const handleAddComment = () => {
    if (!newComment.trim()) return
    onAddComment(task.id, {
      id: generateCommentId(),
      text: newComment.trim(),
      user: "Alex Lucy",
      timestamp: new Date("2026-05-14T10:46:00").toISOString(),
    })
    setNewComment("")
  }

  return (
    <div className={cn("border rounded-lg bg-background transition-colors", isDone && "opacity-60")}>
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => onStatusToggle(task.id)} className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
          {isDone
            ? <CheckCircle2 className="h-5 w-5 text-green-500" />
            : <Circle className="h-5 w-5" />
          }
        </button>

        <span className={cn("flex-1 text-sm font-medium text-foreground", isDone && "line-through text-muted-foreground")}>
          {task.title}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", PRIORITY_CONFIG[task.priority].className)}>
            {PRIORITY_CONFIG[task.priority].label}
          </span>
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", STATUS_CONFIG[task.status].className)}>
            {STATUS_CONFIG[task.status].label}
          </span>
          {task.assignee && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              {task.assignee}
            </span>
          )}
          {task.dueDate && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {task.dueDate}
            </span>
          )}
          {task.recurrence !== "none" && (
            <span className={cn("flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full", RECURRENCE_CONFIG[task.recurrence].className)}>
              <Repeat className="h-3 w-3" />
              {RECURRENCE_CONFIG[task.recurrence].label}
            </span>
          )}
          {task.comments.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageSquare className="h-3 w-3" />
              {task.comments.length}
            </span>
          )}
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onUpdate(task.id, { status: "todo" })}>Mark as To Do</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate(task.id, { status: "in-progress" })}>Mark as In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate(task.id, { status: "done" })}>Mark as Done</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive focus:text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isExpanded && (
        <div className="px-12 pb-4 border-t space-y-3 pt-3">
          <div className="grid grid-cols-1 gap-2">
            <Textarea
              placeholder="Add a description..."
              value={task.description}
              onChange={(e) => onUpdate(task.id, { description: e.target.value })}
              className="text-sm resize-none min-h-[72px]"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground font-medium">Raised Date</label>
              <Input
                type="date"
                value={task.raisedDate ?? ""}
                onChange={(e) => onUpdate(task.id, { raisedDate: e.target.value })}
                className="text-xs h-7 w-36"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground font-medium">Raised By</label>
              <Input
                value={task.raisedBy ?? ""}
                onChange={(e) => onUpdate(task.id, { raisedBy: e.target.value })}
                placeholder="Name"
                className="text-xs h-7 w-32"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground font-medium">Priority</label>
              <select
                value={task.priority}
                onChange={(e) => onUpdate(task.id, { priority: e.target.value as Priority })}
                className="text-xs border rounded px-2 py-1.5 bg-background text-foreground"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground font-medium">Status</label>
              <select
                value={task.status}
                onChange={(e) => onUpdate(task.id, { status: e.target.value as Status })}
                className="text-xs border rounded px-2 py-1.5 bg-background text-foreground"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground font-medium">Assignee</label>
              <Input
                value={task.assignee}
                onChange={(e) => onUpdate(task.id, { assignee: e.target.value })}
                placeholder="Name"
                className="text-xs h-7 w-32"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground font-medium">Carrier</label>
              <CarrierMultiSelect
                value={task.carriers ?? []}
                onChange={(v) => onUpdate(task.id, { carriers: v })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground font-medium">Due Date</label>
              <Input
                type="date"
                value={task.dueDate}
                onChange={(e) => onUpdate(task.id, { dueDate: e.target.value })}
                className="text-xs h-7 w-36"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground font-medium">Recurrence</label>
              <select
                value={task.recurrence}
                onChange={(e) => onUpdate(task.id, { recurrence: e.target.value as Recurrence })}
                className="text-xs border rounded px-2 py-1.5 bg-background text-foreground"
              >
                <option value="none">No Repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Sub Tasks */}
          {task.subTasks && task.subTasks.length > 0 && (
            <div className="border-t pt-3">
              <span className="text-xs font-semibold text-foreground block mb-2">Sub Tasks</span>
              <div className="grid grid-cols-[40px_1fr_1fr] gap-2 px-1 mb-1">
                <span className="text-[10px] font-semibold uppercase text-muted-foreground">No.</span>
                <span className="text-[10px] font-semibold uppercase text-muted-foreground">Carrier</span>
                <span className="text-[10px] font-semibold uppercase text-muted-foreground">Description</span>
              </div>
              {task.subTasks.map((st) => (
                <div key={st.taskNo} className="grid grid-cols-[40px_1fr_1fr] gap-2 items-center bg-muted/40 rounded-md px-1 py-2 mb-1">
                  <span className="text-xs font-medium text-center text-muted-foreground">{st.taskNo}</span>
                  <span className="text-xs text-foreground">{st.carriers.join(", ") || "—"}</span>
                  <span className="text-xs text-foreground">{st.description || "—"}</span>
                </div>
              ))}
            </div>
          )}

          {/* Comments Section */}
          <div className="border-t pt-3 mt-3">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-foreground">Comments</span>
              {task.comments.length > 0 && (
                <span className="text-xs text-muted-foreground">({task.comments.length})</span>
              )}
            </div>

            {/* Comments Trail */}
            {task.comments.length > 0 && (
              <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="bg-muted/50 rounded-md px-3 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-foreground">{comment.user}</span>
                      <span className="text-[10px] text-muted-foreground">{formatTimestamp(comment.timestamp)}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <div className="flex gap-2">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="text-sm flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleAddComment()
                  }
                }}
              />
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface AddTaskFormProps {
  onAdd: (task: Task) => void
  onCancel: () => void
}

function CarrierMultiSelect({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false)
  const toggle = (carrier: string) => {
    onChange(value.includes(carrier) ? value.filter((c) => c !== carrier) : [...value, carrier])
  }
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between gap-2 text-xs border rounded px-2 py-1.5 bg-background text-foreground min-w-[160px] w-full"
      >
        <span className="truncate">
          {value.length === 0 ? "Select carriers..." : value.join(", ")}
        </span>
        <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[180px] rounded-md border bg-background shadow-md">
          {CARRIERS.map((c) => (
            <label key={c} className="flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-muted cursor-pointer">
              <input
                type="checkbox"
                checked={value.includes(c)}
                onChange={() => toggle(c)}
                className="rounded"
              />
              {c}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function AddTaskForm({ onAdd, onCancel }: AddTaskFormProps) {
  const [title, setTitle] = useState("")
  const [raisedDate, setRaisedDate] = useState(new Date().toISOString().slice(0, 10))
  const [raisedBy, setRaisedBy] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")
  const [carriers, setCarriers] = useState<string[]>([])
  const [dueDate, setDueDate] = useState("")
  const [recurrence, setRecurrence] = useState<Recurrence>("none")
  const [subTasks, setSubTasks] = useState<SubTask[]>([])

  const addSubTask = () => {
    setSubTasks((prev) => [...prev, { taskNo: prev.length + 1, carriers: [], description: "" }])
  }

  const updateSubTask = (index: number, updates: Partial<SubTask>) => {
    setSubTasks((prev) => prev.map((st, i) => i === index ? { ...st, ...updates } : st))
  }

  const removeSubTask = (index: number) => {
    setSubTasks((prev) => prev.filter((_, i) => i !== index).map((st, i) => ({ ...st, taskNo: i + 1 })))
  }

  const handleSubmit = () => {
    if (!title.trim()) return
    onAdd({
      id: generateId(),
      title: title.trim(),
      description: "",
      priority,
      status: "todo",
      assignee: raisedBy,
      raisedDate,
      raisedBy,
      carriers,
      dueDate,
      recurrence,
      createdAt: new Date().toISOString(),
      comments: [],
      subTasks,
    })
  }

  return (
    <div className="border rounded-lg bg-background p-5 space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Add Task</h3>

      {/* Row 1 - Title */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">Task Title <span className="text-red-500">*</span></label>
        <Input
          autoFocus
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Escape") onCancel() }}
          className="text-sm"
        />
      </div>

      {/* Row 2 - Raised Date, Raised By, Priority */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Raised Date</label>
          <Input
            type="date"
            value={raisedDate}
            onChange={(e) => setRaisedDate(e.target.value)}
            className="text-xs h-8"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Raised By</label>
          <Input
            value={raisedBy}
            onChange={(e) => setRaisedBy(e.target.value)}
            placeholder="Name..."
            className="text-xs h-8"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="text-xs border rounded px-2 py-1.5 bg-background text-foreground h-8"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Row 3 - Carrier, Due Date, Recurrence */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Carrier</label>
          <CarrierMultiSelect value={carriers} onChange={setCarriers} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Due Date</label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="text-xs h-8"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Recurrence</label>
          <select
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value as Recurrence)}
            className="text-xs border rounded px-2 py-1.5 bg-background text-foreground h-8"
          >
            <option value="none">No Repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Sub Tasks */}
      <div className="border-t pt-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Sub Tasks</span>
          <Button size="sm" variant="outline" onClick={addSubTask} type="button">
            <Plus className="h-3 w-3 mr-1" />
            Add Sub Task
          </Button>
        </div>
        {subTasks.length > 0 && (
          <div className="space-y-2">
            {/* Header row */}
            <div className="grid grid-cols-[40px_1fr_1fr_32px] gap-2 px-2">
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">No.</span>
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">Carrier</span>
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">Description</span>
              <span />
            </div>
            {subTasks.map((st, index) => (
              <div key={index} className="grid grid-cols-[40px_1fr_1fr_32px] gap-2 items-center bg-muted/40 rounded-md px-2 py-2">
                <span className="text-xs font-semibold text-muted-foreground text-center">{st.taskNo}</span>
                <CarrierMultiSelect
                  value={st.carriers}
                  onChange={(v) => updateSubTask(index, { carriers: v })}
                />
                <Input
                  placeholder="Description..."
                  value={st.description}
                  onChange={(e) => updateSubTask(index, { description: e.target.value })}
                  className="text-xs h-8"
                />
                <button
                  type="button"
                  onClick={() => removeSubTask(index)}
                  className="flex items-center justify-center h-7 w-7 rounded hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t">
        <Button size="sm" onClick={handleSubmit} disabled={!title.trim()}>Add Task</Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

const INITIAL_TASKS: Task[] = [
  {
    id: "task-sample-1",
    title: "Follow up on delayed Evri shipments",
    description: "Check status of shipments delayed in North West region",
    priority: "high",
    status: "in-progress",
    assignee: "Alex Lucy",
    raisedDate: "2026-05-14",
    raisedBy: "Alex Lucy",
    carriers: ["Evri"],
    dueDate: "2026-05-27",
    recurrence: "daily",
    createdAt: "2026-05-14T10:46:00.000Z",
    comments: [
      {
        id: "comment-1",
        text: "Contacted Evri support, awaiting response",
        user: "Alex Lucy",
        timestamp: "2026-05-14T10:46:00.000Z"
      }
    ],
    subTasks: []
  },
  {
    id: "task-sample-2",
    title: "Review customer escalations",
    description: "Process pending customer escalations from last week",
    priority: "medium",
    status: "todo",
    assignee: "Alex Lucy",
    raisedDate: "2026-05-13",
    raisedBy: "Alex Lucy",
    carriers: [],
    dueDate: "2026-05-28",
    recurrence: "weekly",
    createdAt: "2026-05-13T09:00:00.000Z",
    comments: [],
    subTasks: []
  }
]

export function TaskListView({ onLogOut }: { onLogOut?: () => void }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [showAddForm, setShowAddForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<Status | "all" | "due-today" | "uncompleted" | "due-future">("all")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load tasks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tasks")
    if (saved) {
      try {
        const parsedTasks = JSON.parse(saved)
        if (parsedTasks.length > 0) {
          setTasks(parsedTasks)
        }
      } catch (e) {
        console.error("Failed to load tasks from localStorage:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  const handleAdd = (task: Task) => {
    setTasks((prev) => [task, ...prev])
    setShowAddForm(false)
  }

  const handleStatusToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t
      )
    )
  }

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const handleUpdate = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  const handleAddComment = (taskId: string, comment: Comment) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, comments: [...t.comments, comment] } : t
      )
    )
  }

  const filteredTasks = (() => {
    const today = new Date().toISOString().slice(0, 10)
    switch (filterStatus) {
      case "all": return tasks
      case "due-today": return tasks.filter((t) => t.dueDate === today)
      case "uncompleted": return tasks.filter((t) => t.status !== "done")
      case "due-future": return tasks.filter((t) => t.dueDate && t.dueDate > today)
      default: return tasks.filter((t) => t.status === filterStatus)
    }
  })()

  const today = new Date().toISOString().slice(0, 10)
  const counts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
    "due-today": tasks.filter((t) => t.dueDate === today).length,
    uncompleted: tasks.filter((t) => t.status !== "done").length,
    "due-future": tasks.filter((t) => t.dueDate && t.dueDate > today).length,
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-background shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-foreground">Task List</h1>
          <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
            {tasks.length} task{tasks.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={() => setShowAddForm(true)} className="flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
          <UserDropdownMenu onLogOut={onLogOut} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {!isLoaded ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-muted-foreground">Loading tasks...</p>
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 mb-6 border-b border-border flex-wrap">
              {([
                { key: "all",         label: "All" },
                { key: "due-today",   label: "Due Today" },
                { key: "uncompleted", label: "Uncompleted" },
                { key: "due-future",  label: "Due in Future" },
                { key: "todo",        label: STATUS_CONFIG["todo"].label },
                { key: "in-progress", label: STATUS_CONFIG["in-progress"].label },
                { key: "done",        label: STATUS_CONFIG["done"].label },
              ] as const).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilterStatus(key)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                    filterStatus === key
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                  <span className={cn(
                    "ml-2 text-xs px-1.5 py-0.5 rounded-full",
                    filterStatus === key ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    {counts[key]}
                  </span>
                </button>
              ))}
            </div>

            {/* Add Form */}
            {showAddForm && (
              <div className="mb-4">
                <AddTaskForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
              </div>
            )}

            {/* Task List */}
            <div className="space-y-2">
              {filteredTasks.length === 0 && !showAddForm && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Flag className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {filterStatus === "all" ? "No tasks yet" :
                     filterStatus === "due-today" ? "No tasks due today" :
                     filterStatus === "uncompleted" ? "No uncompleted tasks" :
                     filterStatus === "due-future" ? "No tasks due in the future" :
                     `No ${STATUS_CONFIG[filterStatus as Status]?.label ?? filterStatus} tasks`}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {filterStatus === "all" ? "Add your first task to get started." : "Try switching to a different filter."}
                  </p>
                  {filterStatus === "all" && (
                    <Button size="sm" variant="outline" onClick={() => setShowAddForm(true)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Task
                    </Button>
                  )}
                </div>
              )}
              {filteredTasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onStatusToggle={handleStatusToggle}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  onAddComment={handleAddComment}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
