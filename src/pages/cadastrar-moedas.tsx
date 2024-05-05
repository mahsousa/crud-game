import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import FormMoedas from "@/components/FormMoedas";
import { useState } from "react";

export default function About() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const saveMoedas = (nameMoeda: string, price: string, qtdMoedas: string) => {
    const apiUrl = "https://localhost:44371/api/moedas";
    const jsonData = {
      name: nameMoeda,
      price: price,
      qtdMoedas: qtdMoedas,
      image:
        "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt22c10eb03f058068/64d0c3bc674e985be248f4ca/80923_TFT_Set9_Championship_Announcement_Header.jpg",
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
          Cadastrar Moedas na Loja
        </h2>
        <FormMoedas saveMoedas={saveMoedas} moedasID="0" initialCoin={null} />

        {/* Popup de sucesso */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Moedas cadastradas com sucesso!</div>
          </div>
        )}

        {/* Popup de erro */}
        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Erro ao cadastrar Moedas, Por favor, tente novamente.</div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
