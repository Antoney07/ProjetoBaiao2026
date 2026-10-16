"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationServices = void 0;
class PaginationServices {
    static async paginate(repository, page = 1, limit = 10, order = {}) {
        const totalRecords = await repository.count();
        const lastPage = Math.ceil(totalRecords / limit);
        if (page > lastPage || page < 1) {
            throw new Error(`Página inválida, o total de páginas é ${lastPage}`);
        }
        const offset = (page - 1) * limit;
        const data = await repository.find({
            skip: offset,
            take: limit,
            order
        });
        return {
            error: false,
            data,
            currentPage: page,
            lastPage,
            totalRecords
        };
    }
}
exports.PaginationServices = PaginationServices;
//# sourceMappingURL=PaginationServices.js.map