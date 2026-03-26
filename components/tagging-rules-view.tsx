"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TaggingRule {
  id: string
  conditions: { field: string; operator: string; value: string }[]
  tag: string
  active: boolean
}

export function TaggingRulesView() {
  const [rules, setRules] = useState<TaggingRule[]>([])
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">Tagging Rules</h1>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-[#1a1a1a] hover:bg-[#333] text-white"
        >
          + New rule
        </Button>
      </div>

      {/* How tagging rules work card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="font-semibold text-foreground mb-2">How tagging rules work</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Tagging rules automatically add labels to incoming tickets based on conditions you define. When a ticket matches <strong>all</strong> conditions in a rule, the specified tag is applied.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">1. Set conditions</h3>
              <p className="text-sm text-muted-foreground">
                Pick a field (<span className="text-foreground">category</span>, <span className="text-foreground">carrier</span>, <span className="text-foreground">customer</span>, etc.), an operator (<span className="text-foreground">equals</span>, <span className="text-foreground">contains</span>, <span className="text-foreground">in</span>), and a value to match against.
              </p>
            </div>

            {/* Step 2 */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">2. Choose a tag</h3>
              <p className="text-sm text-muted-foreground">
                Enter the tag to apply, e.g. <code className="bg-muted px-1 rounded text-foreground">custom:vip</code> or <code className="bg-muted px-1 rounded text-foreground">custom:fragile</code>. Use the <code className="bg-muted px-1 rounded text-foreground">custom:</code> prefix for admin-defined tags.
              </p>
            </div>

            {/* Step 3 */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">3. Automatic matching</h3>
              <p className="text-sm text-muted-foreground">
                New tickets are evaluated against all active rules. Tags are added automatically — these tags can then be used by <strong>routing rules</strong> to assign tickets to the right agent.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rules list or empty state */}
      {rules.length === 0 ? (
        <p className="text-muted-foreground">
          No active tagging rules — click &quot;+ New rule&quot; to create one.
        </p>
      ) : (
        <Card>
          <CardContent className="pt-6">
            {/* Rules table would go here */}
            <div className="space-y-4">
              {rules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-foreground">{rule.tag}</p>
                    <p className="text-sm text-muted-foreground">
                      {rule.conditions.map((c, i) => (
                        <span key={i}>
                          {i > 0 && " AND "}
                          {c.field} {c.operator} {c.value}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded ${rule.active ? 'bg-[#0d9488] text-white' : 'bg-muted text-muted-foreground'}`}>
                      {rule.active ? 'Active' : 'Inactive'}
                    </span>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => setRules(rules.filter(r => r.id !== rule.id))}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* New rule form modal/section could be added here */}
      {showForm && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h2 className="font-semibold text-foreground mb-4">Create New Rule</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const newRule: TaggingRule = {
                id: `rule-${Date.now()}`,
                conditions: [{
                  field: formData.get('field') as string,
                  operator: formData.get('operator') as string,
                  value: formData.get('value') as string,
                }],
                tag: formData.get('tag') as string,
                active: true,
              }
              setRules([...rules, newRule])
              setShowForm(false)
            }}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Field</label>
                  <select 
                    name="field" 
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                    required
                  >
                    <option value="category">category</option>
                    <option value="carrier">carrier</option>
                    <option value="customer">customer</option>
                    <option value="region">region</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Operator</label>
                  <select 
                    name="operator" 
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                    required
                  >
                    <option value="equals">equals</option>
                    <option value="contains">contains</option>
                    <option value="in">in</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Value</label>
                  <input 
                    type="text" 
                    name="value" 
                    placeholder="e.g. dpd"
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Tag</label>
                  <input 
                    type="text" 
                    name="tag" 
                    placeholder="e.g. custom:vip"
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-[#1a1a1a] hover:bg-[#333] text-white">
                  Save Rule
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
