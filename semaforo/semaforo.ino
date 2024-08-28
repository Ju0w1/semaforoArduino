int led_rojo = 7;
int led_rojo_frec = 5000;

int led_amarillo = 6;
int led_amarillo_frec = 1000;

int led_verde = 5;
int led_verde_frec = 3000;

int mantenimiento_frec = 1000;

int interruptor = 12;
bool interruptor_estado;
bool interruptor_estado_ant = HIGH;

char data;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(led_rojo,OUTPUT);
  pinMode(led_amarillo,OUTPUT);
  pinMode(led_verde,OUTPUT);
  pinMode(interruptor,INPUT);

  if(interruptor_estado_ant){
    Serial.println("Modo: Semaforo");
  }else{
    Serial.println("Modo: Mantenimiento");
  }
}

void loop() {
  if (Serial.available()>0) {
    data = Serial.read();
  }

  interruptor_estado = digitalRead(interruptor);

  if((interruptor_estado == HIGH || data == 'p') && interruptor_estado_ant == LOW){
    interruptor_estado_ant = HIGH;
    Serial.println("Modo: Semaforo");
  }else if((interruptor_estado == HIGH || data == 'p') && interruptor_estado_ant == HIGH){
    interruptor_estado_ant = LOW;
    Serial.println("Modo: Mantenimiento");
  }

  
  data = 'n';

  if(interruptor_estado_ant){
    digitalWrite(led_rojo,HIGH);
    digitalWrite(led_verde,HIGH);
    digitalWrite(led_amarillo,HIGH);
    Serial.println("ledRojo ON");
    Serial.println("ledAmarillo ON");
    Serial.println("ledVerde ON");
    delay(mantenimiento_frec);
    digitalWrite(led_rojo,LOW);
    digitalWrite(led_verde,LOW);
    digitalWrite(led_amarillo,LOW);
    Serial.println("ledRojo OFF");
    Serial.println("ledAmarillo OFF");
    Serial.println("ledVerde OFF");
    delay(mantenimiento_frec);
  }else{
    digitalWrite(led_rojo,HIGH);
    Serial.println("ledRojo ON");
    delay(led_rojo_frec);
    digitalWrite(led_rojo,LOW);
    Serial.println("ledRojo OFF");
    digitalWrite(led_verde,HIGH);
    Serial.println("ledVerde ON");
    delay(led_verde_frec);
    digitalWrite(led_verde,LOW);
    Serial.println("ledVerde OFF");
    digitalWrite(led_amarillo,HIGH);
    Serial.println("ledAmarillo ON");
    delay(led_amarillo_frec);
    digitalWrite(led_amarillo,LOW);
    Serial.println("ledAmarillo OFF");
  }
  delay(50);
}
