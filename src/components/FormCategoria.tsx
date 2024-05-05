import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface FormCategoryProps {
  categoryID: string;
  saveCategory: (categoryName: string, categoryID: string) => void;
  initialCategoryName: string | null;
}

const FormCategory: React.FC<FormCategoryProps> = ({ saveCategory, categoryID, initialCategoryName }) => {
  const [categoria, setCategoria] = useState(initialCategoryName ?? "");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar se a categoria está preenchida
    if (!categoria) {
      setShowErrorPopup(true);
      return;
    }

    saveCategory(categoria, categoryID);
  };

  const handleCategoriaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoria(event.target.value);
  };

  // Fechar o popup após alguns segundos
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessPopup || showErrorPopup) {
      timer = setTimeout(() => {
        setShowSuccessPopup(false);
        setShowErrorPopup(false);
      }, 3000); // Fechar o popup após 3 segundos
    }
    return () => clearTimeout(timer);
  }, [showSuccessPopup, showErrorPopup]);

  return (
    <div className="w-full max-w-lg">
      <form className="mt-10 space-y-6" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium leading-6 text-gray-900">
            Nome Da Categoria
          </label>
          <div className="mt-2">
            <input
              id="categoria"
              name="categoria"
              type="text"
              autoComplete="off"
              value={categoria}
              onChange={handleCategoriaChange}
              required
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-input"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full justify-center rounded-md bg-greenwhite-300 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm"
        >
          Cadastrar
        </button>
      </form>

      {/* Popup de Sucesso */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg">Cadastro realizado com sucesso!</div>
        </div>
      )}

      {/* Popup de Erro */}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg">Por favor, preencha o campo corretamente.</div>
        </div>
      )}
    </div>
  );
};

export default FormCategory;
