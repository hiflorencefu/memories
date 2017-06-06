function setup() {
    $(".window").draggable();

    $('li').click(function(e) {
        if (e.target.localName != 'img') {
            $(this).find('.window').css('display', 'block')
        }
    })

    $('.close').click(function(e) {
        $(e.target).closest('.window').css('display', 'none')
    })
}

$('input[name="submit"]').click(function(e) {
    e.preventDefault();

    var memory = {
        feeling: $('input[name="feeling"]').val(),
        time: $('input[name="time"]').val(),
        place: $('input[name="place"]').val(),
        event: $('input[name="event"]').val(),
        company: $('input[name="company"]').val(),
        sense: {
            sight: $('input[name="sight"]').val(),
            sound: $('input[name="sound"]').val(),
            smell: $('input[name="smell"]').val(),
            touch: $('input[name="touch"]').val(),
            taste: $('input[name="taste"]').val()
        }
    }

    $.ajax({
        type: 'POST',
        url: '/memory',
        data: memory,
        success: function(data) {
            $(e.target).closest('.window').addClass('submitted')
        }
    })
})

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/memories',
        success: function(memories) {
            for (var item of memories) {
                var memory = item.memory
                var $memoryItem = $(document.createElement('li'))
                $memoryItem.html(memory.title)
                var $memoryWindow = $(document.createElement('div'))
                $memoryWindow.addClass('window')
                $memoryWindow.append('<div class="bar"><span class="close"><img src="/assets/close.svg" alt=""></span></div>')

                $memoryContent = $(document.createElement('div'))
                $memoryContent.addClass('window-content')

                $memoryContent.append('<p>' + memory.title + '</p>')
                $memoryContent.append('<p>' + memory.feeling + '</p>')
                $memoryContent.append('<p>' + memory.time + '</p>')
                $memoryContent.append('<p>' + memory.place + '</p>')
                $memoryContent.append('<p>' + memory.event + '</p>')
                $memoryContent.append('<p>' + memory.company + '</p>')
                $memoryContent.append('<p>' + memory.sense.sight + '</p>')
                $memoryContent.append('<p>' + memory.sense.sound + '</p>')
                $memoryContent.append('<p>' + memory.sense.smell + '</p>')
                $memoryContent.append('<p>' + memory.sense.touch + '</p>')
                $memoryContent.append('<p>' + memory.sense.taste + '</p>')

                $memoryWindow.css('position', 'absolute')
                $memoryWindow.css('display', 'none')

                $memoryWindow.append($memoryContent)
                $memoryItem.append($memoryWindow)
                $('.memories').append($memoryItem)
            }

            setup()
        }
    })
})
