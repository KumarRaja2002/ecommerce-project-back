"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortHelper = void 0;
exports.sortHelper = {
    dynamicSort(query) {
        var _a;
        const sortBy = query.sort_by || "name";
        const sortType = ((_a = query.sort_type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "desc" ? "DESC" : "ASC";
        if (!["price", "rating", "name", "category"].includes(sortBy)) {
            throw new Error(`Invalid sort field: ${sortBy}`);
        }
        return `${sortBy} ${sortType}`;
    },
};
