create table if not exists safehouses (
    id serial primary key,
    userID integer not null
);

create table if not exists safehousePages (
    id serial primary key,
    safehouseID integer not null,
    index integer not null,
    pageTypeID integer not null
);

create table if not exists safehousePage1 (
    pageID integer primary key,
    name varchar(250) not null default 'New Safehouse',
    location varchar(250) not null default '',
    cRankLimit integer,
    wealth integer,
    spaceLimit integer,
    wear integer
);

create table if not exists safehousePage1Functions (
    id serial primary key,
    pageID integer not null,
    section varchar(20) not null,
    name varchar(500) not null default '',
    rank integer,
    r boolean not null default false,
    space integer,
    notes varchar(500) not null default '',
    index integer not null
);

create table if not exists safehousePage2 (
    pageID integer primary key,
    npcs text not null default '',
    resources text not null default ''
);
