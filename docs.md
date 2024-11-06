-- API --

-- REGISTER & LOGIN --

request body register = {
    "username" : ...
    "email: : ...
    "password" ...
}
http://localhost:${PORT}/api/register

request body login = {
    "email: : ...
    "password" ...
}

http://localhost:${PORT}/api/login


path for testing bearer token

http://localhost:${PORT}/api/me

-- CRUD API --
http://localhost:${PORT}/api/task (GET)

request body create = {
    "todo: : ...
    "userId" ...
}

http://localhost:${PORT}/api/task (POST)

request body update = {

    "todo: : ...
}

http://localhost:${PORT}/api/task/:id (PUT)
http://localhost:${PORT}/api/task/:id (DELETE)