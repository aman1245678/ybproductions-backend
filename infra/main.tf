terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
}

variable "prefix" {
  type        = string
  description = "Name prefix for YBP web host resources"
  default     = "ybp-web"
}

variable "location" {
  type        = string
  description = "Azure region"
  default     = "centralindia"
}

resource "azurerm_resource_group" "web" {
  name     = "${var.prefix}-rg"
  location = var.location
  tags = {
    project = "ybproductions"
    layer   = "web-app-host"
  }
}

resource "azurerm_container_registry" "web" {
  name                = replace("${var.prefix}acr", "-", "")
  resource_group_name = azurerm_resource_group.web.name
  location            = azurerm_resource_group.web.location
  sku                 = "Basic"
  admin_enabled       = false
}

resource "azurerm_log_analytics_workspace" "web" {
  name                = "${var.prefix}-logs"
  location            = azurerm_resource_group.web.location
  resource_group_name = azurerm_resource_group.web.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "web" {
  name                       = "${var.prefix}-env"
  location                   = azurerm_resource_group.web.location
  resource_group_name        = azurerm_resource_group.web.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.web.id
}

output "resource_group" {
  value = azurerm_resource_group.web.name
}

output "container_registry" {
  value = azurerm_container_registry.web.login_server
}

output "container_app_environment_id" {
  value = azurerm_container_app_environment.web.id
}
