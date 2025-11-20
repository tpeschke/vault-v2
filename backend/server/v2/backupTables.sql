create table v2characterowner (
	characterid serial primary key,
	ownerid integer
);

create table v2characterpages (
	id serial primary key,
	index integer,
	pagetypeid integer,
	characterid integer
);

create table v2generalinfo (
	id serial primary key,
	characterid integer,
    name varchar(250) default 'New Character',
    ancestry varchar(250) default '',
    class varchar(250) default '',
    subclass varchar(250) default '',
    level integer default 1,
    unspent integer default 0,
    spent integer default 0
);