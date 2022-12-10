package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"context"

	firebase "firebase.google.com/go"

	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

func test(er error) {
	if er != nil {
		log.Println(er)
	}
}

func main() {

	opt := option.WithCredentialsFile("./ServiceAccountKey.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	test(err)
	client, err := app.Firestore(context.Background())
	test(err)
	defer client.Close()
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	router.Group("/api")
	{
		router.GET("/sets/:name/", func(ctx *gin.Context) {
			name := ctx.Param("name")

			dsnap, err := client.Collection("sets").Doc(name).Get(context.Background())
			test(err)
			dMap := dsnap.Data()
			jsonStr, err := json.Marshal(dMap)
			test(err)
			ctx.IndentedJSON(http.StatusOK, jsonStr)
		})

		router.GET("/sets/:name/:id", func(ctx *gin.Context) {
			name := ctx.Param("name")
			id := ctx.Param("id")
			intID, err := strconv.Atoi(id)
			test(err)

			dsnap, err := client.Collection("sets").Doc(name).Get(context.Background())
			test(err)
			dMap := dsnap.Data()

			for d, v := range dMap {
				m, err := strconv.Atoi(d)
				if m == intID && err != nil {
					jsoS, err := json.Marshal(v)
					if err != nil {
						ctx.IndentedJSON(http.StatusOK, jsoS)
					}
				}
			}
		})

		router.GET("/sets", func(ctx *gin.Context) {
			iter := client.Collection("sets").Documents(ctx)
			for {
				doc, err := iter.Next()
				if err == iterator.Done {
					break
				}
				test(err)
				fmt.Println(doc.Data())
			}

		})
	}

	//router.POST("/api/sets/:name", func(ctx *gin.Context) {
	//name := ctx.Param("name");

	//});

	router.Run(":3000")
}
