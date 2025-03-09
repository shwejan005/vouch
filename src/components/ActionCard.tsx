'use client'
import { QuickActionType } from "@/constants";
import { Card } from "./ui/card"; 
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ActionCard({ action, onClick }: { action: QuickActionType; onClick: () => void }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the actual theme (fallback to system if "system" is selected)
  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!mounted) return null; // Prevent hydration mismatch

  // Dynamic color settings
  const textColor = currentTheme === "dark" ? "text-white" : "text-black";
  const iconTextColor = currentTheme === "dark" ? "text-white" : "text-black";
  const iconBg = currentTheme === "dark" ? "bg-white/10" : "bg-black/10";

  return (
    <Card
      className="group relative overflow-hidden hover:border-red-500 transition-all duration-500 ease-out hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      {/* ACTION GRADIENT */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-100 group-hover:opacity-50 transition-opacity duration-500 ease-out`}
      />

      {/* ACTION CONTENT WRAPPER */}
      <div className="relative p-6 size-full">
        <div className="space-y-3">
          {/* ACTION ICON (Bubble Effect) */}
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg} 
                        group-hover:bg-red-600 group-hover:scale-125 transition-all duration-500 ease-out`}
          >
            <action.icon className={`h-6 w-6 ${iconTextColor} group-hover:text-white transition-all duration-500 ease-out`} />
          </div>

          {/* ACTION DETAILS (Text Expansion) */}
          <div className="space-y-1">
            <h3 className={`font-semibold text-xl ${textColor} group-hover:text-red-600 group-hover:scale-105 transition-all duration-500 ease-out`}>
              {action.title}
            </h3>
            <p className={`text-sm ${textColor}/70 group-hover:scale-105 transition-all duration-500 ease-out`}>
              {action.description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ActionCard;