package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

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

// done
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

	router.POST("/api/sets", func(ctx *gin.Context) {
		jsoData, err := ioutil.ReadAll(ctx.Request.Body);
		test(err);
		var amogo any;
		err = json.Unmarshal(jsoData, amogo)
		test(err);
		client.Collection("sets").Add(ctx, amogo);

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

	router.GET("/api/sets/:name/", func(ctx *gin.Context) {
		name := ctx.Param("name")

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

	//router.POST("/api/sets/:name", func(ctx *gin.Context) {
	//name := ctx.Param("name");

	//});

	router.Run(":8080")
}
