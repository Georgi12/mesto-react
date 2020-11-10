
const cardSorting = (a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB= new Date(b.createdAt)
    return dateA - dateB
}

export default cardSorting