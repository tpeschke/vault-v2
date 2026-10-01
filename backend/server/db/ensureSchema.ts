import query from './database'

export default async function ensureSchema() {
    await query(`alter table v2BasicCharacteristics add column if not exists currentEmotions varchar(250) default ''`)
    if (!await columnExists('v2basiccharacteristics', 'currentemotions')) {
        throw new Error('ensureSchema: currentEmotions missing on v2BasicCharacteristics')
    }

    await renameTable('v2convictions', 'v2descriptions')

    await renameTable('v2empathizedescriptions', 'v2influencedescriptions')
    await renameTable('v2lecturedescriptions', 'v2informdescriptions')
    await renameTable('v2temptdescriptions', 'v2inspiredescriptions')
}

async function tableExists(tableName: string) {
    const rows = await query(
        `select 1 from information_schema.tables where table_schema = 'public' and table_name = $1`,
        tableName
    )
    return rows.length > 0
}

async function columnExists(tableName: string, columnName: string) {
    const rows = await query(
        `select 1 from information_schema.columns where table_schema = 'public' and table_name = $1 and column_name = $2`,
        [tableName, columnName]
    )
    return rows.length > 0
}

async function renameTable(fromName: string, toName: string) {
    const hasFrom = await tableExists(fromName)
    const hasTo = await tableExists(toName)

    if (hasFrom && hasTo) {
        await query(`drop table ${toName}`)
        await query(`alter table ${fromName} rename to ${toName}`)
    } else if (hasFrom) {
        await query(`alter table ${fromName} rename to ${toName}`)
    }

    if (await tableExists(fromName)) {
        throw new Error(`ensureSchema: ${fromName} still exists after rename to ${toName}`)
    }
}
