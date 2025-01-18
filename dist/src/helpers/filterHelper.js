"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterHelper = void 0;
exports.filterHelper = {
    getProductFilters(query) {
        let filters = [];
        // Add category filter
        if (query.category) {
            filters.push(`products.category = '${query.category}'`);
        }
        return filters.length > 0 ? filters.join(' AND ') : undefined;
    }
};
