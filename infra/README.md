# Infra sketch (optional)

This directory is a **documented example** for hosting the Dockerized Angular/Express app.
It is not the primary product of the repository (see [`PROJECT_TYPE.md`](../PROJECT_TYPE.md)).

## Target

- Azure Container Apps or any Docker host
- Image built from the root [`Dockerfile`](../Dockerfile)

## Usage

```bash
cd infra
terraform init
terraform plan
```

Variables are placeholders — replace with your subscription, resource group, and ACR name before apply.
