# /Site/Dockerfile

FROM python:3.8
ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code

RUN apt-get update && apt-get install -y default-libmysqlclient-dev gcc python3-dev

RUN pip install pipenv

COPY Pipfile Pipfile.lock /code/

RUN pipenv install
