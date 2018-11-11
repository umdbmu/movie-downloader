FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y git nodejs npm curl
RUN apt-get install -y locales
# RUN git clone https://github.com/creationix/nvm.git ~/.nvm
# RUN source ~/.nvm/nvm.sh
# RUN nvm install 9.2.0

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