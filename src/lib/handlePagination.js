export const getPagingData = (count, page, limit) => {
    const totalItems = count
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)
    return { totalItems, totalPages, currentPage }
}

export const getPagination = (page, size) => {
    const limit = size ? +size : 3
    const skip = page ? page * limit : 0
    return { limit, skip }
}
