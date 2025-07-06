# Padre Gino's Pizza

This repository contains the code for Padre Gino's Pizza, a full-stack application. This README outlines the deployment strategy, covering infrastructure, configuration management, containerization, and continuous integration/delivery.

## Deployment Overview

The deployment process leverages a combination of modern DevOps tools to automate the provisioning of infrastructure, configuration of servers, containerization of applications, and continuous delivery.

### 1. Infrastructure Setup (Terraform)

Infrastructure is provisioned using Terraform, an Infrastructure as Code (IaC) tool. This ensures that the necessary cloud resources (e.g., Virtual Machines) are created consistently and repeatably.

- **Main Configuration:** [`deployments/terraform/vm.tf`](./deployments/terraform/vm.tf)
  - Defines the virtual machine(vm) instance, network interfaces, and security groups required for the application.
  - In my configuration a vm will be created on azure with a public ip and a private ip. The vm's port 22 and port 80 will be open.
- **Provider Versions:** [`deployments/terraform/versions.tf`](./deployments/terraform/versions.tf)
  - Specifies the required Terraform providers and their versions.

**Steps:**

- Go to the terraform folder [`deployments/terraform/`](./deployments/terraform/)
- Initialize Terraform: `terraform init`
- Review the plan: `terraform plan`
- Apply the configuration: `terraform apply`
- `terraform destroy` can be used to destroy the full infrastructure.

### 2. Configuration Management (Ansible)

Ansible is used for configuration management, ensuring that the provisioned servers are set up with the necessary software (like Docker, git) and configurations.

- **Ansible Configuration:** [`deployments/ansible/ansible.cfg`](./deployments/ansible/ansible.cfg)
  - Contains general Ansible settings.
- **Inventory:** [`deployments/ansible/inventory/hosts`](./deployments/ansible/inventory/hosts)
  - Defines the target hosts where Ansible playbooks will be executed.For my current setup there is only one vm. Same configurations can be done just by adding other vm's IP.
- **Application Deployment Playbook:** [`deployments/ansible/playbook.yml`](./deployments/ansible/playbook.yml)
  - Used for initial setup of the VM, including installing Docker and other common dependencies and cloning the repo to the server.
- **Roles:**
  - [`deployments/ansible/roles/common/`](./deployments/ansible/roles/common/)
    - Contains common tasks like installing common softwares (e.g., cloning the repository).
    - [`deployments/ansible/roles/common/tasks/main.yml`](./deployments/ansible/roles/common/tasks/main.yml)
  - [`deployments/ansible/roles/docker/`](./deployments/ansible/roles/docker/)
    - Contains tasks for installing and configuring Docker.
    - [`deployments/ansible/roles/docker/tasks/main.yml`](./deployments/ansible/roles/docker/tasks/main.yml)
  - [`deployments/ansible/roles/app/`](./deployments/ansible/roles/app/)
    - Contains tasks for cloning the repo to the server
    - [`deployments/ansible/roles/app/tasks/main.yml`](./deployments/ansible/roles/app/tasks/main.yml)
- **Run the playbook**
  - Go to the [`deployments/ansible`](./deployments/ansible/) folder
  - Run `ansible-playbook playbook.yml` to run the playbook

### 3. Docker Container Deployment

The application is containerized using Docker, with separate containers for the frontend, backend, and Nginx. Docker Compose orchestrates these services.

- **Development Docker Compose:** [`docker-compose.yml`](./docker-compose.yml)
  - Used for local development, mounting source code for live reloading.
- **Production Docker Compose:** [`docker-compose.prod.yml`](./docker-compose.prod.yml)
  - Used for production deployments, pulling pre-built images from a container registry.
  - **Backend Dockerfile:** [`backend/Dockerfile`](./backend/Dockerfile)
    - Defines how the backend Node.js application is containerized.
  - **Frontend Dockerfile:** [`frontend/Dockerfile`](./frontend/Dockerfile)
    - Defines how the frontend React application is containerized.
  - **Nginx Configuration:** [`deployments/nginx/default.conf`](./deployments/nginx/default.conf)
    - Nginx server block configuration for routing requests to frontend and backend services.

### 4. CI/CD (GitHub Actions)

GitHub Actions automate the Continuous Integration and Continuous Deployment processes.

- **Continuous Deployment (CD):** [`.github/workflows/cd.yml`](./.github/workflows/cd.yml)
  - Triggered on pushes to the `main` branch.
  - Builds and pushes Docker images for both frontend and backend to GitHub Container Registry.
  - Connects to the remote server via SSH and executes deployment commands (pulling new images, restarting services, pruning old images).
- **Continuous Integration (CI):** [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)
  - Triggered on pushes to any branch.
  - Runs linting and potentially tests for both frontend and backend to ensure code quality.

### 5. `deploy.sh` Script

- **Deployment Script:** [`deployments/deploy.sh`](./deployments/deploy.sh)
  - This script acts as a wrapper to simplify the execution of terraform and Ansible playbooks on local machine, providing a convenient way to trigger infrastructure creation and configuration manually or as part of a larger automation.
