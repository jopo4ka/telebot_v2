var socket = io();
//$('#man').prop('checker', man)

var c = document.querySelector('#manCh');
$(function () {
    $('#snd').click(function(){
      socket.emit('reply msg', {text:$('#text').val(), usr:id});
      $('#text').val('');
      return false;
    });
    $('#manCh').click(function(){
      c.checked != c.checked;
      socket.emit('change man', {man:c.checked, id:id });
    });
  });
