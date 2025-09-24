"use client";

import LoaderUI from "@/components/ui/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api"; 

export default function MeetingPage() {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);

  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [inactivePopup, setInactivePopup] = useState<string | null>(null);

  const clerkId = user?.id ?? null;

  // queries
  const interviewDoc = useQuery(
    api.interviews.getInterviewByStreamCallId,
    call ? { streamCallId: call.id } : "skip"
  );

  const candidateDoc = useQuery(
    api.users.getUserByClerkId,
    interviewDoc ? { clerkId: interviewDoc.candidateId } : "skip"
  );

  const setActiveStatus = useMutation(api.users.setActiveStatus);
  const prevCandidateActive = useRef<boolean | undefined>(undefined);

  // update own active status
  useEffect(() => {
    if (!clerkId) return;
    const update = () => {
      const isActive = document.visibilityState === "visible";
      setActiveStatus({ clerkId, isActive }).catch(() => {});
    };
    document.addEventListener("visibilitychange", update);
    update();
    return () => document.removeEventListener("visibilitychange", update);
  }, [clerkId, setActiveStatus]);

  // interviewer detects candidate tab switch
  useEffect(() => {
    if (!interviewDoc || !clerkId) {
      prevCandidateActive.current = undefined;
      return;
    }

    const amInterviewer =
      Array.isArray(interviewDoc.interviewerIds) &&
      interviewDoc.interviewerIds.includes(clerkId);

    if (!amInterviewer) {
      prevCandidateActive.current = undefined;
      return;
    }

    const prev = prevCandidateActive.current;
    const curr = candidateDoc?.isActive;

    prevCandidateActive.current = curr;

    if (prev === undefined) return;
    if (prev === true && curr === false) {
      const who = candidateDoc?.name || candidateDoc?.email || "Candidate";
      setInactivePopup(`${who} switched tabs or minimized window`);
      setTimeout(() => setInactivePopup(null), 5000); // auto hide after 5s
    }
  }, [candidateDoc?.isActive, interviewDoc, clerkId]);

  if (!isLoaded || isCallLoading) return <LoaderUI />;

  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}

        {/* Toast-style popup */}
        {inactivePopup && (
          <div className="fixed bottom-6 right-6 bg-white border border-gray-200 shadow-xl rounded-xl p-4 w-80 animate-in fade-in slide-in-from-bottom-5">
            <p className="font-semibold text-red-600">⚠️ Tab Inactive</p>
            <p className="text-sm text-gray-700 mt-1">{inactivePopup}</p>
          </div>
        )}
      </StreamTheme>
    </StreamCall>
  );
}
