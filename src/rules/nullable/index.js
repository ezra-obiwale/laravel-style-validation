const nullable = (value, options = {}) => {
    const { data = {}, field = null } = options

    if (field && data[field] === undefined) {
        data[field] = null
    }

    return true
}

export default nullable
