# Mesh Back End Tutorial & How To

### Getting Started: 
1. Determine if you need to start a new api/app folder. If an api already exists for your usecase, continue development there. 
2. If you do, ensure you are in the Site/mesh directory and run `django-admin startapp api_name`
3. Add a `urls.py` folder to the api
4. Follow the Example in `Site/mesh/urls.py` on how add urls and make a new api. 

### Learn by Example: 
There is an example available. It is still in progress. Here are some available features you can look at to view the example.

#### GET, Views, Django, Testing URLs & new App config
**Applicable Files:** 
- `Site/mesh/exampleapi/urls.py`
- `Site/mesh/exampleapi/views.py`
- `Site/mesh/urls.py`

**Test these Steps:** 
1. run `python manage.py runserver` in `Site/` 
2. open up your preferred browser and go to http://127.0.0.1:8000/example/ 
3. you should see "You Got Home". You can also verify through an app like Postman.This is expected because of the below steps.  
4. now go to your text editor of choice to look at `Site/mesh/exampleapi/views.py`. Notice the "index" function. 
5. Now look at `Site/mesh/urls.py`.  There should be a url that is defined by 'example' and what is included. 
6. This works because if you go to `Site/mesh/exampleapi/urls.py` you can see the urls defined.
 ```py 
urlpatterns = [
    
    # Home Path for Example API 'exampleapi'
    path('', exampleapi_views.index, name="index"),
    
    # Hello World Example
    path('helloworld/', exampleapi_views.hello_world, name="helloworld")
] 
```
 One is defined by '' which is the base defined as 'example/' in `Site/mesh/urls.py`and uses the "index" function you saw before in `Site/mesh/exampleapi/views.py`. That is where you saw the "You Got Home." message. 
 The other, 'helloworld/' is also defined. 

7. without shutting down your server, now go to http://127.0.0.1:8000/example/helloworld/ . The same explanation applies. 
