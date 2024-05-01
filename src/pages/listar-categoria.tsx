import React, { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import ListCategorias from "@/components/ListCategorias";
import Navegation from "@/components/Navegation";
import Search from "@/components/Search";

interface Categoria {
  id: number;
  name: string;
  items: Categoria[] | null;
}

export default function About() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const search = async (text: string) => {
    try {
      var response;
      if(text && text.length > 0){
       response = await fetch(`https://localhost:44371/api/categoria/search?name=${text}`);
      }else{
        response = await fetch(`https://localhost:44371/api/categoria/`);
      }
      
      if (!response.ok) {
        throw new Error("Falha ao buscar as categorias");
      }
      const data = await response.json();
      if (data && data.categoria) {
        setCategorias(data.categoria as Categoria[]);
      }
    } catch (error) {
      console.error("Erro ao buscar as categorias da API:", error);
    }
  };

  useEffect(() => {
    search(searchText); // Chamada inicial ao carregar o componente e sempre que 'searchText' mudar
  }, [searchText]); // Executa sempre que 'searchText' for alterado

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="mb-10 text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Consultar Categorias da Loja
        </h2>
        <Search onClickSearch={setSearchText} />
        <ListCategorias listCategory={categorias} />
        <Navegation />
      </div>
    </BaseLayout>
  );
}
