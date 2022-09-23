# Movie API

## Running locally

To clone this repo run following command:

```
git clone https://github.com/MrHouser/webbylab-test-project.git
```

After cloning create a `.env` file in the root folder and add two mandatory variables:

```
TOKEN_KEY=yoursecret
APP_PORT=3000
```

Run the following command to start the app:

```
npm run start
```

Open `http://<app_host>:<app_port>/documentation` in your browser to view the documentation.

## Building docker image

Run

```
docker build -t <image-name> .
```

## Running docker container

Run

```
docker run --name <your-contaner-name> -p 8000:8050 -e APP_PORT=8050 -e TOKEN_KEY=yourtokenkey <image-name>
```

`Keep in mind:` `-e APP_PORT=8050 -e TOKEN_KEY=yourtokenkey` in docker run command are mandatory, otherwise app could crash.  
After successful run you can reach API at `http://localhost:8000`

## Upload movies from .txt file

Open `http://localhost:8000/api/v1/movies/import` in your browser and you will get a form where you can select file from your computer and upload it to database. After uploading you can manipulate with that movies with API.
