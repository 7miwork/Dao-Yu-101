import StudentLayout from "@/layouts/StudentLayout";
import StudentProfile from "./StudentProfile";

export default function StudentProfileWrapper() {
  return (
    <StudentLayout>
      <StudentProfile />
    </StudentLayout>
  );
}
