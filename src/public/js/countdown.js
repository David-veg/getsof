


 var countdown = document.querySelector('.countdown');
var countDownDate = new Date("2021/11/16 18:00:00").getTime();



// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"

                        countdown.innerHTML = `

                                <div class="button-group">
                                    <button type="button" class="btn waves-effect waves-light btn-rounded btn-outline-primary">`+days+` Días</button>
                                    <button type="button" class="btn waves-effect waves-light btn-rounded btn-outline-secondary">`+hours+` Horas</button>
                                    <button type="button" class="btn waves-effect waves-light btn-rounded btn-outline-success">`+minutes+` Minutos</button>
                                    <button type="button" class="btn waves-effect waves-light btn-rounded btn-outline-info">`+seconds+` Segundos</button>
                                   
                                </div>

                                 `;



  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);






