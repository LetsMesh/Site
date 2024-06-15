# Contributing to Let's Mesh Backend (API)

Thank you for considering contributing to Let's Mesh! Here are some guidelines to help you get started.

## Table of Contents

1. [Issue Tracking and Management](#issue-tracking-and-management)
2. [Backend Structure](#backend-structure)
3. [Writing tests](#writing-tests)
4. [Communication and Support](#communication-and-support)

## Issue Tracking and Management

We use GitHub Projects to manage and track issues for the Let's Mesh project. You can find our [project board here](https://github.com/orgs/LetsMesh/projects/2).

### How to Report an Issue

1. **Check Existing Issues**: Before creating a new issue (bug/task), please check if the issue has already been reported to avoid duplications.
2. **Open a New Issue**: If the issue does not exist, open a new issue and provide as much detail as possible. For bug reporting, please provide the steps to reproduce the bug.
3. **Link to Project Board**: Ensure your issue is linked to the project board for better tracking.

### How to Work on an Issue

1. **Assign Yourself**: If you are interested in working on an issue, assign it to yourself.
2. **Create a Branch**: Create a new branch from `dev` with a descriptive name related to the issue.
3. **Submit a Pull Request**: Once you have completed your work, submit a pull request (PR) and link it to the issue.

## Backend Structure

Our backend is structured to support both HTTP API requests and WebSocket connections using Django's ASGI and WSGI capabilities. Here’s an overview of our project structure:

- **`mesh/`**: backend
  - **`helpers/`**: Custom middlewares & helpers for request/response processing.
  - **`utils/`**: Utility functions.
  - **`exceptions/`**: Custom exception handling.
  - **`tests/`**: Test cases for API and WebSocket endpoints.
  - **`asgi.py`**: ASGI configuration for handling asynchronous requests.
  - **`routing.py`**: Routing configuration for WebSocket connections.
  - **`settings.py`**: Django project settings.
  - **`urls.py`**: URL routing configuration.
  - **`wsgi.py`**: WSGI configuration for handling synchronous requests.
  - Other folders (`accounts/`, `accountSettings/`, `auth`, `profiles/`, etc.): Each folder contains its own URLs and models to handle related operations.
- **`meshapp/`**: frontend

### Getting Started

1. **Determine if you need a new API/app**: If an API already exists for your use case, continue development there. Otherwise, create a new app.
2. **Create a new app**: Ensure you are in the `Site/mesh` directory and run `django-admin startapp api_name`.
3. **Add `urls.py` to the new app**: Follow the example in `Site/mesh/`urls.py`` to add URLs and create a new API.

### Learn by Example

Explore the example available in the project:

- **Files to Check**:

  - `Site/mesh/exampleapi/`urls.py``
  - `Site/mesh/exampleapi/`views.py``
  - `Site/mesh/`urls.py``

- **Steps to Test**:
  1. Run `python `manage.py` runserver` in `Site/`.
  2. Open a browser and go to [http://127.0.0.1:8000/example/](http://127.0.0.1:8000/example/). You should see "You Got Home".
  3. Check the `index` function in `Site/mesh/exampleapi/`views.py``.
  4. Check the URL definitions in `Site/mesh/`urls.py`` and `Site/mesh/exampleapi/`urls.py``.

Visit [http://127.0.0.1:8000/example/helloworld/](http://127.0.0.1:8000/example/helloworld/) to see the "Hello World" example.

## Writing Tests

Here are some guidelines for writing tests for our API endpoints in Django:

- Our Django setup has `APPEND_SLASH=true` by default, which appends a trailing slash to URLs and permanently redirects requests.

### Incorrect Way to Send Test Requests (without trailing slash):

```python
from django.test import TestCase, Client

class YourTestClass(TestCase):
    def setUp(self):
        self.client = Client()

    def your_test_case(self):
        response = self.client.get("/accounts")
        self.assertEqual(response.status_code, 200)  # This will not pass ❌
```

This will fail as `response.status_code` is 301 instead of 200, due to the permanent redirect.

### Correct Way to Send Test Requests:

```python
from django.test import TestCase, Client

class YourTestClass(TestCase):
    def setUp(self):
        self.client = Client()

    def your_test_case(self):
        response = self.client.get("/accounts", follow=True)
        self.assertEqual(response.status_code, 200)  # This will pass ✅

        response = self.client.get("/accounts/")
        self.assertEqual(response.status_code, 200)  # This will pass ✅
```

## Communication and Support

For easier communication and support, we invite all contributors to join our Discord server. Our project Discord server is beginner-friendly and a great place to ask questions, get feedback, and stay updated on the latest project developments. [Join our Discord server here](https://discord.gg/eUDKr8u55u).

We appreciate your contributions and look forward to collaborating with you on Let's Mesh!

---
