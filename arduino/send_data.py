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
      volume = int(arduino.readline().strip())
      print 'Received:', volume

      response = requests.post(server_url, json={'volume': volume})
      response.raise_for_status()
      print 'Response:', response.content
    except Exception as e:
      print e


if __name__ == '__main__':
  args = get_args()
  run(args.file, args.port, args.server_url)
