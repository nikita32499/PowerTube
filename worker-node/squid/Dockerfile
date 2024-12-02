FROM ubuntu:24.04

ARG APPDIR

RUN apt update -y
RUN apt install squid-openssl apache2-utils libssl-dev openssl -y

COPY ${APPDIR}/squid.conf /etc/squid/squid.conf
COPY ${APPDIR}/entry.sh /
# COPY ${APPDIR}/passwd /etc/squid/passwd

RUN chmod a+x entry.sh

CMD ["/entry.sh"]
