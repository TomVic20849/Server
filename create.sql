CREATE TABLE rooms (
rooms_id SERIAL PRIMARY KEY,
password VARCHAR(4) NOT NULL,
app_pic_number INTEGER NOT NULL,
is_app_connected BOOLEAN DEFAULT false,
powerup_id INTEGER NOT NULL,
is_cooldown_active BOOLEAN DEFAULT false
);