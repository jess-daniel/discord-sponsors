# discord-sponsors

## Objective

Give discord server owners the ability to automatically serve sponsored posts. This increases revenue for the discord server and opens up a potentially new marketing channel for sponsors.

The bot will need to work in conjuntion with a web app that is able to accept payments and add sponsorship data to the database that the bot will then pull in.

## Command Usage:

### \_sync

Syncs a dicord server's channels and members with what's stored in the database. If the server is not in the database, this will add it.

This command needs to be ran periodicallly to keep data up-to-date for sponsorship pricing. One solution may be to run this command in a private channel on a set interval.
