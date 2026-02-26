function Tile({ letter, index, color}) {
    return (
        <div className="tile"
            id={`tile-${index}`}
            style={{backgroundColor:color}}
        >
        {letter}
        </div>
    )
}

export default Tile