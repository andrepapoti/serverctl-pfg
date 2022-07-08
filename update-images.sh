#!/bin/bash
#./scripts/compile-dana.sh

# docker build . -t gcr.io/pfg2022/distributor -f app/distributor.Dockerfile
# docker build . -t gcr.io/pfg2022/remote-dist -f app/remotedist.Dockerfile
# docker build . -t gcr.io/pfg2022/server-ctl -f server-ctl/serverCTL.Dockerfile

# docker push gcr.io/pfg2022/server-ctl:latest 
# docker push gcr.io/pfg2022/distributor:latest 
# docker push gcr.io/pfg2022/remote-dist:latest 

docker build . -t andrepapoti/distributor -f app/distributor.Dockerfile
docker build . -t andrepapoti/remote-dist -f app/remotedist.Dockerfile
docker build . -t andrepapoti/server-ctl -f .server-ctl/serverCtl.Dockerfile

docker push andrepapoti/server-ctl:latest 
docker push andrepapoti/distributor:latest 
docker push andrepapoti/remote-dist:latest 

