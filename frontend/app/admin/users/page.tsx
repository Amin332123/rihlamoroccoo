"use client";

import { useState } from "react";
import { Users, Plus, Shield, Check, Trash2, Mail } from "lucide-react";

const INITIAL_USERS = [
  { id: "1", name: "Ayoub Smaili", email: "ayoub@rihlamorocco.com", role: "Owner", status: "ACTIVE" },
  { id: "2", name: "Karima B.", email: "karima@rihlamorocco.com", role: "Manager", status: "ACTIVE" },
  { id: "3", name: "Youssef T.", email: "youssef.guide@gmail.com", role: "Editor", status: "ACTIVE" }
];

export default function UsersAdminPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Editor");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteName.trim() && inviteEmail.trim()) {
      setUsers([
        ...users,
        {
          id: String(users.length + 1),
          name: inviteName,
          email: inviteEmail,
          role: inviteRole,
          status: "INVITED"
        }
      ]);
      setInviteName("");
      setInviteEmail("");
      setIsInviteOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium text-primary-green">
            Portal Users
          </h1>
          <p className="text-light-txt text-xs tracking-wider uppercase font-semibold mt-1">
            Invite and manage roles for administrators and managers
          </p>
        </div>
        <button
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
        >
          <Plus className="w-4 h-4" />
          <span>Invite User</span>
        </button>
      </div>

      {/* Users table */}
      <div className="bg-white border border-sand/20 rounded-[22px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs tracking-wider border-collapse">
            <thead>
              <tr className="border-b border-sand/15 text-light-txt font-semibold uppercase text-[10px] bg-cream-bg/25">
                <th className="p-4 pl-6">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role Assigned</th>
                <th className="p-4">Portal Access</th>
                <th className="p-4 text-right pr-6">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/10 font-medium">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-cream-bg/20 transition-colors">
                  <td className="p-4 pl-6 font-bold text-dark-txt">{user.name}</td>
                  <td className="p-4 text-light-txt">{user.email}</td>
                  
                  {/* Role */}
                  <td className="p-4 text-dark-txt">
                    <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider text-desert-brown">
                      <Shield className="w-3.5 h-3.5" />
                      <span>{user.role}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 text-[8px] font-bold rounded-lg border ${
                        user.status === "ACTIVE"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-amber-50 border-amber-200 text-amber-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Delete */}
                  <td className="p-4 text-right pr-6">
                    <button
                      onClick={() => setUsers(users.filter((u) => u.id !== user.id))}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsInviteOpen(false)} className="absolute inset-0 bg-black/50" />
          <div className="relative bg-white border border-sand/25 max-w-sm w-full rounded-[22px] p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-sand/15">
              <div className="flex items-center gap-2 text-primary-green font-serif text-base font-bold">
                <Users className="w-5 h-5" />
                <span>Invite Team Member</span>
              </div>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Salim K."
                  className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. salim@rihlamorocco.com"
                  className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt"
                >
                  <option value="Editor">Editor (excursion catalog updates)</option>
                  <option value="Manager">Manager (manage bookings)</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2 bg-cream-bg text-dark-txt text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-green text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
