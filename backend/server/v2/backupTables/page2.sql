create table
    v2Page2Basics (
        id serial primary key,
        pageID integer unique,
        nativeLanguageName varchar(250) default '',
        nativeLanguageStat integer,
        nativeLanguageRank integer,
        armorSkillAdj integer default 0,
        genSkillDiscount integer default 0,
        combatSkillDiscount integer default 0,
        generalSkillNotes text default '',
        combatSkillNotes text default '',
        abilities text default '',
        burdens text default ''
    );

create table
    v2GeneralSkillSuites (
        id serial primary key,
        pageID integer,
        suiteID integer,
        stat integer,
        rank integer
    );

create table
    v2AdvancedGeneralSkills (
        id serial primary key,
        pageID integer,
        name varchar(250) default '',
        stat integer,
        rank integer,
        index integer
    );

create table
    v2CombatSkillSuites (
        id serial primary key,
        pageID integer,
        suiteID integer,
        rank integer
    );

create table
    v2AdvancedCombatSkills (
        id serial primary key,
        pageID integer,
        name varchar(250) default '',
        rank integer,
        index integer
    );
