# Log output app

The application shows timestamp and how many request is done to /pingpong

create a directory at `/tmp/kube` in the container `k3d-k3s-default-agent-0`. This can simply be done via `docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube`

Navigate to app `cd path/to/log_output`

Deploy with `kubectl apply -f manifests/`
