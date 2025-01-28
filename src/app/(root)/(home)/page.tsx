"use client"
import ActionCard from "@/components/ui/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";

export default function Home() {
  const { isCandidate, isInterviewer } = useUserRole()

  const handleQuickAction = ( title: string) => {
    console.log('hello')
  }
  return (
    <div className="container max-w-screen mx-auto p-6">
      <section className="rounded-lg bg-card p-6 shadow-sm mb-10 bg-red-700 text-white">
        <h1 className=" text-3xl font-bold">
          Welcome back
        </h1>
        <p>
          {isInterviewer 
            ? "Manage your meetings and review candidates efficiently"
            : "Access your upcoming meetings with ease"
          }
        </p>
      </section>
      {isInterviewer
        ? (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {QUICK_ACTIONS.map((action) => (
                <ActionCard
                  key = {action.title}
                  action = {action}
                  onClick = {() => handleQuickAction(action.title)}
                />
              ))}
            </div>
          </div>
        ) 
        : (
          <div>
            candidate blocks
          </div>
        )
      }
    </div>
  );
}
