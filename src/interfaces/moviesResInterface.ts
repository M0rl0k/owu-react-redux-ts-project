export interface IMoviesRes<T> {
    page: string
    results: T
    total_pages: number
    total_results: number
}