FROM busybox
COPY bin/ /www-data/
VOLUME ['/www-data']
