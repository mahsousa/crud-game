import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <BaseLayout>
      <Sidebar />
      <div>Home-page</div>
    </BaseLayout>
  );
}
