import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Form() {
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target?.result) {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const removeImage = () => {
    setImagePreview("");
    const fileInput = document.getElementById("photo") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const nomeItem = formData.get("text") as string;
    const tipo = formData.get("select") as string;
    const categoria = formData.get("select-categoria") as string;
    const preco = parseFloat(formData.get("number") as string);

    // Exemplo de console.log dos dados do formulário
    console.log("Nome do Item:", nomeItem);
    console.log("Tipo:", tipo);
    console.log("Categoria:", categoria);
    console.log("Preço:", preco);

    if (!nomeItem || !tipo || !categoria || isNaN(preco)) {
      // Exibir popup de erro
      setShowErrorPopup(true);
    } else {
      // Exibir popup de sucesso
      setShowSuccessPopup(true);

      // Ocultar os popups após 3 segundos
      setTimeout(() => {
        setShowSuccessPopup(false);
        setShowErrorPopup(false);
      }, 3000);

      // Limpar o formulário após o envio (opcional)
      event.currentTarget.reset();
      setImagePreview("");
    }
  };

  return (
    <div className="w-full max-w-lg">
      <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
        Cadastrar um item na Loja
      </h2>

      <form className="mt-10 space-y-6" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="select" className="block text-sm font-medium leading-6 text-gray-900">
            Selecione o tipo
          </label>
          <div className="mt-2">
            <select
              id="select"
              name="select"
              autoComplete="select"
              required
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-select"
            >
              <option value="">Selecione uma opção</option>
              <option value="option1">Avatar</option>
              <option value="option2">Tabuleiro</option>
              <option value="option3">Finalização</option>
              <option value="option4">Ficha</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
            Nome do Item
          </label>
          <div className="mt-2">
            <input
              id="text"
              name="text"
              type="text"
              autoComplete="text"
              required
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-input"
            />
          </div>
        </div>

        <div>
          <label htmlFor="select-categoria" className="block text-sm font-medium leading-6 text-gray-900">
            Categoria
          </label>
          <div className="mt-2">
            <select
              id="select-categoria"
              name="select-categoria"
              autoComplete="select-categoria"
              required
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-select"
            >
              <option value="">Selecione uma Categoria</option>
              <option value="Natal">Natal</option>
              <option value="Carnaval">Carnaval</option>
              <option value="Halloween">Halloween</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
            Preço
          </label>
          <div className="mt-2">
            <input
              id="number"
              name="number"
              type="number"
              autoComplete="number"
              required
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-input"
            />
          </div>
        </div>

        <div className="flex justify-around">
          {/* Photo Upload */}
          <div className="gap-x-3">
            <div className="mt-2 gap-x-3">
              <PhotoIcon className="h-15 w-15 text-gray-300" aria-hidden="true" />
              <input
                id="photo"
                name="photo"
                type="file"
                onChange={handleFileChange}
                className="sr-only"
              />
              <label
                htmlFor="photo"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                Imagem
              </label>
            </div>
          </div>

          {/* Image Preview */}
          <div className="flex items-center mt-2 relative">
            {imagePreview && typeof imagePreview === "string" && (
              <img
                src={imagePreview}
                alt="Preview da imagem"
                className="h-40 w-40 rounded-md mr-2"
              />
            )}
            {imagePreview && typeof imagePreview === "string" && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-0 right-0 rounded-full bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <XMarkIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full justify-center rounded-md bg-greenwhite-300 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm"
          >
            Cadastrar
          </button>
        </div>
      </form>

      {/* Popup de Sucesso */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg">
            Cadastro realizado com sucesso!
          </div>
        </div>
      )}

      {/* Popup de Erro */}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg">
            Por favor, preencha todos os campos corretamente.
          </div>
        </div>
      )}
    </div>
  );
}
