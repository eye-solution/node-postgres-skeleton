# EYE Solution's Skeleton

## Technology Stack
+ NodeJS
+ Express 4.x
+ Postgres 9.x
+ Babel 6.x
+ Socket.IO 1.3.x

## How to run
+ `npm install` (`sudo npm install` if linux/osx)
+ `node server` to test if runable or not


## How to use
+ Modify `config.json` for server config, ex: server port
+ Run `node test init_db` to create db and dump init data
+ Run `node test test_db` to test if database is connected

## Easiest way to run Postgres
+ Using docker:
```bash
docker run --name cont-name \
-e POSTGRES_PASSWORD=yourpassword \
-p 5432:5432 \
-d mdillon/postgis```

Happy Coding
