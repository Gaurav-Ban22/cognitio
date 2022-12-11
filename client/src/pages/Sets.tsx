import { Card as CardMUI } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SetData } from "../types"

function Sets() {
    const { id } = useParams()

    const [data, setData] = useState<SetData>()
    useEffect(() => {
        async function getData() {
            fetch("/api/sets/" + id)
                .then(res => res.json())
                .then(res => setData(res))
        }

        getData()
    })
    return (
        <div>
            {data?.data.map(v => <h1>{v.front} {v.back}</h1>)}
        </div>
    )
}

export default Sets