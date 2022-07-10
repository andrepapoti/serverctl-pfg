#!/bin/bash
kubectl delete deployments --all --namespace=default
kubectl delete svc --all --namespace=default