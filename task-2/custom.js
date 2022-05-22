const mainURL = "https://jsonplaceholder.typicode.com/"
const apis = [
    { urlKeyWord: "posts", showKeyWord: "Posts Data", classes: "btn btn-danger mx-3", headers: ["postId", "id", "title", "body"] },
    { urlKeyWord: "users", showKeyWord: "Users Data", classes: "btn btn-warning mx-3", headers: ["userId", "id", "name", "email", "body"] },
    { urlKeyWord: "photos", showKeyWord: "Photos Data", classes: "btn btn-success mx-3", headers: ["photoId", "id", "title", "url", "thumbnailUrl"] },
    { urlKeyWord: "todos", showKeyWord: "ToDos Data", classes: "btn btn-dark mx-3", headers: ["todosId", "id", "title", "body"] }
]
const Buttons = document.querySelector("#Buttons")
const data = document.querySelector("#data")

apis.forEach(api => {
    btn = document.createElement("button")
    btn.innerText = api.showKeyWord
    btn.classList = api.classes
    Buttons.appendChild(btn)
    btn.addEventListener("click", async () => {
        let myResult = await (await fetch(`${mainURL}${api.urlKeyWord}`)).json()
        console.log(myResult)

        const headers = document.querySelector("#head")
        api.headers.forEach((head, i) => {
            console.log(head)
            let th = document.createElement("th")
            th.innerText = head
            headers.appendChild(th)
        });
        myResult.forEach((res) => {
            console.log(res)
            var tr = document.createElement("tr")
            var tbody = document.querySelector("#body")
            api.headers.forEach((head, i) => {
                console.log(res[head])
                var td = document.createElement("td")
                td.innerText = res[head]
                document.querySelector("#body").appendChild(td)
                tr.appendChild(td)
                tbody.appendChild(tr)
            })
        })
    })
})