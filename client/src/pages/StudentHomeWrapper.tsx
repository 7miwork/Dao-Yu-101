import StudentLayout from "@/layouts/StudentLayout";
import StudentHome from "./StudentHome";

export default function StudentHomeWrapper() {
  return (
    <StudentLayout>
      <StudentHome />
    </StudentLayout>
  );
}
