"use client"
import { useState } from 'react'
import { ResponsivePopup } from '@/components/ui/Popup'

const ExampleUsage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    console.log('Saving changes...')
    setIsOpen(false)
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
      >
        Open Custom Popup
      </button>

      <ResponsivePopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        title="Customizable Popup"
        size="lg"
      >
        <p className="text-base sm:text-lg">
          Custom content area with full control over children components.
          Add forms, images, or any other React components here.
        </p>
      </ResponsivePopup>
    </div>
  )
}
export default ExampleUsage;