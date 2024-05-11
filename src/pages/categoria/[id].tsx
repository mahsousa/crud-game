import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../../components/Sidebar";
import FormProducts, { Product } from "@/components/FormProducts";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Categoria } from "@/services/category-service";

const DetalhesDaCategoriaPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string }; // Acessa o parâmetro 'id' da URL
  const [categoria, setCategoria] = useState<Categoria | null>(null); // Estado para armazenar os detalhes do produto
  
  // Função para buscar os detalhes da categoria
  const fetchCategoria = async (categoriaId: string) => {
    try {
      const response = await fetch(`https://localhost:44371/api/categoria/${categoriaId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar o produto');
      }
      const data: Categoria = await response.json();
      setCategoria(data);
    } catch (error) {
      console.error('Erro ao buscar o produto:', error);
    }
  };

  // Chamada da função fetchProduct quando o 'id' é alterado
  useEffect(() => {
    if (id) {
      fetchCategoria(id);
    }
  }, [id]);

  // Caso em que 'id' ainda não está disponível
  if (!categoria) {
    return <p>Carregando...</p>;
  }

  return (
    <BaseLayout>
        <Sidebar />
        <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Detalhes da Categoria
        </h2>

        <p>{categoria.id}</p>
        <p>{categoria.name}</p>

        <h3>Itens</h3>
        {
          categoria.items?.map((item) => (
            <p className="text-sm font-semibold leading-6 text-darkpurple-600">
              {item.name}
            </p>
          ))
        }
        
        </div>
    </BaseLayout>
  );
}

export default DetalhesDaCategoriaPage;