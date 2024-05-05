import { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../../components/Sidebar";
import FormMoedas from "@/components/FormMoedas";
import { useRouter } from "next/router";


interface Coin {
  name: string;
  price: string;
  qtdMoedas: string;
  id: string;
}

const EditarMoedasPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string }; // Acessa o parâmetro 'id' da URL
  
  const [moedas, setMoedas] = useState<Coin | null>(null); // Estado para armazenar os detalhes da moeda
  
  // Função para buscar os detalhes da moeda pelo ID
  const fetchMoedas = async (moedasId: string) => {
    try {
      const response = await fetch(`https://localhost:44371/api/moedas/${moedasId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar a moeda');
      }
      const data: Coin = await response.json();
      setMoedas(data); // Armazena os detalhes da moeda no estado
    } catch (error) {
      console.error('Erro ao buscar a moeda:', error);
    }
  };

  // Chamada da função fetchMoedas quando o 'id' é alterado
  useEffect(() => {
    if (id) {
      fetchMoedas(id);
    }
  }, [id]);

  const saveMoedas = (
    nameMoeda: string,
    price: string,
    qtdMoedas: string,
    moedasID: string
  ) => {
    const apiUrl = `https://localhost:44371/api/moedas/${id}`;
    const jsonData = {
      name: nameMoeda,
      price: price,
      qtdMoedas: qtdMoedas,
      image:
        "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt22c10eb03f058068/64d0c3bc674e985be248f4ca/80923_TFT_Set9_Championship_Announcement_Header.jpg",
    };

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao fazer a requisição");
        }
      })
      .then((data) => {
        console.log("PUT bem-sucedido:", data);
      })
      .catch((error) => {
        console.error("Erro ao realizar o PUT:", error);
      });
  };

  
  // Caso em que 'id' ainda não está disponível
  if (!moedas) {
    return <p>Carregando...</p>;
  }

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Editar Moedas na Loja
        </h2>
        {/* Passa os detalhes da moeda como prop initialCoin para o componente FormMoedas */}
        <FormMoedas saveMoedas={saveMoedas} moedasID="0" initialCoin={moedas} />
      </div>
    </BaseLayout>
  );
};

export default EditarMoedasPage;
