export interface Categoria {
  id: number;
  name: string;
  items: Categoria[] | null;
}

class CategoriaService {

  public async search(text: string): Promise<Categoria[]> {
    try {
      const apiUrl = text && text.length > 0
        ? `https://localhost:44371/api/categoria/search?name=${text}`
        : `https://localhost:44371/api/categoria/`;

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Falha ao buscar as categorias");
      }

      const data = await response.json();
      
      if (data && data.categoria) {
        var categorias = data.categoria as Categoria[];
        return categorias;
      }

      return [];
    } catch (error) {
      console.error("Erro ao buscar as categorias da API:", error);
      return [];
    }
  }
}

export default CategoriaService;
