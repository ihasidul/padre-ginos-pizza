terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.34.0"
    }
  }
}

provider "azurerm" {
  subscription_id = "6aab25e2-883f-4555-91ae-ad4525299620"

  features {
  }
  use_cli = true
}

