create table v2characterowner (
	id serial primary key,
	characterid integer,
	ownerid integer
);

create table v2characterpages (
	id serial primary key,
	index integer,
	pagetypeid integer,
	characterid integer
);