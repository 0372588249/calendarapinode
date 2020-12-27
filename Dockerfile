FROM node:carbon
# Create app directory
WORKDIR /usr/src/app
# Bundle app src
COPY . .
# Install app dependencies
RUN npm install

RUN chmod 777 run_server.sh
ENV GRDAI_ENV="production"
# CMD ./run_server.sh

CMD [ "npm", "start" ]

EXPOSE 18022
EXPOSE 18022