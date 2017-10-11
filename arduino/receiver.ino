#include <RH_ASK.h>
#include <SPI.h>  // Needed to compile


const char DEVICE_ID[] = "UNO_1421";
const uint16_t SPEED = 2000;
const uint8_t RECEIVER_PIN = 11;
const uint8_t TRANSMITTER_PIN = 12;
RH_ASK driver(SPEED, RECEIVER_PIN, TRANSMITTER_PIN);

void setup()
{
  Serial.begin(9600);
  if (!driver.init()) {
    Serial.println("Init Failed");
  }
}

void loop()
{
  uint8_t bufferLength = driver.maxMessageLength();
  uint8_t buffer[bufferLength];
  if (driver.recv(buffer, &bufferLength)) {
    Serial.println((char*) buffer);  // Should be formatted as "<device_id> <volume>"
  }
}
