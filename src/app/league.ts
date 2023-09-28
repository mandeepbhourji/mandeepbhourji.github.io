export interface League {
    standings?: Standing[],
    all?: { lose: number, played: number, win: number, draw: number },
    goalsDiff: number,
    points: number,
    team?: {
        name: string,
        id: number,
        logo: string
    }
}

export interface Standing {
    games?: number,
    wins?: number,
    losses?: number,
    draws?: number,
    goalDiff?: number,
    points?: number,
    name?: string,
    id?: number,
    logo?: string,
}



