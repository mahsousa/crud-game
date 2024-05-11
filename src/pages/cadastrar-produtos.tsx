import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import Form from "@/components/FormProducts";
import { useEffect, useState } from "react";
import CategoriaService, { Categoria } from "@/services/category-service";


export default function CadastrarProdutos() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  //Lista de categorias que sera preenchida
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const categoriaService = new CategoriaService();

  //Busca as categorias da API e preenche a lista de categoria da tela
  useEffect(() => {
    const fetchData = async () => {
      const result = await categoriaService.search("");
      setCategorias(result);
    };

    fetchData();
  }, [categorias]);

  const saveProducts = (
    nameItem: string,
    tipo: string,
    category: string,
    price: string
  ) => {
    const apiUrl = "https://localhost:44371/api/itemdaloja";
    const jsonData = {
      name: nameItem,
      tipo: parseInt(tipo, 10),
      idCategoria: parseInt(category, 10),
      price: price,
      image:
        "https://img.freepik.com/free-vector/gradient-no-photo-sign_23-2149303600.jpg",
    };

    console.log(JSON.stringify(jsonData));

    fetch(apiUrl, {
      method: "POST",
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
        console.log("POST bem-sucedido:", data);
        // Mostrar popup de sucesso
        setShowSuccessPopup(true);

        // Limpar popup após alguns segundos
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000); // Fechar o popup após 3 segundos
      })
      .catch((error) => {
        console.error("Erro ao realizar o POST:", error);
        // Mostrar popup de erro
        setShowErrorPopup(true);

        // Limpar popup após alguns segundos
        setTimeout(() => {
          setShowErrorPopup(false);
        }, 3000); // Fechar o popup após 3 segundos
      });
  };

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Cadastrar um item na Loja
        </h2>
        <Form saveProducts={saveProducts} productID="0" initialProduct={null} categorias={categorias} hideCategorySelect={false}/>
        
        {/* Popup de sucesso */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Item cadastradas com sucesso!</div>
          </div>
        )}

        {/* Popup de erro */}
        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Erro ao cadastrar Items, Por favor, tente novamente.</div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
