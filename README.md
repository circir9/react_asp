# REACT前端與.NET api後端

**請於啟動前確保設置環境變數正確** \
資料庫[mongodb atlas](https://www.mongodb.com/)
____

## `jenkins + cypress 測試`
使用docker container架設jenkins server

### 啟動jenkins server
````
docker run \
    --name jenkins \
    --privileged=true \
    -d --restart always \
    -p 8080:8080 -p 50000:50000 \
    -v /data/jenkins:/var/jenkins_home \
    -v /var/run/docker.sock:/var/run/docker.sock \
       -v /usr/bin/docker:/usr/bin/docker \
    jenkins/jenkins:lts
````

### build cypress + .net docker image
````
docker build -t {image-name} .
````