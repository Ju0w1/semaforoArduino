const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

// Create a port
const port = new SerialPort({
  path: 'COM1',
  baudRate: 9600,
})

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))


module.exports = function(io) {

    parser.on('data', function (data) {
        
        // console.log( '--------')

        if(data === 'Modo: Semaforo' ){
            io.sockets.emit('cambioModo', 1)
        }
        
        if(data === 'Modo: Mantenimiento' ){
            io.sockets.emit('cambioModo', 0)
        }

        if(data === 'ledRojo ON' ){
            io.sockets.emit('ledRojo', 1);
        }

        if(data === 'ledRojo OFF' ){
            io.sockets.emit('ledRojo', 0);
        }

        if(data === 'ledVerde ON' ){
            io.sockets.emit('ledVerde', 1);
        }

        if(data === 'ledVerde OFF' ){
            io.sockets.emit('ledVerde', 0);
        }

        if(data === 'ledAmarillo ON' ){
            io.sockets.emit('ledAmarillo', 1);
        }

        if(data === 'ledAmarillo OFF' ){
            io.sockets.emit('ledAmarillo', 0);
        }
           
       
        // switch(data){
        //     case "Modo: Semaforo":
        //         io.sockets.emit('cambioModo', 1)
        //     case "Modo: Mantenimiento":
        //         io.sockets.emit('cambioModo', 0)
        //     case "ledRojo ON":
                
        //         io.sockets.emit('ledRojo', 1);
        //     case "ledRojo OFF":
        //         console.log( data)
        //         io.sockets.emit('ledRojo', 0);
        //     case "ledVerde ON":
        //         io.sockets.emit('ledVerde', 1);
        //     case "ledVerde OFF":
        //         io.sockets.emit('ledVerde', 0);
        //     case "ledAmarillo ON":
        //         io.sockets.emit('ledAmarillo', 1);
        //     case "ledAmarillo OFF":
        //         io.sockets.emit('ledAmarillo', 0);
        //     default:
        //         return 
        // }
    })

    io.on("connection",(socket)=>{
        console.log("Socket Conectado")
        socket.on("LED",function(valorLED,callback){
            if(valorLED == 1){
                port.write('p', function(err) {
                    if (err) {
                      return console.log('Error on write: ', err.message)
                    }
                    // console.log('message written')
                })
            }
            // else if(valorLED == 0){
            //     port.write('p', function(err) {
            //         if (err) {
            //           return console.log('Error on write: ', err.message)
            //         }
            //         console.log('message written')
            //     })
            // }
            // console.log("ValorLED:"+valorLED);
            callback(true);
        });        
    })
}