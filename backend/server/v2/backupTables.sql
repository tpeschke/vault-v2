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