create table
	v2characterowner (characterid serial primary key, ownerid integer);

create table
	v2characterpages (
		id serial primary key,
		index integer,
		pagetypeid integer,
		characterid integer
	);

create table
	v2generalinfo (
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

create table
	v2stats (
		characterid integer,
		str integer default 0,
		dex integer default 0,
		con integer default 0,
		mem integer default 0,
		ins integer default 0,
		pre integer default 0
	);