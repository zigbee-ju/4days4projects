
function getItems(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        generateItems(items);
    })
}

function generateItems(items){
    let itemsHTML = ""
    items.forEach((item) => {
        itemsHTML += `
        <div class="todo-item">
            <div class="check ">
                <div data-id = "${item.id}" class="check-mark ${item.status == "completed" ? "checked": ""}">
                    <img src="assets/icon-check.svg">
                </div>
            </div>
            <div class="todo-text ${item.status == "completed" ? "checked": ""}">
                ${item.text}
            </div>
        </div>`
    })
    document.querySelector(".todo-items").innerHTML = itemsHTML
    createEventListener()
    createButtonListener()
    clearCompleted()
    let totalItems = document.querySelector(".items-left")
    let count = 0
    items.forEach((item) => {
        item.status !== "completed"?count++:null
    })
    totalItems.innerHTML = `${count} items left`
}

function createEventListener(){
    let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark")
    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", () => {
            let item = db.collection("todo-items").doc(checkMark.dataset.id)
            item.get().then(function(doc){
                if(doc.exists){
                    let status = doc.data().status;
                    if(status == "active"){
                        item.update({
                            status: "completed"
                    })
                    } else{
                        item.update({
                            status: "active"
                        })
                    }
                }
            })
        })
    })
}

function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    db.collection("todo-items").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}

function createButtonListener(){
    let btns = document.querySelectorAll(".btn")
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let current = document.getElementsByClassName("active")
            current[0].className = current[0].className.replace("active", "")
            btn.classList.add("active")
            if(btn.innerHTML == "Active"){
               db.collection("todo-items").where('status','==','active').get().then((data) => {
                if(data.empty){
                    console.log('nothing')
                    let itemHTML = `
                    <div class="todo-item">
                        <div class="todo-text>
                        </div>
                    </div>`
                    document.querySelector(".todo-items").innerHTML = itemHTML
                }
                else{
                    let itemsHTML=  ""
                    data.forEach((doc) => {
                        item = doc.data()
                        itemsHTML += `
                        <div class="todo-item">
                            <div class="check">
                                <div data-id = "${item.id}" class="check-mark ${item.status == "completed" ? "checked": ""}">
                                    <img src="assets/icon-check.svg">
                                </div>
                            </div>
                            <div class="todo-text ${item.status == "completed" ? "checked": ""}">
                                ${item.text}
                            </div>
                        </div>`
                        document.querySelector(".todo-items").innerHTML = itemsHTML
                        console.log(item)
                    })
                }
               })
                
            }
            else if(btn.innerHTML == "All"){
                getItems()
            }
            else if(btn.innerHTML == "Completed"){
                db.collection("todo-items").where('status','==','completed').get().then((data) => {
                    if(data.empty){
                        console.log('nothing')
                        let itemHTML = `
                        <div class="todo-item">
                            <div class="todo-text>
                            </div>
                        </div>`
                        document.querySelector(".todo-items").innerHTML = itemHTML
                    }
                    else{
                        let itemsHTML=  ""
                        data.forEach((doc) => {
                            item = doc.data()
                            itemsHTML += `
                            <div class="todo-item">
                                <div class="check">
                                    <div data-id = "${item.id}" class="check-mark ${item.status == "completed" ? "checked": ""}">
                                        <img src="assets/icon-check.svg">
                                    </div>
                                </div>
                                <div class="todo-text ${item.status == "completed" ? "checked": ""}">
                                    ${item.text}
                                </div>
                            </div>`
                            document.querySelector(".todo-items").innerHTML = itemsHTML
                            console.log(item)
                        })
                    }
                   })
            }
        })
    })
}

function clearCompleted(){
    let clearBtn = document.querySelector(".items-clear")
    clearBtn.addEventListener('click', () => {
        let todoItems = document.querySelectorAll(".todo-item .check-mark")
        todoItems.forEach((item) => {
            console.log(item.dataset.id)
            let data = db.collection("todo-items").doc(item.dataset.id)
            data.get().then(function(doc){
                if(doc.exists){
                    let status = doc.data().status
                    if(status == 'completed'){
                        db.collection("todo-items").doc(item.dataset.id).delete()
                    }
                }
            })
        })
})
}
getItems()