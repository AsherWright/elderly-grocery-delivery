FROM ruby:2.7.0-slim
ARG precompileassets

RUN apt-get update && apt-get install -y curl gnupg
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN curl -q https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

RUN apt-get -y update && \
      apt-get install --fix-missing --no-install-recommends -qq -y \
        build-essential \
        vim \
        wget gnupg \
        git-all \
        curl \
        ssh \
        postgresql-client-12 libpq5 libpq-dev -y && \
      wget -qO- https://deb.nodesource.com/setup_10.x  | bash - && \
      apt-get install -y nodejs && \
      wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
      echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
      apt-get update && \
      apt-get install yarn && \
      apt-get clean && \
      rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN gem install bundler
#Install gems
RUN mkdir /gems
WORKDIR /gems
COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install

COPY scripts/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

ARG INSTALL_PATH=/opt/elderly
ENV INSTALL_PATH $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY scripts/potential_asset_precompile.sh scripts/potential_asset_precompile.sh
RUN scripts/potential_asset_precompile.sh $precompileassets
