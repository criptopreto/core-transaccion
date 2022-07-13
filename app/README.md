`CREATE EXTENSION "uuid-ossp";`
sequelize model:create --name users --attributes id_card:string,first_name:string,last_name:string,username:string,hash:string,salt:string,email:string,phone:string,birthday:string,country:string,gender:string,status:string,staff:boolean,role:string

sequelize model:create --name currency --attributes name:string,symbol:string,value:float,principal:boolean

sequelize model:create --name pay_accounts --attributes pay_id:string,value:float,user_id:string,currency_id:string

sequelize model:create --name transactions --attributes currency_id:string,amount:float,crypto_hash:string,type:integer,exchange_fee:float,user_id:string,account_id:string,destinatay_id:string,status:string

sequelize migration:generate --name add-pay-account-associate
sequelize migration:generate --name add-currency-associate
sequelize migration:generate --name add-transactions-associate
