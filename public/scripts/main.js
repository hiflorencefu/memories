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
        success: function() {
            console.log("success!");
        }
    })
})
