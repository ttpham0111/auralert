from argparse import ArgumentParser

import requests
from serial import Serial


def get_args():
    parser = ArgumentParser(description='Arduino to server communication')

    parser.add_argument('file', type=str)
    parser.add_argument('--port', type=int, default=9600)
    parser.add_argument('--server-url', type=str, default='http://localhost:3000/sensors/volume')

    return parser.parse_args()


def run(filename, port, server_url):
  arduino = Serial(filename, port)
  while True:
    try:
      device_id, volume = arduino.readline().split()
      print 'Received volume {} from device {}'.format(volume, device_id)

      data = {
        'deviceId': device_id,
        'volume': int(volume)
      }
      response = requests.post(server_url, json=data)
      response.raise_for_status()
      print 'Response:', response.content
    except Exception as e:
      print e


if __name__ == '__main__':
  args = get_args()
  run(args.file, args.port, args.server_url)
