$(document).ready(function(){
  // console.log("Sitio Descargado")
  const socket=io();

  socket.on('cambioModo', function(modo){
    const label = document.getElementById("lbl_led_status");
    const boton = document.getElementById("btn_on");
    if(modo === 1){
      label.innerHTML = 'Mantenimiento'
      boton.value = 'Semaforo'
      if(boton.classList.contains("btn-danger")){
        boton.classList.remove("btn-danger");
        boton.classList.add("btn-success");
      }  
    }else if(modo === 0){
      label.innerHTML = 'Semaforo'
      boton.value = 'Mantenimiento'
      if(boton.classList.contains("btn-success")){
        boton.classList.remove("btn-success");
        boton.classList.add("btn-danger");
      }
      
    }
  })

  socket.on('ledRojo', function(modo){
    // console.log('Modo',modo)
    const led = document.getElementById("red-light");
    if(modo === 1){
      if(led.classList.contains("off")){
        led.classList.remove("off");
      }  
    }else if(modo === 0){
      if(!led.classList.contains("off")){
        led.classList.add("off");
      }
    }
  })

  socket.on('ledVerde', function(modo){
    const led = document.getElementById("green-light");
    if(modo === 1){
      if(led.classList.contains("off")){
        led.classList.remove("off");
      }  
    }else if(modo === 0){
      if(!led.classList.contains("off")){
        led.classList.add("off");
      }
    }
  })

  socket.on('ledAmarillo', function(modo){
    const led = document.getElementById("yellow-light");
    if(modo === 1){
      if(led.classList.contains("off")){
        led.classList.remove("off");
      }  
    }else if(modo === 0){
      if(!led.classList.contains("off")){
        led.classList.add("off");
      }
    }
  })

  $("#btn_on").click(function(){
    socket.emit("LED",1,function(data){
      //  console.log(data);
    });
  });

  // $("#btn_off").click(function(){
  //       socket.emit("LED",0,function(data){
  //       console.log(data);
  //   });
  // });
  
});