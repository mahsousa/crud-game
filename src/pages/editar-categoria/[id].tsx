import { useState, useEffect } from 'react';
import BaseLayout from '@/components/BaseLayout';
import Sidebar from '@/components/Sidebar';
import Categoria from '@/components/FormCategoria';
import { useRouter } from 'next/router';

interface CategoriaData {
  id: string;
  name: string;
}

const EditarCategoriaPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string }; // Acessa o parâmetro 'id' da URL
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const [categoria, setCategoria] = useState<CategoriaData | null>(null); // Estado para armazenar os detalhes da categoria

  // Função para buscar os detalhes da categoria pelo ID
  const fetchCategoria = async (categoriaId: string) => {
    try {
      const response = await fetch(`https://localhost:44371/api/categoria/${categoriaId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar a categoria');
      }
      const data: CategoriaData = await response.json();
      setCategoria(data); // Armazena os detalhes da categoria no estado
    } catch (error) {
      console.error('Erro ao buscar a categoria:', error);
    }
  };

  // Chamada da função fetchCategoria quando o 'id' é alterado
  useEffect(() => {
    if (id) {
      fetchCategoria(id);
    }
  }, [id]);

  // Função para salvar a categoria editada
  const saveCategory = async (categoryName: string, categoryID: string) => {
    const apiUrl = `https://localhost:44371/api/categoria/${categoryID}`;
    const jsonData = {
      name: categoryName,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição');
      }

      // Mostrar popup de sucesso
      setShowSuccessPopup(true);

      // Limpar popup após alguns segundos
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000); // Fechar o popup após 3 segundos
    } catch (error) {
      console.error('Erro ao realizar a atualização:', error);

      // Mostrar popup de erro
      setShowErrorPopup(true);

      // Limpar popup após alguns segundos
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000); // Fechar o popup após 3 segundos
    }
  };

  if (!categoria) {
    return <p>Carregando...</p>;
  }

  return (
    <BaseLayout>
      <Sidebar />
      <div className="w-100 bg-white p-20 min-h-screen">
        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
          Editar Categorias da Loja
        </h2>
        <Categoria
          saveCategory={saveCategory}
          categoryID={categoria.id}
          initialCategoryName={categoria.name} // Passa o nome atual da categoria como valor inicial
        />
        {/* Popup de sucesso */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Categoria editada com sucesso!</div>
          </div>
        )}

        {/* Popup de erro */}
        {showErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">Erro ao editar a categoria. Por favor, tente novamente.</div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default EditarCategoriaPage;
