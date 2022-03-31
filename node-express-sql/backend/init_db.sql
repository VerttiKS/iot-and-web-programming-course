CREATE TABLE IF NOT EXISTS collectors (
  id serial primary key,
  name varchar(100),
  email varchar(50),
  cars varchar(100),
  slogan varchar(200),
  trading boolean,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO public.collectors(name, email, cars, slogan, trading)
	VALUES ('Emerald Vega', 'proin.ultrices@yahoo.org', 'JLR, Mahindra', 'et netus et malesuada fames ac turpis egestas. Fusce aliquet', true);

INSERT INTO public.collectors(name, email, cars, slogan, trading)
	VALUES ('Philip Walters', 'augue.porttitor@aol.ca', 'Acura, Hyundai, Motors', 'justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate', false);

INSERT INTO public.collectors(name, email, cars, slogan, trading)
	VALUES ('Catherine Burgess', 'sodales.nisi.magna@google.couk', 'Ford, Vauxhall, Daihatsu', 'diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer', true);
