import query from './database'

export default async function ensureSchema() {
    await query(`create table if not exists v2currentEmotions (
        id serial primary key,
        pageID integer,
        value varchar(500),
        rank integer
    )`)
    if (!await tableExists('v2currentemotions')) {
        throw new Error('ensureSchema: v2currentEmotions missing')
    }

    if (await columnExists('v2basiccharacteristics', 'currentemotions')) {
        await query(`insert into v2currentEmotions (pageID, value, rank)
            select pageID, currentEmotions, 0 from v2BasicCharacteristics
            where currentEmotions is not null and currentEmotions <> ''
            and not exists (
                select 1 from v2currentEmotions e
                where e.pageID = v2BasicCharacteristics.pageID and e.rank = 0
            )`)
        await query(`alter table v2BasicCharacteristics drop column if exists currentEmotions`)
    }
    if (await columnExists('v2basiccharacteristics', 'currentemotions')) {
        throw new Error('ensureSchema: currentEmotions still on v2BasicCharacteristics')
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
