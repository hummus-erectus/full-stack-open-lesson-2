import Part from "./Part"

function Content({course}) {
    return (
        <>
            {course.parts.map(part => <Part key={part.id} part={part} /> ) }
        </>
    )
}

export default Content