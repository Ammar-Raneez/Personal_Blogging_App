function typeAnimation() {
    Typed.new("#writing-text", {
        strings: [
            "Welcome to my Blog!"
        ],
        stringsElement: null,
        typeSpeed: 50,
        contentType: 'text',
        preStringTyped: function() {},
        onStringTyped: function() {}
    });

    var date = new Date();
    document.getElementById("date").innerText = date.getFullYear();
}

typeAnimation();