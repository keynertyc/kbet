import React from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Prediction</h2>
        <hr className="border-gray-300" />
        <div className="max-h-96 overflow-y-auto">
          <div className="mb-4">{children}</div>
        </div>
        <hr className="border-gray-300" />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
