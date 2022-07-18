CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table IF NOT EXISTS productsList (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price integer
);

create table IF NOT EXISTS stocks (
	product_id uuid not null primary key,
	count integer,
	foreign key (product_id) references productsList(id) ON DELETE CASCADE
);

insert into productsList (title, description, price) values ('Product 1', 'Short Product Description 1', 40);
insert into productsList (title, description, price) values ('Product 2', 'Short Product Description 2', 65);
insert into productsList (title, description, price) values ('Product 3', 'Short Product Description 3', 25);
insert into productsList (title, description, price) values ('Product 4', 'Short Product Description 4', 20);
insert into productsList (title, description, price) values ('Product 5', 'Short Product Description 5', 37);
insert into productsList (title, description, price) values ('Product 6', 'Short Product Description 6', 43);
insert into productsList (title, description, price) values ('Product 7', 'Short Product Description 7', 78);

insert into stocks (product_id, count) values((SELECT id FROM productsList WHERE title = 'Product 1'), 3);
insert into stocks (product_id, count) values((SELECT id FROM productsList WHERE title = 'Product 2'), 3);
insert into stocks (product_id, count) values((SELECT id FROM productsList WHERE title = 'Product 3'), 15);
insert into stocks (product_id, count) values((SELECT id FROM productsList WHERE title = 'Product 4'), 5);
insert into stocks (product_id, count) values((SELECT id FROM productsList WHERE title = 'Product 5'), 9);
insert into stocks (product_id, count) values((SELECT id FROM productsList WHERE title = 'Product 6'), 3);
insert into stocks (product_id, count) values((SELECT id FROM productsList WHERE title = 'Product 7'), 5);







