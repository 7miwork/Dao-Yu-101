import StudentLayout from "@/layouts/StudentLayout";
import StudentDashboard from "./StudentDashboard";

export default function StudentDashboardWrapper() {
  return (
    <StudentLayout>
      <StudentDashboard />
    </StudentLayout>
  );
}
