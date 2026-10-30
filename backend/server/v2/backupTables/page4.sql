create table
    v2Page4Notes (
        id serial primary key,
        pageID integer unique,
        scene text default ''
    );
