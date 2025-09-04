FROM apify/actor-node-puppeteer-chrome:18

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm ci --only=prod --no-optional

# Next, copy the remaining files and directories with the source code.
# Since we do this after npm install, quick build will be really fast
# for most source file changes.
COPY . ./

# Run the image. By default, the main.js file is run.
CMD npm start
