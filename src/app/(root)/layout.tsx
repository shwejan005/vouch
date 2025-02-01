import StreamClientProvider from "@/components/providers/StreamClientProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StreamClientProvider>{children}</StreamClientProvider>;
}