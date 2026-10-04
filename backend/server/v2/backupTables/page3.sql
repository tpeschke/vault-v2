create table
    v2Page3Basics (
        id serial primary key,
        pageID integer unique,
        notes text default '',
        copper integer default 0,
        copperSize varchar(50) default '',
        silver integer default 0,
        silverSize varchar(50) default '',
        gold integer default 0,
        goldSize varchar(50) default '',
        platinum integer default 0,
        platinumSize varchar(50) default ''
    );

create table
    v2Page3Contacts (
        id serial primary key,
        pageID integer,
        value varchar(500),
        index integer
    );

create table
    v2Page3Relationships (
        id serial primary key,
        pageID integer,
        value varchar(500),
        r integer,
        p integer,
        index integer
    );

create table
    v2Page3Gear (
        id serial primary key,
        pageID integer,
        slot varchar(50),
        item varchar(500) default '',
        size varchar(50) default '',
        staffSnake boolean default false,
        meditating boolean default false,
        w integer,
        unique (pageID, slot)
    );
