const parentButtons = document.querySelectorAll('.button__parent');
parentButtons.forEach((n) => { 
    n.addEventListener("click", () => {
        parentButtons.forEach(nodes => {
            nodes.classList.remove("active");
        });
        n.classList.add("active");
    })
})