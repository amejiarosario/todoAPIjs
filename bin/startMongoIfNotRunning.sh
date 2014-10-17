#!/bin/sh

# checks if the mongod is running, starts it if not
if pgrep -q mongod; then
    echo 'mongodb is already running';
else
    mongod;
fi

exit 0;
