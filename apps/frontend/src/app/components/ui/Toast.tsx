import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

export interface ToastType {
  id: string;
  type: "success" | "error";
  text: string;
}

export function ToastStyles() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes toast-shrink {
        from { width: 100%; }
        to { width: 0%; }
      }
      @keyframes toast-slide-in {
        from { transform: translateX(120%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .animate-toast-in {
        animation: toast-slide-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .animate-toast-progress {
        animation: toast-shrink 4000ms linear forwards;
      }
    `}} />
  );
}

export function ToastItem({ toast, onClose }: { toast: ToastType; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`relative flex items-center justify-between p-4 border shadow-2xl font-poppins text-xs pointer-events-auto overflow-hidden animate-toast-in ${
      toast.type === "success" 
        ? "bg-emerald-950/95 border-emerald-500/40 text-emerald-300" 
        : "bg-red-950/95 border-red-500/40 text-red-300"
    }`}>
      <div className="flex items-center gap-3">
        {toast.type === "success" 
          ? <FaCheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
          : <FaExclamationCircle size={16} className="text-red-400 flex-shrink-0" />
        }
        <span className="font-medium tracking-wide leading-relaxed">{toast.text}</span>
      </div>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 p-1 flex-shrink-0 ml-3">
        <FaTimes size={12} />
      </button>
      
      {/* Toast Progress Bar */}
      <div 
        className={`absolute bottom-0 left-0 h-1 animate-toast-progress ${
          toast.type === "success" ? "bg-emerald-400" : "bg-red-400"
        }`}
        style={{ width: "100%" }}
      />
    </div>
  );
}
