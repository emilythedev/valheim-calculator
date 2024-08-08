FROM cypress/browsers:node-20.12.2-chrome-124.0.6367.155-1-ff-125.0.3-edge-124.0.2478.80-1

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME
RUN npm install -g npm@10.4.0

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true
