resource "azurerm_resource_group" "padre" {
  name     = "padre-ginos-pizza"
  location = "UK South"
}

resource "azurerm_virtual_network" "padre" {
  name                = "padre-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.padre.location
  resource_group_name = azurerm_resource_group.padre.name
}

resource "azurerm_subnet" "padre" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.padre.name
  virtual_network_name = azurerm_virtual_network.padre.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_public_ip" "padre" {
  name                    = "padre-public-ip"
  location                = azurerm_resource_group.padre.location
  resource_group_name     = azurerm_resource_group.padre.name
  allocation_method       = "Static"
  idle_timeout_in_minutes = 30

  tags = {
    environment = "padre_env"
  }
}

resource "azurerm_network_security_group" "padre" {
  name                = "padre-nsg"
  location            = azurerm_resource_group.padre.location
  resource_group_name = azurerm_resource_group.padre.name
}

resource "azurerm_network_security_rule" "ssh_allow" {
  name                        = "SSH"
  priority                    = 1001
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.padre.name
  network_security_group_name = azurerm_network_security_group.padre.name
}

resource "azurerm_network_interface" "padre" {
  name                = "padre-nic"
  location            = azurerm_resource_group.padre.location
  resource_group_name = azurerm_resource_group.padre.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.padre.id
    private_ip_address_allocation = "Static"
    private_ip_address            = "10.0.2.5"
    public_ip_address_id          = azurerm_public_ip.padre.id
  }
}

resource "azurerm_network_interface_security_group_association" "padre" {
  network_interface_id      = azurerm_network_interface.padre.id
  network_security_group_id = azurerm_network_security_group.padre.id
}

resource "azurerm_linux_virtual_machine" "padre" {
  name                = "padre-machine"
  resource_group_name = azurerm_resource_group.padre.name
  location            = azurerm_resource_group.padre.location
  size                = "Standard_B2ats_v2"
  admin_username      = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.padre.id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = file("~/.ssh/id_ed25519.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "ubuntu-24_04-lts"
    sku       = "server"
    version   = "latest"
  }
}
