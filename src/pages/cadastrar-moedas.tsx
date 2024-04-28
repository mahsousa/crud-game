import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import FormMoedas from "@/components/FormMoedas";

export default function About() {
  return (
    <BaseLayout>
        <Sidebar />
        <div className="w-100 bg-white p-20 min-h-screen">
        <FormMoedas />
        </div>
    </BaseLayout>
  );
}
