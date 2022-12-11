import { Button } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FlashCard from "../components/Flashcard"
import { SetData } from "../types"
import "./Sets.css"

function Sets() {
    const { id } = useParams()

    const [data, setData] = useState<SetData>()
    const [index, setIndex] = useState(0);
    const [length, setLength] = useState(0)

    useEffect(() => {
        async function getData() {
            await fetch("/api/sets/" + id)
                .then(res => res.json())
                .then(res => {
                    const things = res[id ?? ""]
                    setData(things);
                    setLength(things.data.length)
                })
        }

        getData()
    }, [])

    const left = () => {
        setIndex((index - 1 + length) % length)
    }

    const right = () => {
        setIndex((index + 1) % length)
    }

    return (
        <div className="card-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div>
                {data ? <h1>{data.title}</h1> : <></>}
            </div>
            <div className="display-index">
                {index + 1} of {length}
            </div>
            <div className="whole-card">
                <Button variant="contained" onClick={left}>{"<"}</Button>
                {data ? <FlashCard {...data.data[index]} /> : <>Set not found</>}
                <Button variant="contained" onClick={right}>{">"}</Button>
            </div>
        </div>

    )
}

export default Sets