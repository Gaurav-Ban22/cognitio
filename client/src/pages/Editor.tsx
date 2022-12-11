import { Button, TextField } from "@material-ui/core"
import { useState } from "react"
import { SetData } from "../types"

function Editor() {
    const [cards, setCards] = useState<string[][]>([["", ""]])
    const [name, setName] = useState<string>("Untitled")
    const [index, setIndex] = useState(0)

    function left() {
        setIndex((index + cards.length - 1) % cards.length)
    }

    function right() {
        setIndex((index + 1) % cards.length)
    }

    function getSetData() {
        const res: SetData = { title: name, data: cards.map(([front, back]) => { return { front: front, back: back } }) }
        return JSON.stringify(res)
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                <div style={{ margin: "10px" }}>
                    Title
                    <TextField title="Set Title" onChange={(e) => setName(e.target.value)} value={name} />
                    <div className="front">
                        <h3>Front Side</h3>
                        <TextField style={{ width: "400px" }} variant="filled" onChange={(e) => {
                            const temp = [...cards]
                            temp[index][0] = e.target.value
                            setCards(temp)
                        }
                        } value={cards[index][0]} multiline />
                    </div>
                    <div className="back">
                        <h3>Back Side</h3>
                        <TextField style={{ width: "400px" }} variant="filled" onChange={(e) => {
                            const temp = [...cards]
                            temp[index][1] = e.target.value
                            setCards(temp)
                        }
                        } value={cards[index][1]} multiline />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Button variant="contained" onClick={() => {
                            setCards([...cards, ["", ""]])
                            setIndex(index + 1)
                        }}>+</Button>
                        <Button variant="contained" onClick={() => {
                            fetch("/api/sets", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: getSetData()
                            });
                        }}>Upload</Button>
                    </div>

                </div>

                <div style={{ position: "absolute", bottom: "0px", display: "flex", flexDirection: "row", margin: "0", width: "100%" }}>
                    <Button variant="contained" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", left: "0px", height: "100%" }} onClick={left}>{"<"}</Button>
                    <div>
                        {cards.map(([front]) => <div style={{ border: "1px solid white", backgroundColor: "#bbb", padding: "2%", textAlign: "center", width: "200px", height: "150px", marginRight: "10px" }}>{front}</div>)}
                    </div>
                    <Button variant="contained" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", right: "0px", height: "100%" }} onClick={right}>{">"}</Button>
                </div>
            </div>
        </div >
    )
}

export default Editor