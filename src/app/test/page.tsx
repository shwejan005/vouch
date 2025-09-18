"use client";
import { useEffect, useState } from "react";

type ToastType = {
  id: number;
  message: string;
  type: "success" | "error";
};

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`px-4 py-2 rounded-lg shadow-lg text-white transition-all duration-500 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}

export default function Page() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const newToast: ToastType = {
        id: Date.now(),
        message:
          document.visibilityState === "visible"
            ? "Tab is Active ✅"
            : "Tab is Inactive ❌",
        type: document.visibilityState === "visible" ? "success" : "error",
      };

      document.title = document.visibilityState === "visible" ? "Active" : "Inactive";

      // Add new toast
      setToasts((prev) => [...prev, newToast]);

      // Remove it after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 5000);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Run once on mount
    handleVisibilityChange();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div>
      <h1>Switch tabs and watch stacked custom toasts 🔄</h1>

      {/* Toast container */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 items-end">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </div>
  );
}
