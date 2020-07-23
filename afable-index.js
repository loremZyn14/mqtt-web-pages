$(document).ready(function () {

  var client;
  $('#btn-broker').click(function(){

    $('#status').text('Connecting...')
    client = mqtt.connect($('#broker-input').val())
    client.on('connect', function () {
      $('#status').text('Connected!')
    });

  });
 
  $('#btn-publish').click(function(){
    $time     = new Date()
    $topic    = `<td>${$('#topic-input').val()}</td>`;
    $payload  = `<td>${$('#message-input').val()}</td>`;
    $timestamp     = `<td>${$time.toDateString()+ " " + $time.toLocaleTimeString() }</td>`;

    $('#publishedMsg').prepend("<tr>" + $topic + $payload  + $timestamp +"</tr>");
    client.publish($('#topic-input').val(),$('#message-input').val());
    console.log($('#message-input').val())
    
  });

  $('#btn-subscribe').click(function(){
    $time     = new Date()
    $('#subscribeMsg').prepend(`<tr><td> ${$('#topic-subscribe').val()} </td> <td> ${$time.toDateString()+ " " + $time.toLocaleTimeString() }</td></tr> `)
    client.subscribe($('#topic-subscribe').val(),function(err){
      if(!err){
        // console.log($('#topic-subscribe').val())
        onMsg();
      }
    });
    
  });

  function onMsg(){
    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(topic)
      $time     = new Date()
      $topic    = `<td>${topic}</td>`;
      $payload  = `<td>${message}</td>`;
      $timestamp     = `<td>${$time.toDateString()+ " " + $time.toLocaleTimeString() }</td>`;
      $('#incomingMsg').prepend("<tr>" + $topic + $payload  + "</tr>");
      // client.end()
    })
  }

});

