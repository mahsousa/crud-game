import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import Form from "@/components/Form";

export default function About() {
  return (
    <BaseLayout>
        <Sidebar />
        <div className="w-100 bg-white p-20 min-h-screen">
        <Form />
        </div>
    </BaseLayout>
  );
}
