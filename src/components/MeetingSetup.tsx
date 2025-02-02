"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CameraIcon, MicIcon, SettingsIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type React from "react"; // Import React

function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [isCameraDisabled, setIsCameraDisabled] = useState(true);
  const [isMicDisabled, setIsMicDisabled] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const call = useCall();

  if (!call) return null;

  useEffect(() => {
    if (isCameraDisabled) call.camera.disable();
    else call.camera.enable();
  }, [isCameraDisabled, call.camera]);

  useEffect(() => {
    if (isMicDisabled) call.microphone.disable();
    else call.microphone.enable();
  }, [isMicDisabled, call.microphone]);

  const handleJoin = async () => {
    setIsJoining(true);
    await call.join();
    onSetupComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-background/90">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1200px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* VIDEO PREVIEW CONTAINER */}
          <motion.div
            className="md:col-span-1 p-6 rounded-2xl bg-card shadow-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              Camera Preview
            </h1>
            <p className="text-sm text-muted-foreground mb-4">Make sure you look your best!</p>

            {/* VIDEO PREVIEW */}
            <motion.div
              className="aspect-video rounded-xl overflow-hidden bg-muted/50 border relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence>
                {!isCameraDisabled && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <VideoPreview className="h-full w-full object-cover" />
                  </motion.div>
                )}
              </AnimatePresence>
              {isCameraDisabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CameraIcon className="h-16 w-16 text-muted-foreground/50" />
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* CARD CONTROLS */}
          <motion.div
            className="md:col-span-1 p-6 rounded-2xl bg-card shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="h-full flex flex-col">
              {/* MEETING DETAILS */}
              <div>
                <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                  Meeting Details
                </h2>
                <p className="text-sm text-muted-foreground break-all bg-muted p-2 rounded-md">{call.id}</p>
              </div>

              <div className="flex-1 flex flex-col justify-between mt-8">
                <div className="space-y-6">
                  {/* CAM CONTROL */}
                  <ControlItem
                    icon={<CameraIcon className="h-5 w-5" />}
                    title="Camera"
                    subtitle={isCameraDisabled ? "Off" : "On"}
                    isEnabled={!isCameraDisabled}
                    onToggle={(checked) => setIsCameraDisabled(!checked)}
                  />

                  {/* MIC CONTROL */}
                  <ControlItem
                    icon={<MicIcon className="h-5 w-5" />}
                    title="Microphone"
                    subtitle={isMicDisabled ? "Off" : "On"}
                    isEnabled={!isMicDisabled}
                    onToggle={(checked) => setIsMicDisabled(!checked)}
                  />

                  {/* DEVICE SETTINGS - Now has a Settings Icon at the End */}
                  <ControlItem
                    icon={<SettingsIcon className="h-5 w-5" />}
                    title="Settings"
                    subtitle="Configure devices"
                    customControl={
                      <div className="flex items-center gap-2">
                        <DeviceSettings />
                      </div>
                    }
                  />
                </div>

                {/* JOIN BTN */}
                <div className="space-y-3 mt-8">
                  <Button
                    className="w-full relative overflow-hidden group"
                    size="lg"
                    onClick={handleJoin}
                    disabled={isJoining}
                  >
                    <span className="relative z-10">{isJoining ? "Joining..." : "Join Meeting"}</span>
                    <motion.div
                      className="absolute inset-0 bg-primary-foreground"
                      initial={{ x: "-100%" }}
                      animate={isJoining ? { x: "0%" } : { x: "-100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                  <motion.p
                    className="text-xs text-center text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Don't worry, our team is super friendly! We want you to succeed. 🎉
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function ControlItem({
  icon,
  title,
  subtitle,
  isEnabled,
  onToggle,
  customControl,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isEnabled?: boolean;
  onToggle?: (checked: boolean) => void;
  customControl?: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"
          whileHover={{ rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          {icon}
        </motion.div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {customControl || (
        <Switch checked={isEnabled} onCheckedChange={onToggle} className="data-[state=checked]:bg-primary" />
      )}
    </motion.div>
  );
}

export default MeetingSetup;