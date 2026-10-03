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

    await query(`alter table v2Favor add column if not exists divineRelationship varchar(500) default ''`)
    if (!await columnExists('v2favor', 'divinerelationship')) {
        throw new Error('ensureSchema: v2Favor.divineRelationship missing')
    }

    await query(`alter table v2descriptions add column if not exists label varchar(500) default ''`)
    await query(`alter table v2descriptions add column if not exists attackEmotion varchar(25) default ''`)
    await query(`alter table v2descriptions add column if not exists defenseEmotion varchar(25) default ''`)
    if (await columnExists('v2descriptions', 'value')) {
        await query(`update v2descriptions set label = value
            where (label is null or label = '') and value is not null and value <> ''`)
        await query(`alter table v2descriptions drop column if exists value`)
    }
    if (await columnExists('v2descriptions', 'value')) {
        throw new Error('ensureSchema: value still on v2descriptions')
    }
    if (!await columnExists('v2descriptions', 'label')) {
        throw new Error('ensureSchema: v2descriptions.label missing')
    }
    if (!await columnExists('v2descriptions', 'attackemotion')) {
        throw new Error('ensureSchema: v2descriptions.attackEmotion missing')
    }
    if (!await columnExists('v2descriptions', 'defenseemotion')) {
        throw new Error('ensureSchema: v2descriptions.defenseEmotion missing')
    }

    await query(`alter table v2BasicCharacteristics add column if not exists pageID integer`)
    if (await columnExists('v2basiccharacteristics', 'characterid')) {
        await query(`update v2BasicCharacteristics set pageID = characterid
            where pageID is null and characterid is not null`)
    }
    await query(`delete from v2BasicCharacteristics a using v2BasicCharacteristics b
        where a.pageID is not null and a.pageID = b.pageID and a.id < b.id`)
    await query(`create unique index if not exists v2basiccharacteristics_pageid_uidx
        on v2BasicCharacteristics (pageID)`)
    await query(`insert into v2BasicCharacteristics (pageID)
        select p.id from v2CharacterPages p
        where p.pageTypeID = 1
        and not exists (
            select 1 from v2BasicCharacteristics b where b.pageID = p.id
        )`)
    if (!await columnExists('v2basiccharacteristics', 'pageid')) {
        throw new Error('ensureSchema: v2BasicCharacteristics.pageID missing')
    }

    await dropCharacterIdOnlyUniquesOnPages()
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

function quoteIdent(name: string) {
    return `"${String(name).replace(/"/g, '""')}"`
}

async function characterIdOnlyUniqueConstraints() {
    return query(`
        select c.conname as name
        from pg_constraint c
        join pg_class t on t.oid = c.conrelid
        join pg_namespace n on n.oid = t.relnamespace
        join pg_attribute a on a.attrelid = t.oid and a.attnum = c.conkey[1]
        where n.nspname = 'public'
          and t.relname = 'v2characterpages'
          and c.contype = 'u'
          and array_length(c.conkey, 1) = 1
          and a.attname = 'characterid'
    `)
}

async function characterIdOnlyUniqueIndexes() {
    return query(`
        select i.relname as name
        from pg_index x
        join pg_class i on i.oid = x.indexrelid
        join pg_class t on t.oid = x.indrelid
        join pg_namespace n on n.oid = t.relnamespace
        join pg_attribute a on a.attrelid = t.oid and a.attnum = (x.indkey::smallint[])[1]
        where n.nspname = 'public'
          and t.relname = 'v2characterpages'
          and x.indisunique
          and not x.indisprimary
          and x.indnkeyatts = 1
          and a.attname = 'characterid'
    `)
}

async function dropCharacterIdOnlyUniquesOnPages() {
    const constraints = await characterIdOnlyUniqueConstraints()
    for (const { name } of constraints) {
        await query(`alter table v2CharacterPages drop constraint if exists ${quoteIdent(name)}`)
    }
    const indexes = await characterIdOnlyUniqueIndexes()
    for (const { name } of indexes) {
        await query(`drop index if exists ${quoteIdent(name)}`)
    }
    if ((await characterIdOnlyUniqueConstraints()).length || (await characterIdOnlyUniqueIndexes()).length) {
        throw new Error('ensureSchema: v2CharacterPages still has a unique on characterid')
    }
}
