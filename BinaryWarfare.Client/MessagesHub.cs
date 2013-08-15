using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR;

namespace ASPNET_SignalR
{
    [HubName("message")]
    public class MessagesHub : Hub
    {
        public void SendMessage(string message)
        {
            Clients.All.displayMessage(message);
        }
    }
}