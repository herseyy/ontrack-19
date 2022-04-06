# Use this template

## Setup

- Install python 3.9 https://www.python.org/downloads/release/python-390/
- Install poetry https://python-poetry.org/docs/

After installing python and poetry, run the following command

```
poetry install
```

## Running application

```
poetry run uvicorn app.server:app --reload
```

This command will run the application. Check http://127.0.0.1:8000 to see your web sever.

Sample api:
http://127.0.0.1:8000/symptoms - will give you the list of symptoms
