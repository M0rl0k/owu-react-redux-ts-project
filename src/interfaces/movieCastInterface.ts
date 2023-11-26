export interface IMovieCast {
    id: number
    cast :
        {
            id: number
            known_for_department: string
            name: string
            popularity : number
        }[]
}