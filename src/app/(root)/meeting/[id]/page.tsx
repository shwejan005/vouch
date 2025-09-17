"use client";

import LoaderUI from "@/components/ui/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function MeetingPage() {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);

  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [inactivePopup, setInactivePopup] = useState<string | null>(null);

  // only candidate broadcasts tab inactive
  useEffect(() => {
    if (!call || !user) return;

    const role = (user.publicMetadata?.role as string) || "unknown";

    const handleVisibility = () => {
      if (role === "candidate" && document.visibilityState !== "visible") {
        call.sendCustomEvent({
          type: "tab_inactive",
          payload: {
            user: user.fullName || user.username || "Candidate",
            role: "candidate",
          },
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [call, user]);

  // only interviewer sees popup when candidate goes inactive
  useEffect(() => {
    if (!call || !user) return;

    const role = (user.publicMetadata?.role as string) || "unknown";

    const handleCustomEvent = (event: any) => {
      if (role === "interviewer" && event.type === "tab_inactive" && event.payload.role === "candidate") {
        setInactivePopup(`${event.payload.user} switched tabs or minimized window`);
      }
    };

    call.on("custom", handleCustomEvent);
    return () => {
      call.off("custom", handleCustomEvent);
    };
  }, [call, user]);

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

        <Dialog open={!!inactivePopup} onOpenChange={() => setInactivePopup(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>⚠️ Tab Inactive</DialogTitle>
            </DialogHeader>
            <p>{inactivePopup}</p>
          </DialogContent>
        </Dialog>
      </StreamTheme>
    </StreamCall>
  );
}
export default MeetingPage;
