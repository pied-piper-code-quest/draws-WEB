export interface ResponseWithPagination<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
}
