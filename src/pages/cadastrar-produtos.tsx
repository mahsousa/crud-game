import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import Form from "@/components/FormProducts";

export default function CadastrarProdutos() {
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
      })
      .catch((error) => {
        console.error("Erro ao realizar o POST:", error);
      });
  };

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Cadastrar um item na Loja
        </h2>
        <Form saveProducts={saveProducts} productID="0" />
      </div>
    </BaseLayout>
  );
}
