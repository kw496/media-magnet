import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Check, Mail, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  type: "agent" | "user" | "system";
  content: string;
  timestamp: Date;
}

interface EmailCampaignSidebarProps {
  journalists: any[];
  companyName: string;
  onClose: () => void;
}

export const EmailCampaignSidebar = ({ journalists, companyName, onClose }: EmailCampaignSidebarProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "agent",
      content: `I found ${journalists.length} relevant journalists for ${companyName}. Would you like me to send personalized outreach emails to all of them?`,
      timestamp: new Date(),
    },
  ]);
  const [stage, setStage] = useState<"approval" | "sending" | "sent" | "followup">("approval");
  const [progress, setProgress] = useState(0);

  const handleApprove = async () => {
    // Add user approval message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        content: "Yes, send the emails",
        timestamp: new Date(),
      },
    ]);

    // Start sending process
    setStage("sending");
    
    // Add agent progress message
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: "Starting email campaign...",
        timestamp: new Date(),
      },
    ]);

    // Simulate sending emails with progress
    for (let i = 0; i <= journalists.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProgress(i);
      
      if (i === journalists.length) {
        setStage("sent");
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            type: "system",
            content: `✓ Successfully sent ${journalists.length} personalized emails`,
            timestamp: new Date(),
          },
          {
            id: (Date.now() + 3).toString(),
            type: "agent",
            content: "Great! I've sent all the emails. Here's what I recommend: wait 2 days for responses, then I can automatically send a polite follow-up email to journalists who haven't replied. Would you like me to automate the follow-up?",
            timestamp: new Date(),
          },
        ]);
        setStage("followup");
      }
    }
  };

  const handleFollowupApprove = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        content: "Yes, automate the follow-up",
        timestamp: new Date(),
      },
      {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: "Perfect! I'll automatically send follow-up emails in 2 days to anyone who hasn't responded. You'll receive a notification when the follow-ups are sent.",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed right-0 top-0 h-full w-[400px] bg-background border-l border-border shadow-2xl z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Email Campaign</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.type === "system"
                      ? "bg-muted text-muted-foreground text-sm"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Progress indicator */}
          {stage === "sending" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 bg-muted rounded-lg"
            >
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <div className="flex-1">
                <div className="text-sm text-foreground mb-1">
                  Sending emails... {progress}/{journalists.length}
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress / journalists.length) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Email history */}
          {stage === "sent" || stage === "followup" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-border rounded-lg p-3 bg-background"
            >
              <div className="text-sm font-medium text-foreground mb-2">Campaign Summary</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>{journalists.length} emails sent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-orange-500" />
                  <span>Follow-up scheduled in 2 days</span>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </ScrollArea>

      {/* Action buttons */}
      <div className="p-4 border-t border-border">
        {stage === "approval" && (
          <Button onClick={handleApprove} className="w-full" size="lg">
            Approve & Send Emails
          </Button>
        )}
        {stage === "followup" && (
          <Button onClick={handleFollowupApprove} className="w-full" size="lg">
            Automate Follow-up
          </Button>
        )}
      </div>
    </motion.div>
  );
};
