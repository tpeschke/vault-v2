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
		id serial primary key,
		characterid integer,
		str integer default 0,
		dex integer default 0,
		con integer default 0,
		mem integer default 0,
		ins integer default 0,
		pre integer default 0
	);

create table
	v2BasicCharacteristics (
		id serial primary key,
		characterid integer,
		capacity integer default 0,
		culturalStrength varchar(250) default '',
		socialSkillDiscount integer default 0,
		affability varchar(250) default '',
		openness varchar(250) default '',
		outgoingness varchar(250) default '',
		workEthic varchar(250) default '',
		worry varchar(250) default ''
	);

create table
	v2goals (
		id serial primary key,
		characterid integer,
		goal varchar(500)
	);

create table
	v2reputations (
		id serial primary key,
		characterid integer,
		value varchar(500),
		rank integer
	);

create table
	v2convictions (
		id serial primary key,
		characterid integer,
		value varchar(500),
		rank integer
	);

create table
	v2Relationships (
		id serial primary key,
		characterid integer,
		value varchar(500),
		rank integer
	);

create table
	v2flaws (
		id serial primary key,
		characterid integer,
		flaw varchar(500)
	);

create table
	v2SocialSkillSuites (
		id serial primary key,
		characterid integer,
		suiteid integer,
		stat integer default 0,
		rank integer default 0
	);

create table
	v2empathizeDescriptions (
		id serial primary key,
		characterid integer,
		value varchar(500) default '',
		rank integer default 0
	);

create table
	v2intimidateDescriptions (
		id serial primary key,
		characterid integer,
		value varchar(500) default '',
		rank integer default 0
	);

create table
	v2lectureDescriptions (
		id serial primary key,
		characterid integer,
		value varchar(500) default '',
		rank integer default 0
	);

create table
	v2temptDescriptions (
		id serial primary key,
		characterid integer,
		value varchar(500) default '',
		rank integer default 0
	);

create table
	v2movements (
		id serial primary key,
		characterid integer,
		crawl integer default 0,
		walk integer default 0,
		jog integer default 0,
		run integer default 0,
		sprint integer default 0
	);

create table
	v2SelfDoubt (
		id serial primary key,
		characterid integer,
		dieIndex integer default 0,
		threshold integer default 0,
		diePenalty integer default 0
	);

create table
	v2Damage (
		id serial primary key,
		characterid integer,
		dieIndex integer default 0,
		knockback integer default 0,
		damage integer default 0,
		threshold integer default 0
	);

create table
	v2Stress (
		id serial primary key,
		characterid integer,
		dieIndex integer default 0,
		stress integer default 0,
		threshold integer default 0
	);

create table
	v2Favor (
		id serial primary key,
		characterid integer,
        anointed boolean default false,
        current integer default 0,
        max integer default 0
	);