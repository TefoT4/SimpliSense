import Header from "@/app/components/header";
import Chat from "@/app/components/Chat";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Chat />
      </div>
    </div>
  );
}
