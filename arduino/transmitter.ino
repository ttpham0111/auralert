#include <RH_ASK.h>
#include <SPI.h>  // Needed to compile


const char DEVICE_ID[] = "UNO_1411";
const uint16_t SPEED = 2000;
const uint8_t SENSOR_PIN = A0;
const uint8_t RECEIVER_PIN = 11;
const uint8_t TRANSMITTER_PIN = 12;
RH_ASK driver(SPEED, RECEIVER_PIN, TRANSMITTER_PIN);

void setup()
{
  pinMode(SENSOR_PIN, INPUT);
  Serial.begin(9600);   // Debugging only
  if (!driver.init()) {
    Serial.println("Init Failed");
  }
}

void loop()
{
  const uint8_t length = sizeof(DEVICE_ID) + 5;
  char message[length];

  String voltage = String(analogRead(SENSOR_PIN), DEC);
  String deviceId = String(DEVICE_ID);
  (deviceId + " " + voltage).toCharArray(message, length);

  driver.send((uint8_t *) message, length);
  driver.waitPacketSent();
  Serial.println(message);
}