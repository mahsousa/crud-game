import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Categoria } from "@/services/category-service";

interface FormProductsProps {
  saveProducts: (
    nameItem: string,
    tipo: string,
    category: string,
    price: string,
    productID: string
  ) => void;
  productID: string;
  initialProduct: Product | null;
  categorias: Categoria[]; // Propriedade para receber as categorias
}

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  tipo: string;
  idCategoria: string;
}


const FormProducts: React.FC<FormProductsProps> = ({
  saveProducts,
  productID,
  initialProduct,
  categorias, // Recebe as categorias como propriedade
}) => {
  const [nameItem, setNameItem] = useState(initialProduct ? initialProduct.name : "");
  const [tipo, setTipo] = useState(initialProduct ? initialProduct.tipo : "");
  const [category, setCategory] = useState(initialProduct ? initialProduct.idCategoria : "");
  const [price, setPrice] = useState(initialProduct ? initialProduct.price : "");
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && e.target.result) {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    const fileInput = document.getElementById("photo") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar se todos os campos necessários estão preenchidos
    if (!nameItem || !tipo || !category || !price) {
      return;
    }

    // Chama a função saveProducts com os valores do formulário
    saveProducts(nameItem, tipo, category, price, productID);

    // Limpar os campos após o envio bem-sucedido
    setNameItem("");
    setTipo("");
    setCategory("");
    setPrice("");
    setImagePreview(null);

    // Limpar o formulário
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div className="w-full max-w-lg">
      <form ref={formRef} className="mt-10 space-y-6" onSubmit={handleFormSubmit}>
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
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus-ring-2 focus-ring-inset focus-ring-indigo-600 sm-text-sm sm-leading-6 form-select"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Selecione uma opção</option>
              <option value="0">Avatar</option>
              <option value="2">Tabuleiro</option>
              <option value="1">Finalização</option>
              <option value="3">Ficha</option>
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
              value={nameItem}
              onChange={(e) => setNameItem(e.target.value)}
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus-ring-2 focus-ring-inset focus-ring-indigo-600 sm-text-sm sm-leading-6 form-input"
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
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus-ring-2 focus-ring-inset focus-ring-indigo-600 sm-text-sm sm-leading-6 form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione uma Categoria</option>
              {categorias && categorias.map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </option>
              ))}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus-ring-2 focus-ring-inset focus-ring-indigo-600 sm-text-sm sm-leading-6 form-input"
            />
          </div>
        </div>

        <div className="flex justify-around">
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
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50 cursor-pointer"
              >
                Imagem
              </label>
            </div>
          </div>

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
                className="absolute top-0 right-0 rounded-full bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50"
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
    </div>
  );
};

export default FormProducts;
