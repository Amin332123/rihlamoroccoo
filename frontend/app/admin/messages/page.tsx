"use client";

import { useState, useEffect } from "react";
import { Mail, Search, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { ApiClient } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMsg, setSelectedMsg] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const loadMessages = async () => {
    setIsLoading(true);
    const res = await ApiClient.get("/contact");
    if (res.success && res.data) {
      setMessages(res.data);
    } else {
      setErrorMsg(res.error || "Failed to load inbox messages.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const filteredMessages = messages.filter((m) =>
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    if (currentRead) return; // Only toggle to read if it is unread
    const res = await ApiClient.patch(`/contact/${id}`, { isRead: true });
    if (res.success) {
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, isRead: true } : m))
      );
      if (selectedMsg && selectedMsg.id === id) {
        setSelectedMsg({ ...selectedMsg, isRead: true });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      const res = await ApiClient.delete(`/contact/${id}`);
      if (res.success) {
        setMessages(messages.filter((m) => m.id !== id));
        setSelectedMsg(null);
      } else {
        alert(res.error || "Failed to delete message.");
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-medium text-primary-green">
          Messages Inbox
        </h1>
        <p className="text-light-txt text-xs tracking-wider uppercase font-semibold mt-1">
          Review customer inquiries, custom tour requests, and support questions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Col: Messages List (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Search bar */}
          <div className="bg-white border border-sand/20 rounded-[20px] p-4 shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 text-light-txt absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search messages by name or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>
          </div>

          {/* Loading Skeletons */}
          {isLoading && (
            <div className="space-y-3">
              {[1, 2].map((num) => (
                <div key={num} className="h-20 w-full rounded-[20px] bg-sand/10 animate-pulse border border-sand/15" />
              ))}
            </div>
          )}

          {/* Inbox list */}
          {!isLoading && (
            <div className="space-y-3">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMsg(msg);
                    handleToggleRead(msg.id, msg.isRead);
                  }}
                  className={`p-5 bg-white border rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    selectedMsg?.id === msg.id
                      ? "border-primary-green ring-2 ring-primary-green/10"
                      : msg.isRead
                      ? "border-sand/15 opacity-75"
                      : "border-sand/30 font-semibold"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    msg.isRead ? "bg-cream-bg/50 text-light-txt" : "bg-primary-green/10 text-primary-green"
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-bold text-dark-txt">{msg.fullName}</span>
                      <span className="text-[9px] text-light-txt font-semibold">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h4 className="font-serif text-sm font-bold text-primary-green truncate">
                      {msg.subject}
                    </h4>
                    
                    <p className="text-xs text-light-txt font-light line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>

                    <div className="flex gap-2 pt-1.5 justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(msg.id);
                        }}
                        className="text-[9px] uppercase tracking-wider font-bold text-red-700 hover:underline cursor-pointer focus:outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredMessages.length === 0 && (
                <div className="p-12 text-center bg-white border border-sand/20 rounded-[20px] text-xs font-light text-light-txt">
                  No messages found in your inbox.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Col: Details View */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedMsg ? (
              <motion.div
                key={selectedMsg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-sand/20 rounded-[22px] p-6 shadow-sm space-y-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-sand/15">
                  <h3 className="font-serif text-base font-bold text-primary-green">
                    Message Preview
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[9px] uppercase text-light-txt font-semibold tracking-widest block mb-0.5">Sender</span>
                    <p className="font-bold text-dark-txt text-sm">{selectedMsg.fullName}</p>
                    <a href={`mailto:${selectedMsg.email}`} className="text-desert-brown hover:underline font-semibold block mt-0.5">
                      {selectedMsg.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase text-light-txt font-semibold tracking-widest block mb-0.5">Subject</span>
                    <p className="font-serif font-bold text-primary-green text-sm leading-relaxed">{selectedMsg.subject}</p>
                  </div>

                  <div className="h-[1px] bg-sand/10" />

                  <div>
                    <span className="text-[9px] uppercase text-light-txt font-semibold tracking-widest block mb-1">Message Content</span>
                    <p className="text-light-txt font-light leading-relaxed whitespace-pre-line bg-cream-bg/20 p-4 border border-sand/10 rounded-xl">
                      {selectedMsg.message}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href={`mailto:${selectedMsg.email}?subject=RE: ${encodeURIComponent(selectedMsg.subject)}`}
                    className="w-full text-center py-3 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Reply</span>
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMsg.id)}
                    className="p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 outline-none"
                    aria-label="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            ) : (
              <div className="bg-cream-bg/25 border border-dashed border-sand/30 rounded-[22px] p-12 text-center text-xs font-light text-light-txt">
                Select a message from the list to preview details and send quick email responses.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
