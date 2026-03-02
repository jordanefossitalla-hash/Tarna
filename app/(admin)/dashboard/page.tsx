"use client";

import { useMemo, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ShieldCheck, Users } from "lucide-react";

type AdminTab = "all-users" | "staff";

type AdminUser = {
  id: string;
  username: string;
  email: string;
  role: "USER" | "MODERATOR" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
};

const mockUsers: AdminUser[] = [
  {
    id: "u_001",
    username: "jerry",
    email: "jerry@example.com",
    role: "ADMIN",
    status: "ACTIVE",
  },
  {
    id: "u_002",
    username: "amina",
    email: "amina@example.com",
    role: "MODERATOR",
    status: "ACTIVE",
  },
  {
    id: "u_003",
    username: "paul",
    email: "paul@example.com",
    role: "USER",
    status: "SUSPENDED",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("all-users");

  const usersToDisplay = useMemo(() => {
    if (activeTab === "staff") {
      return mockUsers.filter((user) => user.role !== "USER");
    }
    return mockUsers;
  }, [activeTab]);

  return (
    <div className="w-full h-full p-4 md:p-8 overflow-auto hide-scrollbar">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard administrateur</h1>
          <p className="text-sm text-muted-foreground">
            Visualiser et superviser les utilisateurs.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={activeTab === "all-users" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setActiveTab("all-users")}
          >
            <Users className="size-4" />
            Tous les utilisateurs
          </Button>

          <Button
            type="button"
            variant={activeTab === "staff" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setActiveTab("staff")}
          >
            <ShieldCheck className="size-4" />
            Equipe admin/modo
          </Button>
        </div>

        <Card className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Nom d&apos;utilisateur</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Role</th>
                  <th className="py-2 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {usersToDisplay.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">@{user.username}</td>
                    <td className="py-3 pr-4">{user.email}</td>
                    <td className="py-3 pr-4">{user.role}</td>
                    <td className="py-3">{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
