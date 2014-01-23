---
layout: post
title: "Setting ssh security keys"
description: ""
category: "Linux"
tags: [ssh]
---
{% include JB/setup %}

Avoid password authentication using ssh agent.

From shell

    $ ssh-keygen -t rsa

Entering a passphrase when requested is highly recommendable. You will get the private-public keys pair in /home/user/.ssh :
id_rsa
id_rsa.pub

The latter must be exported to the remote host into authorized_keys file. In a single line it reads:
 
   $ cat ~/.ssh/id_rsa.pub | ssh user@remote.host 'cat >> ~/.ssh/authorized_key'

Every time you start a new user session, fire from shell

    $ ssh-add

and insert the passphrase. The following ssh tunnels will be opened without password requests.

The public key can be exported to as many machines as you like
