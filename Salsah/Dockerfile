FROM teracy/angular-cli as builder

COPY . .

WORKDIR ./Salsah

RUN npm install --global yarn

RUN chown -R node:node .
USER node

RUN npm install --save bcrypt-nodejs
RUN yarn
RUN yarn add --dev @angular/cli

ENV PATH="$PATH:node_modules/@angular/cli/bin"

CMD ng serve --host 0.0.0.0