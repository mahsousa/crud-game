import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import Categoria from "@/components/FormCategoria";
import { useState } from "react";

export default function createCategory() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const saveCategory = (categoryName: string, categoryID: string) => {
    const apiUrl = "https://localhost:44371/api/categoria";
    const jsonData = {
      name: categoryName,
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
          Cadastrar Categorias da Loja
        </h2>
        <Categoria saveCategory={saveCategory} categoryID="0" initialCategoryName={null} />
      {/* Popup de sucesso */}
      
      {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Categoria cadastrada com sucesso!</div>
          </div>
        )}

        {/* Popup de erro */}
        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Erro ao cadastrar Categoria, Por favor, tente novamente.</div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
