#!/bin/bash
docker rmi server-ctl:latest
docker rmi andrepapoti/server-ctl:latest
docker rmi remote-dist:latest
docker rmi andrepapoti/remote-dist:latest
docker rmi distributor:latest
docker rmi python:3
docker rmi ubuntu:18.10
docker rmi andrepapoti/distributor:latest
