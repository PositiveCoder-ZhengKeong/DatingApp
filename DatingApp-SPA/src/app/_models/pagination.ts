// item get from the response header
export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;  // to store the "users" OR "photo"
    pagination: Pagination;
}
