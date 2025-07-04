#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Get the directory of the script itself
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Change to the script's directory, so all paths are relative to it
cd "$SCRIPT_DIR"

# --- Step 1: Create Infrastructure ---
echo "🚀 Starting Terraform..."
cd terraform
terraform init
terraform apply -auto-approve
export SERVER_IP=$(terraform output -raw public_ip_address)
cd .. # Back to deployments directory
echo "✅ Terraform complete. Server IP is: $SERVER_IP"

# --- Step 2: Update Ansible Inventory ---
echo "📝 Updating Ansible inventory..."
echo "$SERVER_IP" > ansible/inventory/hosts
echo "✅ Inventory updated."

# --- Step 3: Provision Server ---
echo "🔧 Provisioning server with Ansible..."
cd ansible
# It can take a minute for a new VM to be ready for SSH.
# This loop will retry the connection until it succeeds.
until ansible-playbook provision.yml; do
  echo "Ansible provisioning failed. Retrying in 15 seconds..."
  sleep 15
done
echo "✅ Server provisioned."

# --- Step 4: Deploy Application ---
echo "🚀 Deploying application..."
ansible-playbook playbook.yml
cd .. # Back to deployments directory
echo "🎉 Deployment complete! Your application should be live at http://$SERVER_IP"