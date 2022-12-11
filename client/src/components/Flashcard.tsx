import "./card.css"

function FlashCard({ front, back }: { front: string, back: string }) {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <h1>{front}</h1>
                </div>
                <div className="flip-card-back">
                    <h1>{back}</h1>
                </div>
            </div>
        </div>
    )
}

export default FlashCard