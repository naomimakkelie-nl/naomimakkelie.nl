DROP TABLE IF EXISTS newsletter_subscribers;
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  email TEXT PRIMARY KEY,
  unsubscribe_token TEXT UNIQUE
);

