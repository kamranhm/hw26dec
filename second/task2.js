$(document).ready(function () {

    $("#task-input").on("keyup", function (e) {
        if (e.keyCode == 13) {
            $.fn.addTask();
        }
    });

    $("#deadline-input").on("keyup", function (e) {
        if (e.keyCode == 13) {
            $.fn.addTask();
        }
    });

    $("#add-task").click(function () {
        $.fn.addTask();
    });

    $.fn.renderTask = function (task) {
        let newLi = $("<li></li>");
        newLi.addClass("list-group-item");
        newLi.attr("data-text", task.text);
        newLi.text(task.text);
        newLi.on("click", function () {
            this.toggleClass("active");
        });
        
        let newSpan = $("<span></span>");
        newSpan.addClass("badge", "rounded-pill");
        newSpan.text(task.deadline + " minutes left.");


        newLi.append(newSpan);
        $("#task-wrapper").append(newLi);

        $("#delete-buttons").removeClass("d-none");
    }
    
    $.fn.addTask = function () {
        let deadlineValue = $("#deadline-input").val();
        let taskValue = $("#task-input").val();
        $("#task-input").val("");
        $("#deadline-input").val();

        if (taskValue == "" || deadlineValue == "") {
            alert("You can not add an empty task!");
            return;
        }

        let d1 = new Date(deadlineValue);
        let d2 = new Date();

        let newTask = {
            text: taskValue,
            deadline: d1 - d2,
        }

        $.fn.renderTask(newTask)

        tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
        tasksFromStorage.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));
    }

    
    $("#reset").on("click", function () {
        $("#task-wrapper").text("");
        $("#delete-buttons").addClass("d-none");
        localStorage.setItem("tasks", JSON.stringify([]));
    });

    $("#delete-selected").on("click", function () {
        $.fn.deleteSelectedTasks();
    });

    $("document").on("keyup", function () {
        if (e.keyCode == 8 && e.ctrlKey == true) {
            $.fn.deleteSelectedTasks();
        }
    });

    $.fn.deleteSelectedTasks = function () {

        tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));

        for (const item of document.querySelectorAll(".list-group-item.active")) {
            let indexToBeDeleted = tasksFromStorage.findIndex(task => task.text == item.getAttribute("data-text"));
            tasksFromStorage.splice(indexToBeDeleted, 1);
            item.remove();
        }

        localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));

        if (document.querySelectorAll(".list-group-item").length == 0) {
            $("#delete-buttons").addClass("d-none");
        }
    }
    $("window").on("blur", function () {
        $("title").text("You have mutiple tasks to do!");
    });

    $("window").on("focus", function () {
        $("title").text("Welcome!");
    });

    $.fn.msToMin = function (time) {
        return Math.round(time / 60000);
    }

    if (localStorage.getItem("tasks") == null) {
        localStorage.setItem("tasks", JSON.stringify([]));
    } else {
        tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
        for (const task of tasksFromStorage) {
            $.fn.renderTask(task)
        }
        
    }
});
