import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../../components/Sidebar";
import FormProducts, { Product } from "@/components/FormProducts";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditarProductsPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string }; // Acessa o parâmetro 'id' da URL
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const [product, setProduct] = useState<Product | null>(null); // Estado para armazenar os detalhes do produto
  
  // Função para buscar os detalhes do produto
  const fetchProduct = async (productId: string) => {
    try {
      const response = await fetch(`https://localhost:44371/api/itemdaloja/${productId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar o produto');
      }
      const data: Product = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Erro ao buscar o produto:', error);
    }
  };

  // Chamada da função fetchProduct quando o 'id' é alterado
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const saveProducts = (nameItem: string,
    tipo: string,
    category: string,
    price: string,
    productID: string,
  ) => {
    const apiUrl = "https://localhost:44371/api/itemdaloja/" + productID;
    const jsonData = {
      name: nameItem,
      tipo: parseInt(tipo, 10),
      idCategoria: parseInt(category, 10),
      price: price,
      image: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt22c10eb03f058068/64d0c3bc674e985be248f4ca/80923_TFT_Set9_Championship_Announcement_Header.jpg",
    };


    console.log(JSON.stringify(jsonData));

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
        // Mostrar popup de sucesso
        setShowSuccessPopup(true);

        // Limpar popup após alguns segundos
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000); // Fechar o popup após 3 segundos
      })
      .catch((error) => {
        console.error('Erro ao realizar a atualização:', error);

        // Mostrar popup de erro
        setShowErrorPopup(true);

        // Limpar popup após alguns segundos
        setTimeout(() => {
          setShowErrorPopup(false);
        }, 3000); // Fechar o popup após 3 segundos
      });
  };

  // Caso em que 'id' ainda não está disponível
  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <BaseLayout>
        <Sidebar />
        <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Editar Item da Loja
        </h2>
        <FormProducts saveProducts={saveProducts} productID ={id} initialProduct={product} />

        {/* Popup de sucesso */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Item editado com sucesso!</div>
          </div>
        )}

        {/* Popup de erro */}
        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Erro ao editar item. Por favor, tente novamente.</div>
          </div>
        )}
        </div>
    </BaseLayout>
  );
}

export default EditarProductsPage;