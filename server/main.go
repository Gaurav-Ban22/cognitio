package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/googleapis/enterprise-certificate-proxy/client"

	"context"
	"fmt"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"

	"google.golang.org/api/option"
)

func addCard(c *gin.Context){


}

func getCard(c *gin.Context) {


}

func getSet(c *gin.Context) {


}

func addSet(c *gin.Context) {


}

func main() {

	opt := option.WithCredentialsFile("./ServiceAccountKey.json")
  	app, err := firebase.NewApp(context.Background(), nil, opt)
	client, err := app.Firestore(context.Background());
	if err != nil {
		log.Fatalln(err);

	}
	defer client.Close();
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	router.GET("/sets/:name/", func(ctx *gin.Context) {
		name := ctx.Param("name");

		dsnap, err := client.Collection("sets").Doc(name).Get(context.Background())
		if (err != nil) {
			log.Fatalln(err);
		}
		dMap := dsnap.Data()
		jsonStr, err := json.Marshal(dMap);
		ctx.IndentedJSON(http.StatusOK, jsonStr);
		




	})

	router.Run(":3000")
}
  
  