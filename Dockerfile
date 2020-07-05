FROM node:latest

RUN apt-get update
RUN apt-get install -y locales

RUN locale-gen en_US.UTF-8  
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8

RUN curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
RUN chmod a+rx /usr/local/bin/youtube-dl

VOLUME /tmp
WORKDIR /tmp

# ENTRYPOINT ["/usr/bin/nodejs"]
CMD ["/bin/bash","./run.sh"]
