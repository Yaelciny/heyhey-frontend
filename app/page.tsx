"use client";

import WelcomeHeader from "@/src/components/dashboard/WelcomeHeader/WelcomeHeader";
import StatsCards from "@/src/components/dashboard/StatsCards/StatsCards";
import TaskForm from "@/src/components/dashboard/TaskForm/TaskForm";
import TaskTable from "@/src/components/dashboard/TaskTable/TaskTable";

export default function Home() {
  return (
    <div className="w-full">
      <WelcomeHeader />
      <StatsCards />
      <TaskForm />
      <TaskTable />
    </div>
  );
}