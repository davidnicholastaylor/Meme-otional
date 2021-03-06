const remoteURL = "https://memeotional-server.herokuapp.com"

export default Object.create(null, {
    get: {
        value: function (link) {
            return fetch(`${remoteURL}/${link}`)
            .then(e => e.json())
        }
    },
    getUserData: {
        value: (resource, userId) => {
            return fetch(`${remoteURL}/${resource}?userId=${userId}`)
            .then(res => res.json())
        }
    },
    getAll: {
        value: function (link) {
            return fetch(`${remoteURL}/${link}`)
            .then(e => e.json())
        }
    },
    removeAndList: {
        value: function (id, link) {
            return fetch(`${remoteURL}/${link}/${id}`, {
                method: "DELETE"
            })
                .then(e => e.json())
                .then(() => this.getAll(link))
        }
    },
    post: {
        value: function (newItem, link) {
            return fetch(`${remoteURL}/${link}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem)
            })
                .then(e => e.json())
                .then(() => this.getAll(link))
        }
    },
    patch: {
        value: function (editItem, id, link) {
            return fetch(`${remoteURL}/${link}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editItem)
            }).then(e => e.json())
                .then(() => this.getAll(link))
        }
    }
})
