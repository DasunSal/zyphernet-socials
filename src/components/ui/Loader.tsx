interface LoaderProps {
  variant?: 'page' | 'component' | 'button';
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

function Loader({ 
  variant = 'component', 
  size = 'medium',
  text,
  className = ''
}: LoaderProps) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const variants = {
    page: (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <svg className={`animate-spin text-white ${sizeClasses[size]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {text && <p className="text-white text-sm">{text}</p>}
        </div>
      </div>
    ),
    component: (
      <div className="flex flex-col items-center justify-center p-4 space-y-2">
        <svg className={`animate-spin text-white ${sizeClasses[size]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {text && <p className="text-white text-sm">{text}</p>}
      </div>
    ),
    button: (
      <svg className={`animate-spin ${sizeClasses.small} ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    )
  };

  return variants[variant];
}

export default Loader; // Default export of the Loader component
