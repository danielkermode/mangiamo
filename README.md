# mangiamo
This is a remake of a simple node server I had made. I reimplemented the server in Go. The frontend remains the same, and since I wanted to continue to use npm for some dependencies on the front end I simply moved the package.json file into the client folder, where all the JS and whatnot lives.

```npm i``` needs to be run in the client folder to get all the npm deps.

I should keep a note: the scripts in package.json are intended to be run on windows (for example ```del``` is used instead of ```rm```).

The .slugignore file keeps a record of what is only being used as part of the build process, and not in the final app. It tells the slug compiler in Heroku to ignore those files (to keep the slug size down, as this is really just a Go application).

To run the server: assuming go is installed, and the source folder is in $GOPATH/src and called "mangiamo", cd to the folder and ```go install``` followed by ```mangiamo```.

