
export default function FormMoedas() {
  return (
        <div className="w-full max-w-lg">
          <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-darkpurple-600">
            Cadastrar Categorias da Loja
          </h2>

          <form className="mt-10 space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome Da Categoria
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
            <button
                type="submit"
                className="w-full justify-center rounded-md bg-greenwhite-300 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm"
              >
                Cadastrar
              </button>
          </form>
        </div>
  );
}
