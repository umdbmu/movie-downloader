FROM node:latest

RUN apt-get update
RUN apt-get install -y locales

RUN sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen \
  && locale-gen
ENV LANG ja_JP.UTF-8

RUN curl -k -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
RUN chmod a+rx /usr/local/bin/youtube-dl

VOLUME /workspace
WORKDIR /workspace

# ENTRYPOINT ["/usr/bin/nodejs"]
CMD ["/bin/bash","./run.sh"]
