FROM cypress/base

USER root

RUN uname -a && cat /etc/*release

# Install depency for .net8
RUN apt-get update
RUN apt-get install -y gpg
RUN apt-get install -y wget
RUN wget --no-check-certificate -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o microsoft.asc.gpg
RUN mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/
RUN wget --no-check-certificate https://packages.microsoft.com/config/debian/11/prod.list
RUN mv prod.list /etc/apt/sources.list.d/microsoft-prod.list
RUN chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
RUN chown root:root /etc/apt/sources.list.d/microsoft-prod.list

# Install .net8
RUN apt-get update && \
  apt-get install -y dotnet-sdk-8.0
