package main

import (
	"encoding/json"
	"fmt"
	"mangiamo/gzipper"
	"mangiamo/recipeJson"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var pubfiles, _ = filepath.Glob("public/*")
var resfiles, _ = filepath.Glob("public/resources/*")
var apiURL = "http://food2fork.com/api/search?key=cd16c92a86c4a770ab7db477e3eab80d&q="

func strInArr(a string, list []string) bool {
	for _, b := range list {
		if b == a {
			return true
		}
	}
	return false
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		http.ServeFile(w, r, "public/index.html")
		return
	}
	if !strInArr("public"+r.URL.Path, pubfiles) {
		errorHandler(w, r, http.StatusNotFound)
		return
	}
	http.ServeFile(w, r, "public"+r.URL.Path)
}

func resHandler(w http.ResponseWriter, r *http.Request) {
	if strInArr("public"+r.URL.Path, resfiles) {
		http.ServeFile(w, r, "public"+r.URL.Path)
		return
	}
	errorHandler(w, r, http.StatusNotFound)
}

func dataHandler(w http.ResponseWriter, r *http.Request) {
	req := strings.Split(r.URL.Path, "/")
	food := req[len(req)-1]
	u := apiURL + url.QueryEscape(food)
	resp := &recipeJson.RecData{}
	recipeJson.GetJson(u, resp)
	j, _ := json.Marshal(resp)
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
}

func errorHandler(w http.ResponseWriter, r *http.Request, status int) {
	if status == http.StatusNotFound {
		http.ServeFile(w, r, "public/404.html")
	}
}

func main() {
	reg, _ := regexp.Compile("\\\\")
	//adjust public files to change direction of slash
	for i, file := range pubfiles {
		pubfiles[i] = reg.ReplaceAllString(file, "/")
	}
	//adjust resource files to change direction of slash
	for i, file := range resfiles {
		resfiles[i] = reg.ReplaceAllString(file, "/")
	}
	http.HandleFunc("/", gzipper.MakeHandler(homeHandler))
	http.HandleFunc("/resources/", gzipper.MakeHandler(resHandler))
	http.HandleFunc("/data/", gzipper.MakeHandler(dataHandler))
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	fmt.Print("Listening on Port " + port)
	http.ListenAndServe(":"+port, nil)
}
