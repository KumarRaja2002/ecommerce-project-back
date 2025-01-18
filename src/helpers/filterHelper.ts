import { sql } from 'drizzle-orm';
import { products } from '../schemas/product'; // Adjust to your file structure

export const filterHelper = {
  getProductFilters (query: any)  {
    let filters = [];

    // Add category filter
    if (query.category) {
        filters.push(`products.category = '${query.category}'`);
    }

    return filters.length > 0 ? filters.join(' AND ') : undefined;
}
  };
  

