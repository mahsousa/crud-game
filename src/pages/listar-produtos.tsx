import React, { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout";
import Sidebar from "@/components/Sidebar";
import ListProducts from "@/components/ListProducts";
import Navegation from "@/components/Navegation";
import Search from "@/components/Search";

interface Item {
  id: number;
  name: string;
  price: string;
  image: string;
  tipo: string;
  categoria: Categoria | null;
}

interface Categoria {
  id: number;
  name: string;
  items: Item[] | null;
}

export default function About() {
  const [products, setProducts] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const searchProducts = async (text: string) => {
    try {
      var response;
      if (text && text.length > 0) {
        response = await fetch(`https://localhost:44371/api/itemdaloja/search?name=${text}`);
      } else {
        response = await fetch(`https://localhost:44371/api/itemdaloja`);
      }

      if (!response.ok) {
        throw new Error("Falha ao buscar os produtos");
      }

      const data = await response.json();
      if (data && data.itemDaLoja) {
        setProducts(data.itemDaLoja as Item[]);
      }
    } catch (error) {
      console.error("Erro ao buscar os produtos da API:", error);
    }
  };

  useEffect(() => {
    searchProducts(searchText); // Chamada inicial ao carregar o componente e sempre que 'searchText' mudar
  }, [searchText]); // Executa sempre que 'searchText' for alterado

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="mb-10 text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Consultar itens da Loja
        </h2>
        <Search onClickSearch={setSearchText} />
        <ListProducts listProducts={products} />
        <Navegation />
      </div>
    </BaseLayout>
  );
}
