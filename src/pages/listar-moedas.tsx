import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import ListMoedas from "@/components/ListMoedas";
import Navegation from "@/components/Navegation";
import Search from "@/components/Search";

export default function About() {
  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="mb-10 text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Consultar Moedas da Loja</h2>
        <Search />
        <ListMoedas />
        <Navegation />
      </div>
    </BaseLayout>
  );
}
