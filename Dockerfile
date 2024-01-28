# /Site/Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.8

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
RUN mkdir /code
WORKDIR /code

# Install any needed packages specified in requirements.txt
RUN apt-get update && apt-get install -y default-libmysqlclient-dev gcc python3-dev
RUN pip install pipenv

# Copy the current directory contents into the container at /code
COPY Pipfile Pipfile.lock /code/

# Install Python dependencies
RUN pipenv install

# Copy the entrypoint script
COPY entrypoint.sh /code/
RUN chmod +x /code/entrypoint.sh

# Set the script as the entrypoint
ENTRYPOINT ["/code/entrypoint.sh"]