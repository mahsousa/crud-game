const product = [
  {
    name: "Bolinha",
    categoria: "Ocean",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrh7bz8n8T2QjojCCw5pXlTSNpXSqCd9tGZlJILJ9BCQ&s",
    tipo: "Avatar",
    price: "100",
  },
  {
    name: "Bolinha",
    categoria: "Ocean",
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/660/872/original/screen-winner-gold-award-glowing-green-victory-banner-for-ui-game-vector.jpg",
    tipo: "Finalização",
    price: "100",
  },
  {
    name: "Bolinha",
    categoria: "Ocean",
    imageUrl:
      "https://www.coquinhos.com/wp-content/uploads/2019/10/4-raya.jpg",
    tipo: "Tabuleiro",
    price: "100",
  },
  {
    name: "Bolinha",
    categoria: "Ocean",
    imageUrl:
      "https://i.colnect.net/f/20058/410/2-Dollars-Yu-Gi-Oh---Game-Flip-Coin-25th-Anniversary-Antiqued.jpg",
    tipo: "fichas",
    price: "100",
  },
  {
    name: "Bolinha",
    categoria: "Ocean",
    imageUrl:
      "https://i.colnect.net/f/20058/410/2-Dollars-Yu-Gi-Oh---Game-Flip-Coin-25th-Anniversary-Antiqued.jpg",
    tipo: "fichas",
    price: "100",
  },
  {
    name: "Bolinha",
    categoria: "Ocean",
    imageUrl:
      "https://i.colnect.net/f/20058/410/2-Dollars-Yu-Gi-Oh---Game-Flip-Coin-25th-Anniversary-Antiqued.jpg",
    tipo: "fichas",
    price: "100",
  },
];

export default function ListProducts() {
  return (
    <div className="container-fluid w-100 py-10">
      <div className="flex bg-white rounded-l-lg border-black">
        <div className="w-full">
          <ul role="list" className="divide-y divide-gray-100 w-full">
            {product.map((caracter) => (
              <li
                key={caracter.categoria}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={caracter.imageUrl}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-darkpurple-600">
                      {caracter.name}
                    </p>
                    <div className="flex gap-1">
                      <p className="mt-1 truncate text-xs leading-5">
                        <span className="font-semibold text-sm text-whitebrown-300">TIPO:</span>{" "}
                        <span className="text-gray-500 text-sm">{caracter.tipo}</span>
                      </p>
                      <p className="mt-1 truncate text-xs leading-5">
                        <span className="font-semibold text-sm text-whitebrown-300">CATEGORIA:</span>{" "}
                        <span className="text-gray-700 text-sm">{caracter.categoria}</span>
                      </p>
                      <p className="mt-1 truncate text-xs leading-5">
                        <span className="font-semibold text-sm text-whitebrown-300">PREÇO:</span>{" "}
                        <span className="text-gray-500 text-sm">{caracter.price}</span>
                      </p>
                    </div>
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
