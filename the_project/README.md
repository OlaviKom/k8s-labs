# Todo App

For the PersistentVolume to work you first need to create the local path in the node we are binding it to. create a directory at `/tmp/kube` in the container `k3d-k3s-default-agent-0`. This can simply be done via `docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube`

Navigate to app `cd path/to/log_output`

Deploy with `kubectl apply -f manifests/`
