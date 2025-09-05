// @ts-ignore
import { Pool } from 'pg'
import { databaseCredentials } from '../server-config'

import { Error } from '../interfaces/apiInterfaces'

const pool = new Pool(databaseCredentials)

type Params = string | number | null | undefined

export default async function query(text: string, params?: Params[] | Params): Promise<any[]> {
    let result = []
    if (Array.isArray(params)) {
        result = await pool.query(text, params).catch(logError(text, params))
    } else if (!params) {
        result = await pool.query(text).catch(logError(text, params))
    } else {
        result = await pool.query(text, [params]).catch(logError(text, params))
    }
    return result?.rows ? result.rows : []
}

function logError(text: string, params?: Params[] | Params) {
    return (error: Error) => {
        console.log(text, '\n', params, '\n', error)
    }
}