import { useEffect, useState } from "react"
import { SetData } from "../types"

function SetPreview({ id }: { id: string }) {
    const [data, setData] = useState<SetData>()

    useEffect(() => {
        fetch("/api/sets/" + id)
            .then(res => res.json())
            .then(res => {
                const things = res[id ?? ""]
                setData(things);
            })
    }, [])

    if (data) {
        return (
            <div style={{ textAlign: "center" }}>
                <h3>{data.title}</h3>
                {data.data.length ? <div style={{ border: "1px solid white", backgroundColor: "#bbb", padding: "2%", textAlign: "center", width: "200px", height: "150px", marginRight: "10px" }}>{data.data[0].front}</div> : <></>}
            </div>

        )
    }

    else {
        return (
            <>This set is empty right now, come back later!</>
        )
    }
}

export default SetPreview