import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'

type PopupHeaderProps = {
  title: string;
  onClose: () => void;
}

export const PopupHeader = ({ title, onClose }: PopupHeaderProps) => (
  <div className="flex items-center justify-between p-4 border-b border-white/20">
    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">
      {title}
    </h2>
    <button
      onClick={onClose}
      className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
)

type PopupFooterProps = {
  onClose: () => void;
  onSave: () => void;
  closeText?: string;
  saveText?: string;
}

export const PopupFooter = ({ 
  onClose, 
  onSave, 
  closeText = 'Close', 
  saveText = 'Save' 
}: PopupFooterProps) => (
  <div className="flex justify-end gap-3 p-4 border-t border-white/20">
    <button
      onClick={onClose}
      className="px-4 py-2 text-sm sm:text-base rounded-lg border border-white/20 text-white bg-white/10 hover:bg-black transition-colors"
    >
      {closeText}
    </button>
    <button
      onClick={onSave}
      className="px-4 py-2 text-sm sm:text-base rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
    >
      {saveText}
    </button>
  </div>
)

type ResponsivePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  onSave: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const ResponsivePopup = ({
  isOpen,
  onClose,
  children,
  title,
  onSave,
  size = 'md'
}: ResponsivePopupProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none' // Prevent iOS touch scroll
    } else {
      document.body.style.overflow = 'auto'
      document.body.style.touchAction = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  const maxWidth = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  }[size]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className={`bg-black border border-white/20 rounded-lg shadow-xl w-full ${maxWidth} animate-in fade-in zoom-in duration-200`}>
        <PopupHeader title={title} onClose={onClose} />
        <div className="p-4 sm:p-6 text-white">
          {children}
        </div>
        <PopupFooter onClose={onClose} onSave={onSave} />
      </div>
    </div>
  )
}
