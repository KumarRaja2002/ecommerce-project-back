export const sortHelper = {
  dynamicSort(query: any) {
    const sortBy = query.sort_by || "name";
    const sortType = query.sort_type?.toLowerCase() === "desc" ? "DESC" : "ASC";

    if (!["price", "rating", "name", "category"].includes(sortBy)) {
      throw new Error(`Invalid sort field: ${sortBy}`);
    }

    return `${sortBy} ${sortType}`;
  },
};

