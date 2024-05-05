import BaseLayout from "@/components/BaseLayout";
import Sidebar from "../components/Sidebar";
import Categoria from "@/components/FormCategoria";

export default function createCategory() {
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
          Cadastrar Categorias da Loja
        </h2>
        <Categoria saveCategory={saveCategory} categoryID="0" initialCategoryName={null} />
      </div>
    </BaseLayout>
  );
}
