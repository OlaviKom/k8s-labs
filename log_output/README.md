# Log output app

The application shows timestamp, random string and how many request is done to /pingpong. Count of request is saved on Postgres database.

Create namespace `kubectl create namespace exercises`

Use namespace `kubectl config set-context --current --namespace=exercises`

Navigate to app `cd path/to/log_output`

create secret.yaml file to the manifest dir `touch manifests/secret.yaml` . Use `manifests/secret.yaml.example` as a template. Remember format values to base64 format. You can example do formating with command: `echo -n 'our value' | base64`

Deploy with `kubectl apply -f manifests/`
