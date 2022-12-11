package main

import (
	"encoding/json"

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
//done
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

	router.GET("/api/sets/:name/", func(ctx *gin.Context) {
		name := ctx.Param("name")
		log.Println("bcsharp")

		// dsnap, err := client.Collection("sets").Doc(name).Get(context.Background())
		// test(err)
		// dMap := dsnap.Data()
		// jsonStr, err := json.Marshal(dMap)
		// test(err)
		// ctx.IndentedJSON(http.StatusOK, jsonStr)

		var arr = make(map[string]interface{}, 0)
		iter := client.Collection("sets").Documents(ctx)
		for {
			doc, err := iter.Next()
			if err == iterator.Done {
				break
			}
			test(err)
			amog := doc.Ref.ID
			if amog == name {
				arr[amog] = doc.Data()
				break
			}

				
		}
		ctx.IndentedJSON(http.StatusOK, arr)
	})

	router.GET("/api/sets/:name/:id", func(ctx *gin.Context) {
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

	router.GET("/api/sets", func(ctx *gin.Context) {
		var arr = make(map[string]interface{}, 0)
		iter := client.Collection("sets").Documents(ctx)
		for {
			doc, err := iter.Next()
			if err == iterator.Done {
				break
			}
			test(err)
			arr[doc.Ref.ID] = doc.Data()
		}
		ctx.IndentedJSON(http.StatusOK, arr)

	})

	//router.POST("/api/sets/:name", func(ctx *gin.Context) {
	//name := ctx.Param("name");

	//});

	router.Run(":3000")
}
