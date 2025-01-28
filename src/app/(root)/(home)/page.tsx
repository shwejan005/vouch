"use client"
import { useUserRole } from "@/hooks/useUserRole";

export default function Home() {
  const { isCandidate, isInterviewer } = useUserRole()
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
      { isInterviewer
        ? (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              interviwer blocks
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
