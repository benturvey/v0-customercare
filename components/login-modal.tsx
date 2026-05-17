"use client"

interface LoginModalProps {
  onSignIn: () => void
}

export function LoginModal({ onSignIn }: LoginModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-8">
        <h1 className="text-xl font-bold text-foreground mb-2">Customer Care Portal</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in with your organisation account to continue.
        </p>
        <button
          onClick={onSignIn}
          className="w-full bg-[#2d4fb5] hover:bg-[#243e99] text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors"
        >
          Sign in with Microsoft
        </button>
      </div>
    </div>
  )
}
