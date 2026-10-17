import { FindOptionsOrder, FindOptionsRelations,ObjectLiteral, Repository } from "typeorm";

interface PaginationResult<T> {
    error: boolean;
    data: T[];
    currentPage: number;
    lastPage: number;
    totalRecords: number;
}

export class PaginationServices {
    static async paginate<T extends ObjectLiteral>(
        repository: Repository<T>,
        page: number = 1,
        limit: number = 10,
        order: FindOptionsOrder<T> = { },
        relations: FindOptionsRelations<T> = {}
    ): Promise<PaginationResult<T>> {
        const totalRecords = await repository.count();

                if (totalRecords === 0) {
            return { error: false, data: [], currentPage: 1, lastPage: 1, totalRecords: 0 };
        }

        const lastPage = Math.ceil(totalRecords / limit);

        if (page > lastPage || page < 1) {
            throw new Error(`Página inválida, o total de páginas é ${lastPage}`);
        }

        const offset = (page - 1) * limit;

        const data = await repository.find({
            skip: offset,
            take: limit,
            order,
            relations
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