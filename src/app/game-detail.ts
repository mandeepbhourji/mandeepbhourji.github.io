export interface GameDetail {
    teams: {
        home: TeamDetails,
        away: TeamDetails
    },
    goals: {
        home: number,
        away: number
    }
}

export interface TeamDetails {
    id: number,
    logo: string,
    name: string,
    winner: boolean
}