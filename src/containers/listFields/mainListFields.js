export const MainListField = (props) => {
    const { label, value } = props
    return (
        <>
            <label htmlhtmlFor="basic-url" className="infoLabel1">{label}</label>
            <p className="" style={{ fontSize: '16px' }}>{value}</p>
        </>
    )
}

export const BoldListField = (props) => {
    const { label, value } = props
    return (
        <>
            <label htmlhtmlFor="basic-url" className="size18700">{label}</label>
            <p className="" style={{ fontSize: '16px' }}>{value}</p>
        </>
    )
}