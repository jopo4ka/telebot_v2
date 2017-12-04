var socket = io();

$(function () {
    var socket = io();
    $('#snd').click(function(){
      socket.emit('reply msg', {text:$('#text').val(), usr:$('#user').text()});
      $('#text').val('');
      return false;
    });
  });
