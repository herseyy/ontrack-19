# Use this template

## Setup

- Install python 3.9 https://www.python.org/downloads/release/python-390/
- Install poetry https://python-poetry.org/docs/

After installing python and poetry, run the following command

```
poetry install
```

If you cannot install/run poetry, you can use this:

```
pip install -r requirements.txt
```

## Running application

```
poetry run uvicorn app.server:app --reload
```

If not using poetry

```
uvicorn app.server:app --reload
```

Once you successfully install the application


This command will run the application. Check http://127.0.0.1:8000 to see your web sever.

Sample api:
- http://127.0.0.1:8000/symptoms will give you the list of symptoms

You can add the html files in the pages folder.