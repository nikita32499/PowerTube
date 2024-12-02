#!/bin/sh

# USERNAME=USERNAME
# PASSWORD=PASSWORD

# htpasswd -cb /etc/squid/passwd "${USERNAME}" "${PASSWORD}"



# cat /etc/squid/passwd

rm -f /run/squid.pid

exec "$(which squid)" -NYCd 1
