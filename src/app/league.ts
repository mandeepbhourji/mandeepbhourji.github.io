export interface Standings {
    errors?: [],
    response: [
        {
            league: {
                standings: [
                    [Standing]
                ]
            }
        }
    ]
}

export interface Standing {
    all?: {
        played: number,
        win: number,
        draw: number,
        lose: number,
    },
    points?: number,
    goalsDiff?: number,
    team?: {
        id: number,
        name: string,
        logo: string
    }
}



export type JSONValue = boolean | number | string | null | JSONObject | JSONArray;
interface JSONObject {
    [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }