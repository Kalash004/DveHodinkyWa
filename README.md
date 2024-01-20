# Chat Node.js aplikace
## Websocket, Express, Mysql
### Kuta Samuel C4b

## [Link na live server](http://ec2-13-49-21-193.eu-north-1.compute.amazonaws.com/views/login.html) bezici na AWS Cloud.

## Popis
Aplikace poskytuje REST API, ktere na urcitich endpointech poskytuje data o zpravach mezi uzivateli a ruznymi group chaty ulozene v databazi na serveru.
- Veskere informace o RESTAPI naleznete na /api, nebo pri proklikani se po prihlaseni.

Nestihl jsem implementovat webSocket pro live chat, ale je v kodu a uz pripravena jako router pro implementaci.

## Technicky popis, technologie
Aplikace je delana jako webovy/databazovy server. Na pozadi bezi Nginx jako reverse proxy na lokalni Node.js server. Ten je nakonfigurovan pomoci frameworku Express.js. 

Jako databaze bezi na serveru MySql, ve ktere se ukladaji data.
Detaily jako model databaze (slightly outdated) muzete najit v adresari db.

Autentikace je bezpecna, uzivatelska hesla se hashuji i se soli. 
## Autentikace
K aplikaci nema uzivatel pristup pokud se neprihlasi.
Jakmile se uzivatel prihlasi, vytvori se mu session a po urcitou dobu ma pristup k aplikaci.

### Pro prihlaseni si bud zalozte ucet, a nebo pouzijte jeden z nasledujicich
- *username* = **test1** *password* = **test1**
- *username* = **test2** *password* = **test2**
- *username* = **pavlat** *password* = **pavlat**

## REST API 
Poskytuje informace o zpravach v databazi.

### EDNPOINTS
- **`GET` /api/messages**

- **`GET` /api/messagesUser?user=<user>**

- **`GET` /api/messagesGroup?group=/<groupName>**


- **`GET` /api/messagesWord?word=<word>**


