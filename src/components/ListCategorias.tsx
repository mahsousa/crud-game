const product = [
  {
    name: "Natal",
  },
  {
    name: "Halloween",
  },
  {
    name: "Carnaval",
  },
];

export default function ListMoedas() {
  return (
    <div className="container-fluid w-100 py-10">
      <div className="flex bg-white rounded-l-lg border-black">
        <div className="w-full">
          <ul role="list" className="divide-y divide-gray-100 w-full">
            {product.map((caracter) => (
              <li
                key={caracter.name}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-darkpurple-600">
                      {caracter.name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-6">
                  <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                    Editar
                  </button>
                  <button className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600">
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
