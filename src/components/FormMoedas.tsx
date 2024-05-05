import React, {useState,ChangeEvent,FormEvent,useRef,useEffect,} from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface FormMoedasProps {
  saveMoedas: (
    name: string,
    price: string,
    qtdMoedas: string,
    moedasID: string
  ) => void;
  moedasID: string;
  initialCoin: Coin | null;
}

interface Coin {
  name: string;
  price: string;
  qtdMoedas: string;
  id: string;
}

const FormMoedas: React.FC<FormMoedasProps> = ({
  saveMoedas,
  moedasID,
  initialCoin,
}) => {
  const [nameMoeda, setNameMoeda] = useState(initialCoin ? initialCoin.name : "");
  const [price, setPrice] = useState(initialCoin ? initialCoin.price : "");
  const [qtdMoedas, setQtdMoedas] = useState(initialCoin ? initialCoin.qtdMoedas : "");
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
    if (!nameMoeda || !price || !qtdMoedas) {
      return;
    }

    // Chama a função saveMoedas com os valores do formulário
    saveMoedas(nameMoeda, price, qtdMoedas, moedasID);

    // Limpar os campos após o envio bem-sucedido
    setNameMoeda("");
    setPrice("");
    setQtdMoedas("");
    setImagePreview(null);

    // Limpar o formulário
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div className="w-full max-w-lg">
      <form className="mt-10 space-y-6" onSubmit={handleFormSubmit}>
        <div>
          <label
            htmlFor="nameMoeda"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nome da Moeda
          </label>
          <div className="mt-2">
            <input
              id="nameMoeda"
              name="nameMoeda"
              type="text"
              autoComplete="text"
              required
              value={nameMoeda}
              onChange={(e) => setNameMoeda(e.target.value)}
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-input"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Preço
          </label>
          <div className="mt-2">
            <input
              id="price"
              name="price"
              type="number"
              autoComplete="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-input"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="qtdMoedas"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Quantidade de Moedas
          </label>
          <div className="mt-2">
            <input
              id="qtdMoedas"
              name="qtdMoedas"
              type="number"
              autoComplete="number"
              required
              value={qtdMoedas}
              onChange={(e) => setQtdMoedas(e.target.value)}
              className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-input"
            />
          </div>
        </div>

        <div className="flex justify-around">
          {/* Upload da Foto */}
          <div className="gap-x-3">
            <div className="mt-2 gap-x-3">
              <PhotoIcon
                className="h-15 w-15 text-gray-300"
                aria-hidden="true"
              />
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

          {/* Pré-visualização da Imagem */}
          <div className="flex items-center mt-2 relative">
            {imagePreview && typeof imagePreview === "string" && (
              <img
                src={imagePreview}
                alt="Pré-visualização da imagem"
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
            className="w-full justify-center rounded-md bg-green-500 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormMoedas;
