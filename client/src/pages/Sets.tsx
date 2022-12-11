import { Card as CardMUI } from "@material-ui/core"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function Sets() {
    const { id } = useParams()

    useEffect(() => {
        async function getData() {
            fetch("/api/sets/" + id)
                .then(res => res.json())
                .then(res => console.log(res))
        }

        getData()
    })
    return (
        <div>
            temp
        </div>
    )
}

export default Sets