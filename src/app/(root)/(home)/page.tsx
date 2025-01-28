"use client"
import ActionCard from "@/components/ui/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter()
  const { isCandidate, isInterviewer, isLoading } = useUserRole()

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<"start" | "join">()

  const interviews = useQuery(api.interviews.getAllInterviews)


  const handleQuickAction = ( title: string) => {
    switch (title) {
      case "start":
        setModalType("start")
        setShowModal(true)
        break
      case "join":
        setModalType("join")
        setShowModal(true)
        break
      default:
        router.push(`/${title.toLowerCase()}`)
    }
  }

  if( isLoading ) return <p>Loading...</p>
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
